resource "azurerm_resource_group" "main" {
  name     = "rg-${local.resource_suffix}"
  location = var.region

  tags = local.tags
}
