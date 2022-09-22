# Deploying the project code

This folder is for deploying the code necessary to run the project components.

## Run commands

```bash
terraform init -upgrade -backend-config backend.tfvars
terraform fmt --recursive && rm -f plan.out && terraform plan -var-file=terraform.tfvars --out plan.out
terraform apply plan.out && terraform show
```
