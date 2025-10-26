variable "region" {
  default     = "sa-east-1"
  description = "Región AWS para el backend"
}

variable "bucket_name" {
  description = "Nombre del bucket S3 para guardar el state"
  default     = "bucket-terraform-state-proyecto-final-mundose"
}

# variable "dynamodb_table" {
#   description = "Nombre de la tabla DynamoDB para el lock del state"
#   default     = "terraform-lock-table"
# }
