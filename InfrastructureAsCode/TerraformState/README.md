# Deploying the tfstate

This folder contains contents needed to deploy a remote terraform state.

## Run commands

```bash
terraform init -upgrade
terraform fmt --recursive && rm -f plan.out && terraform plan -var-file=terraform.tfvars --out plan.out
terraform apply plan.out && terraform show
```
