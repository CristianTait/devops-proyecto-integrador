variable "region" {
  default     = "sa-east-1"
  description = "Región AWS"
}

variable "container_image" {
  description = "URL de la imagen del contenedor (GitHub o Docker Hub)"
  type        = string
}

variable "project_name" {
  description = "Nombre base del proyecto"
  default     = "trabajo-final-mundose"
}
