.PHONY: build-and-deploy build_frontend deploy

build-and-deploy: build_frontend deploy

build_frontend:
	npm --prefix ./frontend run build

deploy:
	cargo shuttle deploy