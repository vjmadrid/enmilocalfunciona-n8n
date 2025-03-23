#!/bin/bash

# *** Configuration ***

# - ORIGIN_N8N_CONTAINER_NAME: name of an n8n container that can operate in normal mode or queue mode
ORIGIN_N8N_CONTAINER_NAME="n8n"
# - ORIGIN_N8N_CONTAINER_NAME: name of an n8n container that can operate in normal mode or queue mode
DESTINATION_N8N_CONTAINER="queue-n8n-main-1"
# - N8N_CONTAINER_EXPORT_DIRECTORY: location of the export/working directory within the n8n container
N8N_CONTAINER_EXPORT_DIRECTORY="/home/node/export/"
# - N8N_CONTAINER_IMPORT_DIRECTORY: location of the import/working directory within the n8n container
N8N_CONTAINER_IMPORT_DIRECTORY="/home/node/import/"

# *** Execution ***

# Create work directory in the computer/server
echo "Creating work directory in the computer/server ..."
echo "* Directory: ${SERVER_DIRECTORY}"
mkdir -p $SERVER_DIRECTORY

# Create export/work directory in the origin container
echo "Creating export/work directory in the origin container ..."
echo "* Directory: ${N8N_CONTAINER_EXPORT_DIRECTORY}"
docker exec -t $ORIGIN_N8N_CONTAINER_NAME mkdir $N8N_CONTAINER_EXPORT_DIRECTORY

# Export workflows and credentials from the origin container
# IMPORTANT: The strategy of generating a single file for each resource including all resources shall be used
echo "Starting export 'single-file' from the origin container ..."
echo "* Workflows: ${N8N_CONTAINER_EXPORT_DIRECTORY}/workflows.json"
echo "* Credentials: ${N8N_CONTAINER_EXPORT_DIRECTORY}/credentials.json"
docker exec $ORIGIN_N8N_CONTAINER_NAME n8n export:workflow --all --output=$N8N_CONTAINER_EXPORT_DIRECTORY/workflows.json
docker exec $ORIGIN_N8N_CONTAINER_NAME n8n export:credentials --all --output=$N8N_CONTAINER_EXPORT_DIRECTORY/credentials.json

# Copy export files to local
echo "Copying export container files to computer/server ..."
echo "* Workflows: ${SERVER_DIRECTORY}/workflows.json"
echo "* Credentials: ${SERVER_DIRECTORY}/credentials.json"
docker cp $ORIGIN_N8N_CONTAINER_NAME:$N8N_CONTAINER_EXPORT_DIRECTORY/workflows.json $SERVER_DIRECTORY/workflows.json
docker cp $ORIGIN_N8N_CONTAINER_NAME:$N8N_CONTAINER_EXPORT_DIRECTORY/credentials.json $SERVER_DIRECTORY/credentials.json

echo "*** Export completed successfully ***"

# Create import/work directory in the container
echo "Creating import/work directory in the container ..."
echo "* Directory: ${N8N_CONTAINER_IMPORT_DIRECTORY}"
docker exec -t $DESTINATION_N8N_CONTAINER mkdir $N8N_CONTAINER_IMPORT_DIRECTORY

# Copy export files to the destination container
# IMPORTANT: The strategy of generating a single file for each resource including all resources shall be used
echo "Copying export files to the destination container ..."
docker cp $SERVER_DIRECTORY/workflows.json $DESTINATION_N8N_CONTAINER:$N8N_CONTAINER_IMPORT_DIRECTORY/workflows.json
docker cp $SERVER_DIRECTORY/credentials.json $DESTINATION_N8N_CONTAINER:$N8N_CONTAINER_IMPORT_DIRECTORY/credentials.json

# Import workflows and credentials into the container
# IMPORTANT: The strategy of generating a single file for each resource including all resources shall be used
echo "Starting import 'single-file' into the destination container ..."
echo "* Workflows: ${N8N_CONTAINER_IMPORT_DIRECTORY}/workflows.json"
echo "* Credentials: ${N8N_CONTAINER_IMPORT_DIRECTORY}/credentials.json"
docker exec $DESTINATION_N8N_CONTAINER n8n import:workflow --input=$N8N_CONTAINER_IMPORT_DIRECTORY/workflows.json
docker exec $DESTINATION_N8N_CONTAINER n8n import:credentials --input=$N8N_CONTAINER_IMPORT_DIRECTORY/credentials.json

# Clean up export files (optional)
#echo "Cleaning up export files ..."
#echo "* Workflows: ${SERVER_DIRECTORY}/workflows.json"
#echo "* Credentials: ${SERVER_DIRECTORY}/credentials.json"
#rm $SERVER_DIRECTORY/workflows.json $SERVER_DIRECTORY/credentials.json

echo "*** Import completed successfully ***"

echo "*** MIGRATION completed successfully ***"