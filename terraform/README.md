# Deploy de infraestructura para aplicacion ecomerce

Este proyecto despliega una infraestructura en **AWS**, utilizando **Terraform**, con los siguientes objetivos:

- Crear un **backend S3** para almacenar el estado remoto (`terraform.tfstate`)
- Crea recursos de red:
    - aws_vpc.main – VPC principal (CIDR 10.0.0.0/16)
    - aws_internet_gateway.gw 
    - Internet Gateway asociado a la VPC
    - aws_subnet.public – Subred pública (CIDR 10.0.1.0/24)
    - aws_route_table.public 
    - Tabla de ruteo pública con ruta 0.0.0.0/0 hacia el Internet Gateway
    - aws_route_table_association.public_assoc 
    - Asociación entre la tabla de ruteo pública y la subred
    - aws_security_group.ecs_sg – Grupo de seguridad con reglas de entrada en puertos 80 (HTTP) y 443 (HTTPS) y salida libre (0.0.0.0/0)
- Crear un entorno ECS con **Fargate**
- Exponer los puertos **80 (HTTP)** y **443 (HTTPS)** al público
---

## Estructura del proyecto

## Estructura del proyecto
```
  terraform-proyecto-mundosE/
  ├── backend-bootstrap/               # Crea el bucket S3 para el backend
  │   ├── main.tf
  │   ├── provider.tf
  │   ├── variables.tf
  │   └── terraform.tfvars
  │
  └── ecs-deploy/                      # Despliega la infraestructura ECS Fargate
      ├── backend.tf
      ├── provider.tf
      ├── networking.tf
      ├── iam.tf
      ├── ecs.tf
      ├── variables.tf
      ├── outputs.tf
      └── terraform.tfvars
```
---

## Infraestructura que se crea

### **1️ Backend (fase bootstrap)**
Terraform crea los recursos necesarios para almacenar su propio estado:

- **S3 Bucket** (versionado y encriptado con AES256)
- **DynamoDB Table** (para bloqueo del state file)

>  Estos recursos se crean una sola vez y luego son usados por el resto de tus proyectos Terraform.

---

### **2️ ECS Deploy (fase infraestructura)**

Terraform crea los siguientes recursos:

| Tipo | Recurso | Descripción |
|------|----------|-------------|
| **Networking** | VPC, Subnet pública, Internet Gateway, Route Table, Security Group | Infraestructura base de red con salida a Internet y puertos 80/443 abiertos |
| **IAM** | Role + Policy Attachment | Permite a ECS ejecutar contenedores y acceder a logs |
| **ECS Cluster** | `aws_ecs_cluster.main` | Cluster donde corren las tareas Fargate |
| **ECS Task Definition** | `aws_ecs_task_definition.app` | Define el contenedor a ejecutar (imagen `nginxdemos/hello:latest`) |
| **ECS Service** | `aws_ecs_service.app_service` | Despliega y mantiene en ejecución una tarea Fargate con IP pública |
| **Outputs** | `ecs_cluster_name`, `ecs_service_name`, `subnet_public`, `security_group` | Información básica de salida |

---

## Requisitos previos

- Cuenta AWS con permisos suficientes (IAM + ECS + S3 + DynamoDB)
- Terraform >= 1.6.0
- AWS CLI configurado con credenciales válidas:
    - aws configure
    - Configurar la región que quieras usar (ej. us-east-1 o sa-east-1)

 ## Instrucciones de uso
 # Crear el backend
Entrar en la carpeta de bootstrap y crear el backend remoto:

  - cd backend-bootstrap
  - terraform init
  - terraform apply -auto-approve

Esto crea el bucket S3 y la tabla DynamoDB.
Guardá los nombres generados (se usan en el siguiente paso).

# Desplegar la infraestructura ECS

Entrar a la carpeta principal del despliegue:

  - cd ../ecs-deploy

Editar el archivo backend.tf y poner el nombre del bucket S3 y la región creados en la fase anterior:
```
terraform {
  backend "s3" {
    bucket         = "bucket-terraform-state-fmoreno-001"
    key            = "ecs/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-lock-table"
  }
}


Inicializar y desplegar:

  - terraform init -reconfigure
  - terraform apply -auto-approve

Al finalizar, verás:

Apply complete! Resources: XX added, XX changed, 0 destroyed.

 - Obtener la IP pública
 - Opción 1 — Desde la consola AWS
 - Ir a Amazon ECS Console
 - Seleccionar tu cluster ejemplo: (miapp-demo-cluster)

Ir a Tasks → Task ID → Networking

Copiar el campo Public IP

Abrir en el navegador:

http://<ip-publica>