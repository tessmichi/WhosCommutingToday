resource "azurerm_cosmosdb_account" "cosmos_account" {
  name                = "dbc-${var.suffix}"
  resource_group_name = var.resource_group
  location            = var.region

  offer_type = "Standard"
  kind       = "GlobalDocumentDB"

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 10
    max_staleness_prefix    = 200
  }

  geo_location {
    location          = var.region
    failover_priority = 0
  }
}
/*
resource "azurerm_container_group" "cosmos_containers" {
  name                = "cosmos-db-containers-${var.suffix}"
  resource_group_name = var.resource_group
  location            = var.region

  os_type = "linux"

  container {
    name   = var.suffix
    image  = "mcr.microsoft.com/azuredocs/azure-vote-front:cosmosd"
    cpu    = "0.5"
    memory = "1.5"
  }
}
*/