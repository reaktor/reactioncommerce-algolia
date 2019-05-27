import Logger from "@reactioncommerce/logger";
import getAlgoliaIndex from "./getAlgoliaIndex";
import getAlgoliaSettings from "./getAlgoliaSettings";

export default class DeleteProductInAlgoliaProcessor {

  /**
   *
   * @param context
   */
  constructor(context) {
    this.context = context;
  }

  async execute(catalogProduct) {
    const {appId, adminApiKey, productsIndex} = await getAlgoliaSettings(this.context);
    const index = getAlgoliaIndex(appId, adminApiKey, productsIndex);

    index.deleteObject(catalogProduct._id, (err, content) => {
      if (err) {
        Logger.error("Error while deleting product from Algolia:", err, catalogProduct)
      } else {
        Logger.info("Successfully deleted product to Algolia:", content)
      }
    });
  }
}
