variable "region" {
  type        = string
  description = "An Azure region's name as it will be used directly to deploy"
}

variable "business_unit" {
  type        = string
  description = "Name of the organization"
}

variable "app_name" {
  type        = string
  default     = "WhosCommutingToday"
  description = "Name of the project"
}

variable "environment" {
  type    = string
  default = "dev"
}
