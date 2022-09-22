variable "region" {
  type        = string
  description = "Azure region to deploy resources in this module in"
}

variable "resource_group" {
  type        = string
  description = "Resource group to add resources from this module to"
}

variable "suffix" {
  type        = string
  description = "Suffix for all resources in this module"
}
