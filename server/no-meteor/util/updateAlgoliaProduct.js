import Logger from "@reactioncommerce/logger";
// import Reaction from "/imports/plugins/core/core/server/Reaction";
import getAlgoliaIndex from "./getAlgoliaIndex";
import getAlgoliaSettings from "./getAlgoliaSettings";

/**
 *
 * @param context
 * @param catalogProduct
 */
export default async function updateAlgoliaProduct(context, catalogProduct) {
  const {appId, adminApiKey, productsIndex} = await getAlgoliaSettings(context);
  const index = getAlgoliaIndex(appId, adminApiKey, productsIndex);

  const { ROOT_URL } = process.env;
  // TODO, get this without using local APIs of reaction
  const baseCurrency = "USD"; //Reaction.getPrimaryShopCurrency();

  const toMedia = (media) => {
    Object.keys(media.URLs).forEach((size => {
      if (!media.URLs[size].includes("http")) {
        media.URLs[size] = ROOT_URL + media.URLs[size]
      }
    }));

    return {
      URLs: media.URLs
    }
  };

  const toPrice = (pricing) => {
    return [{
      displayPrice: pricing[baseCurrency].displayPrice,
      min: pricing[baseCurrency].minPrice,
      max: pricing[baseCurrency].maxPrice
    }]
  }

  const toOption = (option) => {
    return {
      _id: option._id,
      optionId: option._id,
      title: option.title,
      price: option.price,
      pricing: toPrice(option.pricing),
      inventoryAvailableToSell: option.inventoryAvailableToSell,
      inventoryInStock: option.inventoryInStock,
      isBackorder: option.isBackorder,
      isLowQuantity: option.isLowQuantity,
      isSoldOut: option.isSoldOut
    }
  };

  const toVariant = (variant) => {
    return {
      _id: variant._id,
      variantId: variant._id,
      title: variant.title,
      media: variant.media.map(media => toMedia(media)),
      price: variant.price,
      pricing: toPrice(variant.pricing),
      option: variant.options.map(option => toOption(option))
    }
  };

  const publicProduct = {
    _id: catalogProduct._id,
    objectID: catalogProduct._id,
    productId: catalogProduct._id,
    title: catalogProduct.title,
    description: catalogProduct.description,
    variants: catalogProduct.variants.map(variant => toVariant(variant)),
    pricing: toPrice(catalogProduct.pricing),
    primaryImage: catalogProduct.primaryImage,
    media: catalogProduct.media.map(media => toMedia(media)),
    tagIds: catalogProduct.tagIds,
    slug: catalogProduct.slug,
    createdAt: catalogProduct.createdAt,
    updatedAt: catalogProduct.updatedAt
  };

  const execute = () => {
    index.partialUpdateObject(publicProduct, true, (err, content) => {
      if (err) {
        Logger.error("Error while sending product to Algolia:", err, catalogProduct)
      } else {
        Logger.info("Successfully sent product to Algolia:", content)
      }
    });
  };
}
