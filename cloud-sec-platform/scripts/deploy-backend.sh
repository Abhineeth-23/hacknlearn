#!/bin/bash

PROJECT_ID=$1
REGION=us-central1

# ...existing code...

gcloud run deploy cloud-sec-backend \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars GCP_PROJECT_ID=$PROJECT_ID

echo "Backend deployed successfully!"