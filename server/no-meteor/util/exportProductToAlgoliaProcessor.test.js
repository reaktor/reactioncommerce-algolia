import ExportProductToAlgoliaProcessor from "./exportProductToAlgoliaProcessor";

const catalogProduct = require("./__mocks__/catalogProduct.json");
const baseCurrency = "USD";
const context = {};

describe("export product to algolia", () => {

  test("media mapping", () => {

    const reactionMedia = catalogProduct.media[0];

    const algoliaMedia = new ExportProductToAlgoliaProcessor(context, baseCurrency).toMedia(reactionMedia);

    const expected = {
      URLs: {
        large: "undefined/assets/files/Media/cEQS2BaPLX4FqYZ8o/large/016170-110.jpg",
        medium: "undefined/assets/files/Media/cEQS2BaPLX4FqYZ8o/medium/016170-110.jpg",
        original: "undefined/assets/files/Media/cEQS2BaPLX4FqYZ8o/image/016170-110.jpg",
        small: "undefined/assets/files/Media/cEQS2BaPLX4FqYZ8o/small/016170-110.png",
        thumbnail: "undefined/assets/files/Media/cEQS2BaPLX4FqYZ8o/thumbnail/016170-110.png"
      }
    };

    expect(algoliaMedia).toEqual(expected);
  });

  test("media mapping with base url", () => {

    const reactionMedia = {
      URLs: {
        small: "http://localhost/assets/files/Media/cEQS2BaPLX4FqYZ8o/small/016170-110.png"
      }
    }

    const algoliaMedia = new ExportProductToAlgoliaProcessor(context, baseCurrency).toMedia(reactionMedia);

    const expected = {
      URLs: {
        small: "http://localhost/assets/files/Media/cEQS2BaPLX4FqYZ8o/small/016170-110.png"
      }
    };

    expect(algoliaMedia).toEqual(expected);
  });

  test("pricing mapping", () => {

    const reactionPrice = catalogProduct.pricing;

    const algoliaPrice = new ExportProductToAlgoliaProcessor(context, baseCurrency).toPrice(reactionPrice);

    const expected = [{
      currencyCode: "USD",
      displayPrice: "$660.00",
      max: 660,
      min: 660
    }];

    expect(algoliaPrice).toEqual(expected);
  });

  test("option mapping", () => {

    const reactionOption = catalogProduct.variants[0].options[0];

    const algoliaOption = new ExportProductToAlgoliaProcessor(context, baseCurrency).toOption(reactionOption);

    expect(algoliaOption._id).toEqual("101824178961");
    expect(algoliaOption.optionId).toEqual("101824178961");
    expect(algoliaOption.title).toEqual("10 Years");
    expect(algoliaOption.inventoryAvailableToSell).toEqual(25);
    expect(algoliaOption.inventoryInStock).toEqual(25);
    expect(algoliaOption.isBackorder).toEqual(false);
    expect(algoliaOption.isLowQuantity).toEqual(false);
    expect(algoliaOption.isSoldOut).toEqual(false);
  });

  test("variant mapping", () => {

    const reactionVariant = catalogProduct.variants[0];

    const algoliaVariant = new ExportProductToAlgoliaProcessor(context, baseCurrency).toVariant(reactionVariant);

    expect(algoliaVariant._id).toEqual("v101824178961");
    expect(algoliaVariant.variantId).toEqual("v101824178961");
    expect(algoliaVariant.title).toEqual("BLACK");
  });

  test("product mapping", () => {

    const reactionProduct = catalogProduct;

    const algoliaProduct = new ExportProductToAlgoliaProcessor(context, baseCurrency).toProduct(reactionProduct);

    expect(algoliaProduct._id).toEqual("016170-110");
    expect(algoliaProduct.objectID).toEqual("016170-110");
    expect(algoliaProduct.productId).toEqual("016170-110");
    expect(algoliaProduct.title).toEqual("Black Lightning Hoodie 4");
    expect(algoliaProduct.description).toEqual("Update his weekend line-up with this hoodie from Neil Barrett. Made from a soft cotton fleece, this hoodie features a lightning motif and side pockets. This kids hoodie is a wardrobe must-have for your little one.");
    expect(algoliaProduct.slug).toEqual("black-lightning-hoodie");
    expect(algoliaProduct.createdAt).toEqual("2019-05-21T08:34:05.237Z");
    expect(algoliaProduct.updatedAt).toEqual("2019-05-22T05:51:07.079Z");
    expect(algoliaProduct.tagIds).toEqual(["tag-jackets"]);
  });
});
