include docker.mk

# --- N8N ---

test-n8n: ## [n8n] Testing n8n
	docker exec $(shell docker ps --filter name='^/$(PROJECT_NAME)_n8nio' --format "{{ .ID }}") npm test

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

default: up



