include docker.mk

# --- N8N ---

n8n-test: ## [n8n] Testing n8n
	$(DOCKER_COMMAND) exec $(shell docker ps --filter name='^/$(PROJECT_NAME)_n8n' --format '{{.ID}}') npm test

n8n-logs: ## [n8n] View container log
	$(DOCKER_COMMAND) logs ${PROJECT_NAME}_n8n

n8n-logs2: ##Execute docker logs
	ID=$$(docker ps -a -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) logs $$ID

n8n-sh: ##Execute docker image with sh
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -it $$ID "/bin/sh"

n8n-export-workflow: ##Export Workflow
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n export:workflow --all --output=workflows.json

n8n-export-credentials: ##Export Credentials
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n export:credentials --all --decrypted --output=credentials.json

n8n-prepare-import: ## Prepare import
	docker cp ./import/workflows.json ./example01-n8n-data
	docker cp ./import/credentials.json ./example01-n8n-data

n8n-import-workflow: ##Export Workflow
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 12) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n import:workflow --input=workflows.json

n8n-import-credentials: ##Export Credentials
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 12) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n import:credentials --input=credentials.json
