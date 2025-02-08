include docker.mk

# --- N8N ---

n8n-test: ## [n8n] Testing n8n
	$(DOCKER_COMMAND) exec $(shell docker ps --filter name='^/$(PROJECT_NAME)_n8n' --format "{{ .ID }}") npm test

n8n-logs: ## [n8n] View container log
	$(DOCKER_COMMAND) logs ${PROJECT_NAME}_n8n

n8n-logs2: ##Execute docker logs
	ID=$$(docker ps -a -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 12) && $(DOCKER_COMMAND) logs $$ID

n8n-sh: ##Execute docker image with sh
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 12) && $(DOCKER_COMMAND) exec -u node -it $$ID "/bin/sh"

n8n-export-workflow: ##Export Workflow
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 12) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n export:workflow --all --output=workflows.json

n8n-export-credentials: ##Export Credentials
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 12) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n export:credentials --all --decrypted --output=credentials.json

n8n-prepare-import: ## Prepare import
	docker cp ./import/workflows.json ./example01-n8n-data
	docker cp ./import/credentials.json ./example01-n8n-data

n8n-import-workflow: ##Export Workflow
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 12) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n import:workflow --input=workflows.json

n8n-import-credentials: ##Export Credentials
	ID=$$(docker ps -f name=${PROJECT_NAME}_n8n |tail -1 |colrm 12) && $(DOCKER_COMMAND) exec -u node -it $$ID n8n import:credentials --input=credentials.json



# --- HELP ---

help: ## Show help message
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
	printf "%s\n\n" "Usage: make [target]"; \
	printf "%-40s %s\n" "target" "help" ; \
	printf "%-40s %s\n" "----------------------------------" "----------------------------------" ; \
	for help_line in $${help_lines[@]}; do \
		IFS=$$':' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf '\033[36m'; \
		printf "%-40s %s" $$help_command ; \
		printf '\033[0m'; \
		printf "%s\n" $$help_info; \
	done
	@echo "Check the Makefile to know exactly what each target is doing"


.PHONY: up down stop prune ps logs

.DEFAULT_GOAL := help


