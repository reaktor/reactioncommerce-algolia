import updateAlgoliaProduct from "./util/updateAlgoliaProduct";
import deleteAlgoliaProduct from "./util/deleteAlgoliaProduct";

/**
 * @summary Called on startup
 * @param {Object} context Startup context. This is the normal app context but without
 *   any information about the current request because there is no current request.
 * @returns {undefined}
 */
export default function startup(context) {

  context.appEvents.on("afterPublishProductToCatalog", ({ catalogProduct }) => {
    // TODO: this logic needs to improve, we need to better handle the case when a product is made invisible
    if (catalogProduct.isVisible) {
      updateAlgoliaProduct(context, catalogProduct).execute();
    }
  });

  context.appEvents.on("afterProductSoftDelete", ({ product }) => {
    deleteAlgoliaProduct(context, product);
  });

}
