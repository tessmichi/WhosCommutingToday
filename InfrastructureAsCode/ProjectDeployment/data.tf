module "data" {
  source = "./data"

  region         = var.region
  resource_group = azurerm_resource_group.main.name

  suffix = local.resource_suffix_condensed
}
