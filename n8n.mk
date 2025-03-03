include docker.mk

# N8N CONFIGURATION

N8N_WORFLOWS_DOCKER_BACKUP_DIRECTORY := ./backups/workflows/latest/
N8N_WORKFLOW_EXAMPLE_FILE := ./workflows/Conversor Temperatura/Conversor_Temperatura.json

# --- General ---

n8n-test: ## [n8n] Testing n8n
	$(DOCKER_COMMAND) exec $(shell docker ps --filter name='^/$(PROJECT_NAME)n8n' --format '{{.ID}}') npm test

n8n-logs: ## [n8n] View container log
#Option1: $(DOCKER_COMMAND) logs ${PROJECT_NAME}n8n
	ID=$$(docker ps -a -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) logs $$ID

n8n-sh: ## [n8n] Execute docker image with sh
	ID=$$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -it $$ID "/bin/sh"

# --- Export ---

n8n-export-workflow: ## [n8n] Export Workflow
	ID=$$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n export:workflow --all --output=workflows.json

n8n-export-credentials: ##Export Credentials
	ID=$$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n export:credentials --all --decrypted --output=credentials.json

# --- Import ---

n8n-prepare-import: ## Prepare import
	docker cp ./import/workflows.json ./example01-n8n-data
	docker cp ./import/credentials.json ./example01-n8n-data

n8n-import-workflow: ##Export Workflow
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n import:workflow --input=workflows.json

n8n-import-credentials: ##Export Credentials
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n import:credentials --input=credentials.json

# --- Example ---

n8n-example-import: ## [n8n] Import Workflow Example
	@echo "Importing example workflow $(N8N_WORKFLOW_EXAMPLE_FILE) ..."
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n import:workflow --input=$(N8N_WORKFLOW_EXAMPLE_FILE)

# --- Backup ---

n8n-workflows-backup: ## [n8n] Backup ALL Workflows
	@echo "Creating a backup copy in the $(N8N_WORFLOWS_DOCKER_BACKUP_DIRECTORY) container directory ..."
	ID=$$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n export:workflow --backup --output=$(N8N_WORFLOWS_DOCKER_BACKUP_DIRECTORY)

n8n-workflows-restore-last-backup: ## [n8n] Restore ALL Workflows last backup
	@echo "Restoring a backup copy of the $(N8N_WORFLOWS_DOCKER_BACKUP_DIRECTORY) container directory ..."
	ID=$$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n import:workflow --separate --input=$(N8N_WORFLOWS_DOCKER_BACKUP_DIRECTORY)
