#!/bin/bash

# Deploy backend to Google Cloud Run

set -e

PROJECT_ID=${1:-"cloud-sec-platform"}
REGION=${2:-"us-central1"}
SERVICE_NAME="cloud-sec-backend"

# Build and deploy to Cloud Run
echo "Building and deploying backend to Cloud Run..."
cd backend

# Build the container
docker build -t gcr.io/$PROJECT_ID/$SERVICE_NAME:latest .

# Push to Container Registry
docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:latest

# Deploy to Cloud Run
gcloud run deploy $SERVICE_NAME \
    --image gcr.io/$PROJECT_ID/$SERVICE_NAME:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --set-env-vars "GCP_PROJECT_ID=$PROJECT_ID" \
    --project=$PROJECT_ID

echo "Backend deployed successfully!"