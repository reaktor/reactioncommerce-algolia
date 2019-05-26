/**
 * @name getAlgoliaIndex
 * @param {String} algoliaAppId Algolia App Id
 * @param {String} algoliaAdminApiKey Algolia Admin API Key
 * @param {String} algoliaIndexName Algolia Index Name
 * @returns {Object} The Algolia Index object
 */
export default function getAlgoliaIndex(algoliaAppId, algoliaAdminApiKey, algoliaIndexName) {
  const algoliasearch = require('algoliasearch');
  const algoliaClient = algoliasearch(algoliaAppId, algoliaAdminApiKey);

  return algoliaClient.initIndex(algoliaIndexName);
}
