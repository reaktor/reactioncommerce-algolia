/**
 * @name getAlgoliaSettings
 * @returns {Object} Algolia settings
 */
export default async function getAlgoliaSettings(context) {
  const {collections: {Packages}} = context;
  const algoliaPackage = await Packages.findOne({name: "reaktor-algolia"});

  if (!algoliaPackage) throw new Error(`No package found with name reaktor-algolia`);

  return algoliaPackage.settings["reaktor-algolia"];
}
