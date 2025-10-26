terraform {
  backend "s3" {
    bucket         = "bucket-terraform-state-proyecto-final-mundose"  # el creado arriba en backend-bootstrap
    key            = "state/terraform.tfstate"
    region         = "sa-east-1"
    encrypt        = true
    # dynamodb_table = "terraform-lock-table"
  }
}
