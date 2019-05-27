import Reaction from "/imports/plugins/core/core/server/Reaction";
import ExportProductToAlgoliaProcessor from "./util/exportProductToAlgoliaProcessor";
import DeleteProductInAlgoliaProcessor from "./util/deleteProductInAlgoliaProcessor";

/**
 * @summary Called on startup
 * @param {Object} context Startup context. This is the normal app context but without
 *   any information about the current request because there is no current request.
 * @returns {undefined}
 */
export default function startup(context) {

  const baseCurrency = Reaction.getPrimaryShopCurrency();

  context.appEvents.on("afterPublishProductToCatalog", ({ catalogProduct }) => {
    if (catalogProduct.isVisible) {
      new ExportProductToAlgoliaProcessor(context, baseCurrency).execute(catalogProduct);
    }
  });

  context.appEvents.on("afterProductSoftDelete", ({ product }) => {
    new DeleteProductInAlgoliaProcessor(context).execute(product);
  });

}
