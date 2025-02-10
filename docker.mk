include .env

# DOCKER CONFIGURATION

# --- General ---

ME := $(realpath $(firstword $(MAKEFILE_LIST)))

# Expected to be parent folder of compose file
# Contains trailing '/'
#
PWD := $(dir $(ME))

# --- Docker compose ---

DOCKER_COMPOSE_FILE := $(DOCKER_COMPOSE_FILE_USED)
DOCKER_COMPOSE_FILE_PATH ?= $(PWD)$(DOCKER_COMPOSE_FILE)

# --- Execution ---

# If you need sudo to execute docker, then udpate these aliases
#
DOCKER         := docker
DOCKER_COMPOSE := docker compose

DOCKER_COMMAND := $(DOCKER)
DOCKER_COMPOSE_COMMAND := $(DOCKER_COMPOSE) --file "$(DOCKER_COMPOSE_FILE_PATH)"

# --- Container ---

CONTAINER_DEFAULT :=

container ?= $(CONTAINER_DEFAULT)

# Shell command for 'shell' target
#
SHELL_CMD := /bin/bash

# --- DOCKER ---

init: ## [project] Copy and rename this file to .env at root of this project
	@echo "Init project for $(PROJECT_NAME) ..."
	@echo "Copy and rename this file to .env at root of this project ..."
	@cp $(PWD)/.env.example $(PWD)/.env

check-env: ## [project] Ensure .env file exists and matches .env.example
	@echo "Checking .env file exists..."
	@if [ ! -f "$(PWD)/.env" ]; then \
        echo "Error: .env file does not exist. Creating one now from .env.example ..."; \
        cp $(PWD)/.env.example $(PWD)/.env; \
	fi
	@echo "Checking .env file for missing variables..."
	@awk -F '=' 'NR==FNR {a[$$1]; next} !($$1 in a) {print "Missing env var: " $$1}' $(PWD)/.env $(PWD)/.env.example

build: ## [docker] Build containers
	@make check-env
	@echo "Building containers for $(PROJECT_NAME) ..."
	$(DOCKER_COMPOSE_COMMAND) build

up: ## [docker] Start up all or c=<name> containers in background
	@make check-env
	@echo "Starting up containers for $(PROJECT_NAME) ..."
	$(DOCKER_COMPOSE_COMMAND) pull $(c)
	$(DOCKER_COMPOSE_COMMAND) up -d --remove-orphans $(c)

down: ## [docker] Stop all or c=<name> containers
	@echo "Stopping up containers for $(PROJECT_NAME) ..."
	$(DOCKER_COMPOSE_COMMAND) down $(c)

rebuild: ## [docker] Stops all or c=<name> containers (via 'down') and rebuilds service images (via 'build')
	@make down
	@make build

clean: ## [docker] Removes containers, images and volumes
	$(DOCKER_COMPOSE_COMMAND) down --volumes --rmi all

clean-all-images: ## [docker] Removes images
	@docker rmi -f $(docker images) | true

clean-all-containers: ## [docker] Removes containers
	@docker rm -f $(docker ps -a -q) | true

clean-all-volumes: ## [docker] Removes volumes
	$(DOCKER_COMMAND) volume rm $$($(DOCKER_COMMAND) volume ls -q)

clean-all-networks:## [docker] Removes networks
	$(DOCKER_COMMAND) network rm $$(docker network ls) | true

start: ## [docker] Start containers without updating
	@make check-env
	@echo "Starting containers for $(PROJECT_NAME) from where you left off ..."
	$(DOCKER_COMPOSE_COMMAND) start

stop: ## [docker] Stop containers
	@echo "Stopping containers for $(PROJECT_NAME) ..."
	$(DOCKER_COMPOSE_COMMAND) stop

restart: stop start ## [docker] Stops containers (via 'stop'), and starts them again (via 'start')

status: ## [docker] List running containers
	$(DOCKER_COMMAND) ps --filter name='$(PROJECT_NAME)*'

ps: status ## [docker] Alias of status

services: ## [docker] Lists services
	$(DOCKER_COMPOSE_COMMAND) ps --services

logs: ## [docker] View all or c=<name> containers logs
	$(DOCKER_COMPOSE_COMMAND) logs --tail=100 -f $(c)

logs-to-file: ## [docker] View all or c=<name> containers logs
	$(DOCKER_COMPOSE_COMMAND) logs --tail=100 -f $(c) > logs.txt

# $(DOCKER_COMPOSE_COMMAND) logs -f $(filter-out $@,$(MAKECMDGOALS))


shell: ## [docker] Brings up a shell in default (or specified) container [container]
ifeq ($(container),)
	$(error ERROR: 'container' is not set. Please provide 'container=' argument or edit makefile and set CONTAINER_DEFAULT)
endif
	@echo
	@echo "Starting shell ($(SHELL_CMD)) in container '$(container)'"
	@$(DOCKER_COMMAND) exec -it "$(container)" "$(SHELL_CMD)"

sh: shell ## See 'shell'
bash: shell ## See 'shell' (may not actually be bash)

