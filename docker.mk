include .env

# --- Docker Configuration ---

DOCKER_COMPOSE_COMMAND := docker compose --file $(DOCKER_COMPOSE_FILE)


# --- DOCKER ---

up: ## [docker] Start up containers
	@echo "Starting up containers for $(PROJECT_NAME) ..."
	$(DOCKER_COMPOSE_COMMAND) pull
	$(DOCKER_COMPOSE_COMMAND) up -d --remove-orphans

down: ## [docker] Stop containers
	@make stop

start: ## [docker] Start containers without updating
	@echo "Starting containers for $(PROJECT_NAME) from where you left off ..."
	$(DOCKER_COMPOSE_COMMAND) start

stop: ## [docker] Stop containers
	@echo "Stopping containers for $(PROJECT_NAME) ..."
	$(DOCKER_COMPOSE_COMMAND) stop

ps: ## [docker] List running containers
	@docker ps --filter name='$(PROJECT_NAME)*'

logs: ## [docker]  View containers logs
	$(DOCKER_COMPOSE_COMMAND) logs -f $(filter-out $@,$(MAKECMDGOALS))

