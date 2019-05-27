# Reaktor Algolia Plugin for Reaction Commerce

Welcome to the Reaktor Algolia Plugin for Reaction Commerce. This is a plugin which can be used on the reaction commerce platform to publish your catalog to Algolia.

### What is Reaction Commerce?
Reaction Commerce is a modern, open source platform for today's premier ecommerce experiences. It is a lightweight, real-time reactive commerce solution that redefines, simplifies, and aligns both the experiences of the user and the vendor.

https://www.reactioncommerce.com/

### What is Algolia?
A powerful hosted search API that provides product teams with the resources & tools they need to create fast, relevant search.

https://www.algolia.com/

### How does it work?
It's very simple, when an administrator in Reaction Commerce publishes a product to the catalog, this plugin listens to that event and updates a document in Algolia. That document is then indexed and can be queried by the storefront for fast relevant search.

The plugin provides an admin panel available to the administrator to configure the API keys and index information.

To help the storefront application, the Algolia settings are exposed by a GraphQL query so the application can access the search only api key from Algolia.

## Installation

Assumption is that you already have reaction commerce cloned on your machine.

1. Clone this repo into `/imports/plugins/custom`
1. And you're done! Just start or restart your application and that's it.

## Configuration

Assumption is that you already have an Algolia account.

1. Login to your admin area of reaction
1. Click on `Algolia Search`
1. Then provide the following details
    1. Algolia App Id
    1. Algolia Admin API Key
    1. Algolia Search Only API Key
    1. Algolia Products Index Name
1. Then click save
1. Finally, add or edit a product in the products catalog and then after a few seconds see the document indexed in Algolia


