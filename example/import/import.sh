#!/bin/bash

# *** Configuration ***
N8N_CONTAINER_NAME="n8n"
N8N_CONTAINER_CREDENTIALS_DIR="/home/node/credentials/"
N8N_CONTAINER_WORKFLOWS_DIR="/home/node/workflows/"

ONE_CREDENTIAL_FILE="./backup/credentials/JAygfZ4uVgpOPrhU.json"
ONE_WORKFLOW_FILE="./backup/workflows/YoZxFh4gQHIwaFwF.json"

# *** Execution ***

# Create work directories in the container
echo "Creating directories of credentials and workflows in the container ..."
echo "* Credentials: ${N8N_CONTAINER_CREDENTIALS_DIR}"
echo "* Workflows: ${N8N_CONTAINER_WORKFLOWS_DIR}"
docker exec -t $N8N_CONTAINER_NAME mkdir $N8N_CONTAINER_CREDENTIALS_DIR
docker exec -t $N8N_CONTAINER_NAME mkdir $N8N_CONTAINER_WORKFLOWS_DIR

# Copy files in the container
echo "Copying credential file and workflow file in the container ..."
docker cp $ONE_CREDENTIAL_FILE $N8N_CONTAINER_NAME:$N8N_CONTAINER_CREDENTIALS_DIR
docker cp $ONE_WORKFLOW_FILE $N8N_CONTAINER_NAME:$N8N_CONTAINER_WORKFLOWS_DIR

# Import files in the container
echo "Importing credential file and workflow file in the container ..."
docker exec -t $N8N_CONTAINER_NAME n8n import:credentials --separate --input=$N8N_CONTAINER_CREDENTIALS_DIR
docker exec -t $N8N_CONTAINER_NAME n8n import:workflow --separate --input=$N8N_CONTAINER_WORKFLOWS_DIR

echo "*** Import completed successfully ***"