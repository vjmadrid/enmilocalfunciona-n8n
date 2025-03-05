include docker.mk

# N8N CONFIGURATION

# --- Execution ---

# If you need finde de correct name por n8n container
#
N8N_ID_CONTAINER := $$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13)

# --- Backup ---

BACKUP_DATE := $(shell date -j "+%Y%m%d%H%M")

N8N_WORFLOWS_DOCKER_BACKUP_DIRECTORY := ./backups/workflows/
N8N_WORFLOWS_DOCKER_BACKUP_LATEST_DIRECTORY := $(N8N_WORFLOWS_DOCKER_BACKUP_DIRECTORY)latest/
N8N_WORFLOWS_DOCKER_BACKUP_DATED_DIRECTORY := $(N8N_WORFLOWS_DOCKER_BACKUP_DIRECTORY)$(BACKUP_DATE)/

N8N_CREDENTIALS_DOCKER_BACKUP_DIRECTORY := ./backups/credentials/
N8N_CREDENTIALS_DOCKER_BACKUP_LATEST_DIRECTORY := $(N8N_CREDENTIALS_DOCKER_BACKUP_DIRECTORY)latest/
N8N_CREDENTIALS_DOCKER_BACKUP_DATED_DIRECTORY := $(N8N_CREDENTIALS_DOCKER_BACKUP_DIRECTORY)$(BACKUP_DATE)/


# --- Example ---

N8N_WORKFLOW_EXAMPLE_FILE := ./workflows/Conversor Temperatura/Conversor_Temperatura.json

N8N_ID_CONTAINER := $$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13)


# --- General ---

n8n-test: ## [n8n] Testing n8n
	$(DOCKER_COMMAND) exec $(shell docker ps --filter name='^/$(PROJECT_NAME)n8n' --format '{{.ID}}') npm test

n8n-logs: ## [n8n] View container log
#Option1: $(DOCKER_COMMAND) logs ${PROJECT_NAME}n8n
	$(DOCKER_COMMAND) logs $(N8N_ID_CONTAINER)

n8n-sh: ## [n8n] Execute docker image with sh
	ID=$$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -t $$ID "/bin/sh"

# --- Export ---

n8n-export-workflows: ## [n8n] Export Workflows
	ID=$$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -t $$ID n8n export:workflow --all --output=exported-workflows.json

n8n-export-credentials: ##Export Credentials
	ID=$$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -t $$ID n8n export:credentials --all --decrypted --output=exported-credentials.json

# --- Import ---

n8n-import-workflows: ##Export Workflow
	ID=$$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -t $$ID n8n import:workflow --input=exported-workflows.json

n8n-import-credentials: ##Export Credentials
	ID=$$(docker ps -f name=${PROJECT_NAME}n8n |tail -1 |colrm 13) && $(DOCKER_COMMAND) exec -u node -t $$ID n8n import:credentials --input=exported-credentials.json

# --- Example ---

n8n-example-prepare: ## [n8n] Prepare Import Workflow Example
	@echo "Copying example workflow $(N8N_WORKFLOW_EXAMPLE_FILE) ..."
	@echo "* Origin (Computer): $(N8N_WORKFLOW_EXAMPLE_FILE)"
	@echo "* Destination (Container): /home/node/example.json"
	$(DOCKER_COMMAND) cp "$(N8N_WORKFLOW_EXAMPLE_FILE)" "${N8N_ID_CONTAINER}":/home/node/example.json

n8n-example-import: ## [n8n] Import Workflow Example
	@echo "Copying example workflow $(N8N_WORKFLOW_EXAMPLE_FILE) ..."
	@echo "* Origin: /home/node/example.json"
	$(DOCKER_COMMAND) exec -u node -it $(N8N_ID_CONTAINER) n8n import:workflow --input=/home/node/example.json

# --- Backup ---

n8n-workflows-backup: ## [n8n] Backup ALL Workflows
	@echo "Creating a backup for workflows ..."
	@echo "* Creating backup in the $(N8N_WORFLOWS_DOCKER_BACKUP_LATEST_DIRECTORY) container directory ..."
	@echo "* Creating dated backup in the $(N8N_WORFLOWS_DOCKER_BACKUP_DATED_DIRECTORY) container directory ..."
	$(DOCKER_COMMAND) exec -u node -t "$(N8N_ID_CONTAINER)" n8n export:workflow --backup --output=$(N8N_WORFLOWS_DOCKER_BACKUP_LATEST_DIRECTORY)
	$(DOCKER_COMMAND) exec -u node -t "$(N8N_ID_CONTAINER)" cp -r $(N8N_WORFLOWS_DOCKER_BACKUP_LATEST_DIRECTORY) $(N8N_WORFLOWS_DOCKER_BACKUP_DATED_DIRECTORY)

n8n-workflows-restore-last-backup: ## [n8n] Restore ALL Workflows last backup
	@echo "Restoring the last workflows backup of the $(N8N_WORFLOWS_DOCKER_BACKUP_LATEST_DIRECTORY) container directory ..."
	$(DOCKER_COMMAND) exec -u node -it $(N8N_ID_CONTAINER) n8n import:workflow --separate --input=$(N8N_WORFLOWS_DOCKER_BACKUP_LATEST_DIRECTORY)

n8n-credentials-backup: ## [n8n] Backup ALL Credentials
	@echo "Creating a backup for credentials ..."
	@echo "* Creating backup in the $(N8N_CREDENTIALS_DOCKER_BACKUP_LATEST_DIRECTORY) container directory ..."
	@echo "* Creating dated backup in the $(N8N_CREDENTIALS_DOCKER_BACKUP_DATED_DIRECTORY) container directory ..."
	$(DOCKER_COMMAND) exec -u node -t "$(N8N_ID_CONTAINER)" n8n export:workflow --backup --output=$(N8N_CREDENTIALS_DOCKER_BACKUP_LATEST_DIRECTORY)
	$(DOCKER_COMMAND) exec -u node -t "$(N8N_ID_CONTAINER)" cp -r $(N8N_CREDENTIALS_DOCKER_BACKUP_LATEST_DIRECTORY) $(N8N_CREDENTIALS_DOCKER_BACKUP_DATED_DIRECTORY)

n8n-credentials-restore-last-backup: ## [n8n] Restore ALL Credentials last backup
	@echo "Restoring the last credentials backup of the $(N8N_CREDENTIALS_DOCKER_BACKUP_LATEST_DIRECTORY) container directory ..."
	$(DOCKER_COMMAND) exec -u node -it $(N8N_ID_CONTAINER) n8n import:workflow --separate --input=$(N8N_CREDENTIALS_DOCKER_BACKUP_LATEST_DIRECTORY)
