import getAlgoliaSettings from "../../util/getAlgoliaSettings";

export default async function algoliaSettings(_, __, context) {
  return await getAlgoliaSettings(context);
}
