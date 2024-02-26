use serde::{Deserialize, Serialize};
use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION, CONTENT_TYPE};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
pub struct SparseVector {
    pub indices: Vec<u32>,
    pub values: Vec<f32>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Usage {
    readUnits: i64,
}

impl SparseVector {
    pub fn from_hashmap(map: HashMap<u32, f32>) -> Self {
        let (indices, values): (Vec<u32>, Vec<f32>) = map.into_iter().unzip();
        SparseVector { indices, values }
    }
}


#[derive(Debug, Serialize, Deserialize)]
pub struct QueryPayload {
    topK: i64,
    vector: Vec<f32>,
    sparseVector: Option<SparseVector>, // Use this for sparse vector queries
    includeValues: bool,
    includeMetadata: bool,
}


#[derive(Debug, Serialize, Deserialize)]
pub struct QueryResponse {
    namespace: Option<String>,
    matches: Option<Vec<Match>>,
    usage: Option<Usage>,
    results: Option<Vec<String>>
}

#[derive(Debug, Serialize, Deserialize)]
struct Match {
    id: String,
    score: f32,
    values: Option<Vec<f32>>,
    sparseValues: Option<SparseVector>,
    metadata: Option<HashMap<String, serde_json::Value>>,
}

pub struct PineCone {
    api_key: String,
    index_host: String,
}


impl PineCone {
    pub fn new(api_key: &str, index_host: &str) -> Self {
        PineCone { api_key: api_key.to_string(),
                   index_host: index_host.to_string() }
    }

    pub async fn query_sparse_vector(&self, top_k: i64, sparse_vector: SparseVector) -> Result<QueryResponse, reqwest::Error> {
        let client = reqwest::Client::new();
        let mut headers = HeaderMap::new();
        headers.insert("Api-Key", HeaderValue::from_str(&self.api_key).unwrap());
        headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));

        let payload = QueryPayload {
            topK: top_k,
            includeValues: false,
            includeMetadata: true,
            vector: vec![0.0000001].into(), // placeholder - not using vectors
            sparseVector: Some(sparse_vector),
        };

        let url = format!("https://{}/query", self.index_host);
       
        let response = client.post(&url)
            .headers(headers)
            .json(&payload)
            .send()
            .await?;
        
        
        if !response.status().is_success() {
            println!("Query failed with status: {}", response.status());
        }
        let query_response = response.json::<QueryResponse>().await?;
        
        Ok(query_response)
    }
}