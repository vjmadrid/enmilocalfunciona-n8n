#!/bin/bash

# *** Configuration ***

# - N8N_CONTAINER_NAME: name of an n8n container that can operate in normal mode or queue mode
N8N_CONTAINER_NAME="n8n"
# - N8N_CONTAINER_EXPORT_DIRECTORY: location of the export/working directory within the n8n container
N8N_CONTAINER_EXPORT_DIRECTORY="/home/node/export/"
# - SERVER_DIRECTORY: location of the working directory within the computer/server
#   Note: Directory where you will leave the export files
SERVER_DIRECTORY="/Users/vjmadrid/Workspace/personal/enmilocalfunciona-n8n/example/basic/export"

# *** Execution ***

# Create work directory in the computer/server
echo "Creating work directory in the computer/server ..."
echo "* Directory: ${SERVER_DIRECTORY}"
mkdir -p $SERVER_DIRECTORY

# Create export/work directory in the container
echo "Creating export/work directory in the container ..."
echo "* Directory: ${N8N_CONTAINER_EXPORT_DIRECTORY}"
docker exec -t $N8N_CONTAINER_NAME mkdir $N8N_CONTAINER_EXPORT_DIRECTORY

# Export workflows and credentials from the container
# IMPORTANT: The strategy of generating a single file for each resource including all resources shall be used
echo "Starting export 'single-file' from the container ..."
echo "* Workflows: ${N8N_CONTAINER_EXPORT_DIRECTORY}/workflows.json"
echo "* Credentials: ${N8N_CONTAINER_EXPORT_DIRECTORY}/credentials.json"
docker exec $N8N_CONTAINER_NAME n8n export:workflow --all --output=$N8N_CONTAINER_EXPORT_DIRECTORY/workflows.json
docker exec $N8N_CONTAINER_NAME n8n export:credentials --all --output=$N8N_CONTAINER_EXPORT_DIRECTORY/credentials.json

# Copy export files to local
echo "Copying export container files to computer/server ..."
echo "* Workflows: ${SERVER_DIRECTORY}/workflows.json"
echo "* Credentials: ${SERVER_DIRECTORY}/credentials.json"
docker cp $N8N_CONTAINER_NAME:$N8N_CONTAINER_EXPORT_DIRECTORY/workflows.json $SERVER_DIRECTORY/workflows.json
docker cp $N8N_CONTAINER_NAME:$N8N_CONTAINER_EXPORT_DIRECTORY/credentials.json $SERVER_DIRECTORY/credentials.json

echo "*** Export completed successfully ***"