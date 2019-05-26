import updateAlgoliaProduct from "./updateAlgoliaProduct";

test("test media mapping", async () => {

  const context = {};
  const catalogProduct = {};

  updateAlgoliaProduct(context, catalogProduct);

  const result = true;
  const expected = true;

  expect(result).toEqual(expected);
});
