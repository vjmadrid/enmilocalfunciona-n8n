#!/bin/bash

# *** Configuration ***

# - N8N_CONTAINER_NAME: name of an n8n container that can operate in normal mode or queue mode
N8N_CONTAINER_NAME="queue-n8n-main-1"
# - N8N_CONTAINER_IMPORT_DIRECTORY: location of the import/working directory within the n8n container
N8N_CONTAINER_IMPORT_DIRECTORY="/home/node/import/"
# - SERVER_DIRECTORY: location of the working directory within the computer/server
#   Note: Directory where you will get the export files
SERVER_DIRECTORY="/Users/vjmadrid/Workspace/personal/enmilocalfunciona-n8n/example/basic/export"

# *** Execution ***

# Create import/work directory in the container
echo "Creating import/work directory in the container ..."
echo "* Directory: ${N8N_CONTAINER_IMPORT_DIRECTORY}"
docker exec -t $N8N_CONTAINER_NAME mkdir $N8N_CONTAINER_IMPORT_DIRECTORY

# Copy export files to the container
# IMPORTANT: The strategy of generating a single file for each resource including all resources shall be used
echo "Copying export files to the container ..."
docker cp $SERVER_DIRECTORY/workflows.json $N8N_CONTAINER_NAME:$N8N_CONTAINER_IMPORT_DIRECTORY/workflows.json
docker cp $SERVER_DIRECTORY/credentials.json $N8N_CONTAINER_NAME:$N8N_CONTAINER_IMPORT_DIRECTORY/credentials.json

# Import workflows and credentials into the container
# IMPORTANT: The strategy of generating a single file for each resource including all resources shall be used
echo "Starting import 'single-file' into the n8n container ..."
echo "* Workflows: ${N8N_CONTAINER_IMPORT_DIRECTORY}/workflows.json"
echo "* Credentials: ${N8N_CONTAINER_IMPORT_DIRECTORY}/credentials.json"
docker exec $N8N_CONTAINER_NAME n8n import:workflow --input=$N8N_CONTAINER_IMPORT_DIRECTORY/workflows.json
docker exec $N8N_CONTAINER_NAME n8n import:credentials --input=$N8N_CONTAINER_IMPORT_DIRECTORY/credentials.json

# Clean up export files (optional)
#echo "Cleaning up export files ..."
#echo "* Workflows: ${SERVER_DIRECTORY}/workflows.json"
#echo "* Credentials: ${SERVER_DIRECTORY}/credentials.json"
#rm $SERVER_DIRECTORY/workflows.json $SERVER_DIRECTORY/credentials.json

echo "*** Import completed successfully ***"