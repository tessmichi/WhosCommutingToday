locals {
  // Make suffixes easy to access
  resource_suffix           = "${var.business_unit}-${var.app_name}"
  resource_suffix_condensed = substr(lower(replace(local.resource_suffix, "-", "")), 0, 24)

  // Add same tags to all resources here
  tags = {
    "business_unit" = var.business_unit
    "app"           = var.app_name
    "env"           = var.environment
    "kind"          = "state"
  }

  // Easy access for whether or not this is production
  is_production = terraform.workspace == "prod" ? true : false
}
