import Logger from "@reactioncommerce/logger";
import getAlgoliaIndex from "./getAlgoliaIndex";
import getAlgoliaSettings from "./getAlgoliaSettings";

export default class ExportProductToAlgoliaProcessor {

  /**
   *
   * @param context
   * @param baseCurrency
   */
  constructor(context, baseCurrency) {
    this.context = context;
    this.baseCurrency = baseCurrency;
    this.rootUrl = process.env.ROOT_URL;
  }

  toMedia(media) {
    Object.keys(media.URLs).forEach((size => {
      if (!media.URLs[size].includes("http")) {
        media.URLs[size] = this.rootUrl + media.URLs[size]
      }
    }));

    return {
      URLs: media.URLs
    }
  };

  toPrice(pricing) {
    return [{
      currencyCode: this.baseCurrency,
      displayPrice: pricing[this.baseCurrency].displayPrice,
      min: pricing[this.baseCurrency].minPrice,
      max: pricing[this.baseCurrency].maxPrice
    }]
  };

  toOption(option) {
    return {
      _id: option._id,
      optionId: option._id,
      title: option.title,
      price: option.price,
      pricing: this.toPrice(option.pricing),
      inventoryAvailableToSell: option.inventoryAvailableToSell,
      inventoryInStock: option.inventoryInStock,
      isBackorder: option.isBackorder,
      isLowQuantity: option.isLowQuantity,
      isSoldOut: option.isSoldOut
    }
  };

  toVariant(variant) {
    return {
      _id: variant._id,
      variantId: variant._id,
      title: variant.title,
      media: variant.media.map(media => this.toMedia(media)),
      price: variant.price,
      pricing: this.toPrice(variant.pricing),
      option: variant.options.map(option => this.toOption(option))
    }
  };

  toProduct(catalogProduct) {
    return {
      _id: catalogProduct._id,
      objectID: catalogProduct._id,
      productId: catalogProduct._id,
      title: catalogProduct.title,
      description: catalogProduct.description,
      variants: catalogProduct.variants.map(variant => this.toVariant(variant)),
      pricing: this.toPrice(catalogProduct.pricing),
      primaryImage: catalogProduct.primaryImage,
      media: catalogProduct.media.map(media => this.toMedia(media)),
      tagIds: catalogProduct.tagIds,
      slug: catalogProduct.slug,
      createdAt: catalogProduct.createdAt,
      updatedAt: catalogProduct.updatedAt
    };
  }

  async execute(catalogProduct) {

    const { appId, adminApiKey, productsIndex } = await getAlgoliaSettings(this.context);
    const index = getAlgoliaIndex(appId, adminApiKey, productsIndex);
    const product = this.toProduct(catalogProduct);

    index.partialUpdateObject(product, true, (err, content) => {
      if (err) {
        Logger.error("Error while sending product to Algolia:", err, catalogProduct)
      } else {
        Logger.info("Successfully sent product to Algolia:", content)
      }
    });
  };
}
