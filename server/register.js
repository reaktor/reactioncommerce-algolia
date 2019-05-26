import Reaction from "/imports/plugins/core/core/server/Reaction";
import startup from "./server/no-meteor/startup";
import resolvers from "./server/no-meteor/resolvers";
import schemas from "./server/no-meteor/schemas";

Reaction.registerPackage({
  label: "Reaktor Algolia",
  name: "reaktor-algolia",
  version: "1.0.0",
  autoEnable: true,
  graphQL: {
    resolvers,
    schemas
  },
  settings: {
    "reaktor-algolia": {
      appId: "",
      adminApiKey: "",
      searchOnlyApiKey: "",
      productsIndex: ""
    }
  },
  registry: [
    {
      label: "Reaktor Algolia",
      provides: ["dashboard"],
      container: "dashboard",
      template: "reaktorAlgoliaSettings"
    }
  ],
  functionsByType: {
    startup: [startup]
  }
});
