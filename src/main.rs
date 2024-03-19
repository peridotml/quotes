use axum::extract::State;
use axum::response::IntoResponse;
use axum::routing::post;
use axum::{Json, Router};
use std::collections::HashMap;
use std::sync::Arc;
use serde::{Deserialize, Serialize};

use tower_http::services::{ServeDir, ServeFile};

mod splade;
use splade::SpladeService;

mod pinecone;

use pinecone::{PineCone, SparseVector};
use shuttle_secrets::SecretStore;


#[derive(Serialize)]
struct Search {
    sparse: HashMap<u32, f32>,
    terms: Vec<String>,
}

#[derive(Deserialize)]
struct CreateQuery {
    text: String,
    filter: Option<f32>,
    top_k: Option<i64>
}

async fn query(splade_manager: State<Arc<SpladeService>>, Json(payload): Json<CreateQuery>) -> impl IntoResponse {
    let output = splade_manager
        .sparsify(payload.text, payload.filter)
        .unwrap();

    let pinecone_api_key = std::env::var("PINECONE_API_KEY").unwrap();
    let pinecone_host = std::env::var("PINECONE_HOST").unwrap();

    let pinecone = PineCone::new(&pinecone_api_key, &pinecone_host);
    let top_k = payload.top_k.unwrap_or(10);
    let pinecone_response =  pinecone.query_sparse_vector(top_k,  SparseVector::from_hashmap(output.sparse.clone())).await.unwrap();

    Json(pinecone_response)
}

#[shuttle_runtime::main]
async fn main(
    #[shuttle_secrets::Secrets] secret_store: SecretStore
) -> shuttle_axum::ShuttleAxum {
    let pinecone_api_key = secret_store.get("PINECONE_API_KEY").unwrap();
    let pinecone_host= secret_store.get("PINECONE_HOST").unwrap();

    std::env::set_var("PINECONE_API_KEY", pinecone_api_key);
    std::env::set_var("PINECONE_HOST", pinecone_host);
    let splade_manager = Arc::new(SpladeService::new(
        "src/model.safetensors",
        "src/config.json",
        "src/tokenizer.json",
    ).unwrap());

    let router = Router::new().route("/query", post(query)).with_state(splade_manager).nest_service(
        "/", ServeDir::new("dist").not_found_service(ServeFile::new("dist/index.html")),
    );
    
    Ok(router.into())
}
