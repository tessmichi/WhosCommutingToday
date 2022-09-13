locals {
  // Make suffixes easy to access
  resource_suffix           = "${var.business_unit}-${var.app_name}-tfstate"
  resource_suffix_condensed = lower(replace(substr(local.resource_suffix, 0, 24), "-", ""))

  // Add same tags to all resources here
  tags = {
    "business_unit" = var.business_unit
    "app"           = var.app_name
    "env"           = var.environment
    "kind"          = "state"
  }
}