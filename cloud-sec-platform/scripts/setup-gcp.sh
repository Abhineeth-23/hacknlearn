#!/bin/bash

# Cloud Security Platform - GCP Setup Script
# This script enables required APIs and creates necessary resources

set -e

PROJECT_ID=${1:-"cloud-sec-platform"}
REGION=${2:-"us-central1"}

echo "Setting up GCP project: $PROJECT_ID"

# Create project if it doesn't exist
gcloud projects create $PROJECT_ID --name="Cloud Security Platform" || echo "Project already exists"

# Set project
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "Enabling APIs..."
gcloud services enable container.googleapis.com \
    artifactregistry.googleapis.com \
    compute.googleapis.com \
    --project=$PROJECT_ID

# Create service account
echo "Creating service account..."
gcloud iam service-accounts create cloud-sec-sa \
    --description="Service account for Cloud Security Platform" \
    --display-name="Cloud Security SA" \
    --project=$PROJECT_ID

# Grant necessary roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:cloud-sec-sa@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/container.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:cloud-sec-sa@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:cloud-sec-sa@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/compute.admin"

# Create and download service account key
echo "Creating service account key..."
gcloud iam service-accounts keys create service-account.json \
    --iam-account=cloud-sec-sa@$PROJECT_ID.iam.gserviceaccount.com \
    --project=$PROJECT_ID

echo "Setup complete! Service account key saved to service-account.json"