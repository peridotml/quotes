# Quote Finder
Welcome to the source code repository of [Quote Finder](https://quotes.shuttleapp.rs/). This project leverages natural language processing (NLP) techniques to provide a 
a pretty normal looking keyword search experience.

## Project Structure
The Quote Finder project is organized into three primary directories, each serving a unique purpose within the application architecture:

- **frontend/** Contains the Vite-React application, implementing the user interface and interaction layer.
- **python/** Houses data and model preparation scripts, including a notable Jupyter Notebook for embedding quotes and integration with Pinecone.
- **src/** The Rust backend, built with Axum to provide RESTful services, including the front-end serving and quote searching functionality.

## Tech Stack
- **Backend** [Axum](https://github.com/tokio-rs/axum), [Pinecone](https://www.pinecone.io/)
- **ML** [SPLADE](https://huggingface.co/naver/efficient-splade-VI-BT-large-query), [Candle](https://github.com/huggingface/candle), [Safetensors](https://huggingface.co/docs/safetensors/en/index)
- **Frontend** [Vite](https://vitejs.dev/), React, [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction), [Mantine](https://mantine.dev/)
- **Deployment** [Shuttle](https://www.shuttle.rs/)

## Local Development
### Backend
Run the Rust backend using Cargo:
```sh
cargo shuttle run
```
### Frontend
Navigate to the frontend directory and start the development server:
```sh
cd frontend
npm run dev
```
## Deployment
To build and deploy the application, use the provided Make command:
```sh
make build-and-deploy
```

# Resources
- https://www.pinecone.io/learn/splade/
