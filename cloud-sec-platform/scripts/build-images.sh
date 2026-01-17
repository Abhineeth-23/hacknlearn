#!/bin/bash

# Build and push Docker images to Google Artifact Registry

set -e

PROJECT_ID=${1:-"cloud-sec-platform"}
REGION=${2:-"us-central1"}
REPO_NAME="cloud-sec-repo"

# Authenticate Docker with gcloud
gcloud auth configure-docker $REGION-docker.pkg.dev --quiet

# Build attack box image
echo "Building attack box image..."
cd labs/attack-box
docker build -t $REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/attack-box:latest .
docker push $REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/attack-box:latest
cd ../..

# Build lab images
echo "Building lab images..."
cd labs/lab-01-sqli
docker build -t $REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/lab-01-sqli:latest .
docker push $REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/lab-01-sqli:latest
cd ../..

echo "All images built and pushed successfully!"