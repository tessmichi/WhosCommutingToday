resource "azurerm_storage_account" "main" {
  name                     = local.resource_suffix_condensed
  resource_group_name      = azurerm_resource_group.main.name
  location                 = var.region
  account_tier             = "Standard"
  account_replication_type = "GRS"

  account_kind              = "StorageV2"
  access_tier               = "Cool"
  enable_https_traffic_only = true
  //min_tls_version           = "TLS1_2"
  allow_blob_public_access = false

  /*
  identity {
    type = "SystemAssigned"
  }
*/

  tags = local.tags
}

resource "azurerm_storage_container" "infrastructure" {
  name                 = "infrastructure"
  storage_account_name = azurerm_storage_account.main.name
}
