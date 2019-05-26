import React, { Component } from "react";
import PropTypes from "prop-types";
import { composeWithTracker } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { Packages } from "/lib/collections";
import { Reaction, i18next } from "/client/api";
import { ReaktorAlgoliaSettingsForm } from "../components";

class ReaktorAlgoliaSettingsFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appId:  "",
      adminApiKey:  "",
      searchOnlyApiKey: "",
      productsIndex:  ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
  }

  handleSubmit(settings) {
    const packageId = this.props.packageData._id;
    const { settingsKey } = this.props.packageData.registry[0];

    const fields = [
      {
        property: "appId",
        value: settings.appId
      },
      {
        property: "adminApiKey",
        value: settings.adminApiKey
      },
      {
        property: "searchOnlyApiKey",
        value: settings.searchOnlyApiKey
      },
      {
        property: "productsIndex",
        value: settings.productsIndex
      }];

    this.saveUpdate(fields, packageId, settingsKey);
  }

  saveUpdate(fields, id, settingsKey) {
    Meteor.call("registry/update", id, settingsKey, fields, (err) => {
      if (err) {
        return Alerts.toast(i18next.t("admin.settings.saveFailed"), "error");
      }
      return Alerts.toast(i18next.t("admin.settings.saveSuccess"), "success");
    });
  }

  render() {
    return (
      <ReaktorAlgoliaSettingsForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        settings={this.props.packageData.settings["reaktor-algolia"]}
      />
    );
  }
}

ReaktorAlgoliaSettingsFormContainer.propTypes = {
  packageData: PropTypes.object
};

const composer = (props, onData) => {
  const subscription = Meteor.subscribe("Packages", Reaction.getShopId());
  if (subscription.ready()) {
    const packageData = Packages.findOne({
      name: "reaktor-algolia",
      shopId: Reaction.getShopId()
    });
    onData(null, { packageData });
  }
};

export default composeWithTracker(composer)(ReaktorAlgoliaSettingsFormContainer);
