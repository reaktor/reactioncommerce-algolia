import { Template } from "meteor/templating";
import { ReaktorAlgoliaSettingsFormContainer } from "../containers";
import "./reaktorAlgoliaSettings.html";

Template.reaktorAlgoliaSettings.helpers({
  ReaktorAlgoliaSettings() {
    return {
      component: ReaktorAlgoliaSettingsFormContainer
    };
  }
});
