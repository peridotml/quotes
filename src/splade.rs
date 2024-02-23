use std::collections::HashMap;
use std::path::Path;

use candle_core::{Device, Tensor};
use candle_transformers::models::bert::{Config, DTYPE};
use candle_transformers::models::splade::SpladeModel;
use candle_nn::VarBuilder;
use tokenizers::Tokenizer;
use anyhow::Error as E;
use serde::Serialize;

pub struct SpladeService {
    model: SpladeModel,
    tokenizer: Tokenizer,
}

#[derive(Serialize)]
pub struct SearchOutput {
    pub sparse: HashMap<u32, f32>,
    pub terms: Vec<String>,
}


impl SpladeService {
    pub fn new(model_path: &str, config_path: &str, tokenizer_path: &str) -> Result<Self, E> {
        // Load configuration
        let weights_filename = Path::new(model_path);

        let vb = unsafe { 
            VarBuilder::from_mmaped_safetensors(&[weights_filename], DTYPE, &Device::Cpu).unwrap() 
        };
        let config = std::fs::read_to_string(config_path).unwrap();
        let config: Config = serde_json::from_str(&config).unwrap();
        let tokenizer_filename = Path::new(tokenizer_path);
        let tokenizer = Tokenizer::from_file(tokenizer_filename).map_err(E::msg).unwrap();
 

        let model = SpladeModel::load(vb, &config).unwrap();

        Ok(SpladeService { model, tokenizer })
    }

    pub fn sparsify(&mut self, text: String, filter: Option<f32>) -> Result<SearchOutput, E> {
        // Tokenize input text
        let tokenizer = self.tokenizer
        .with_padding(None)
        .with_truncation(None)
        .map_err(E::msg).unwrap();

        let tokens = tokenizer
            .encode(text, true)
            .map_err(E::msg).unwrap()
            .get_ids()
            .to_vec();

        let token_ids = Tensor::new(&tokens[..], &Device::Cpu).unwrap().unsqueeze(0).unwrap();
        let token_type_ids = token_ids.zeros_like().unwrap();
    
        let ys = self.model.sparse_forward(&token_ids, &token_type_ids, filter).unwrap();
        let expanded_terms = ys.keys().map(|&key| self.tokenizer.id_to_token(key.clone() as u32).unwrap()).collect::<Vec<String>>();

        Ok(SearchOutput {
            sparse: ys,
            terms: expanded_terms,
        })
    }
}
