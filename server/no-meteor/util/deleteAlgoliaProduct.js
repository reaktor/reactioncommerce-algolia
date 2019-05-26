import Logger from "@reactioncommerce/logger";
import getAlgoliaIndex from "./getAlgoliaIndex";
import getAlgoliaSettings from "./getAlgoliaSettings";

/**
 *
 * @param context
 * @param catalogProduct
 */
export default async function deleteAlgoliaProduct(context, catalogProduct) {
  const {appId, adminApiKey, productsIndex} = await getAlgoliaSettings(context);
  const index = getAlgoliaIndex(appId, adminApiKey, productsIndex);

  index.deleteObject(catalogProduct._id, (err, content) => {
    if (err) {
      Logger.error("Error while deleting product from Algolia:", err, catalogProduct)
    } else {
      Logger.info("Successfully deleted product to Algolia:", content)
    }
  });
}
