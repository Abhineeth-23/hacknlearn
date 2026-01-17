# Cloud Security Platform

A cloud-based cybersecurity training platform that allows users to practice offensive security techniques in isolated, ephemeral environments.

## Architecture

- **Infrastructure**: Terraform-managed GCP resources (GKE cluster, VPC, Artifact Registry)
- **Backend**: Node.js API server that manages Kubernetes resources for labs
- **Frontend**: React web app for user interface
- **Labs**: Containerized vulnerable applications and attack tools

## Prerequisites

- Google Cloud Platform account with billing enabled
- Terraform installed
- Node.js and npm
- Docker
- kubectl configured for GKE

## Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd cloud-sec-platform
   ```

2. **Set up GCP project**
   ```bash
   ./scripts/setup-gcp.sh
   ```
   This enables required APIs and creates service accounts.

3. **Configure environment**
   - Copy `.env.example` to `.env` and fill in your GCP credentials
   - Update `infrastructure/variables.tf` with your project ID, region, etc.

4. **Build and push lab images**
   ```bash
   ./scripts/build-images.sh
   ```

5. **Deploy infrastructure**
   ```bash
   cd infrastructure
   terraform init
   terraform apply
   ```

6. **Deploy backend**
   ```bash
   ./scripts/deploy-backend.sh
   ```

## Running Locally

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Usage

1. Access the frontend at http://localhost:3000
2. Select a lab from the dashboard
3. Click "Start Lab" to spin up isolated containers
4. Use the terminal interface to interact with the attack box
5. Practice security techniques on the target applications

## Labs

- **Lab 1: SQL Injection** - Vulnerable web app with SQLi flaws

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Submit a pull request

## License

MIT License