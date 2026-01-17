resource "google_artifact_registry_repository" "my-repo" {
  location      = var.region
  repository_id = "cloud-sec-repo"
  description   = "Docker repository for cloud security labs"
  format        = "DOCKER"
}