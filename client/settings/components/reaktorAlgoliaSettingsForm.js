import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextField, Translation } from "/imports/plugins/core/ui/client/components";

class ReaktorAlgoliaSettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        appId:  props.settings.appId,
        adminApiKey:  props.settings.adminApiKey,
        searchOnlyApiKey:  props.settings.searchOnlyApiKey,
        productsIndex:  props.settings.productsIndex
      }
    };
  }

  handleStateChange = (e) => {
    const { settings } = this.state;
    settings[e.target.name] = e.target.value;
    this.setState({ settings });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    return this.props.onSubmit(this.state.settings);
  }


  render() {
    const { settings } = this.props;
    const setting = this.state.settings;

    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Algolia App Id"
            name="appId"
            type="text"
            onChange={this.handleStateChange}
            value={setting.appId}
          />

          <TextField
            label="Algolia Admin API Key"
            name="adminApiKey"
            type="text"
            onChange={this.handleStateChange}
            value={setting.adminApiKey}
          />

          <TextField
            label="Algolia Search Only API Key"
            name="searchOnlyApiKey"
            type="text"
            onChange={this.handleStateChange}
            value={setting.searchOnlyApiKey}
          />

          <TextField
            label="Algolia Products Index Name"
            name="productsIndex"
            type="text"
            onChange={this.handleStateChange}
            value={setting.productsIndex}
          />

          <button className="btn btn-primary pull-right" type="submit">
            <Translation defaultValue="Save Changes" i18nKey="app.saveChanges"/>
          </button>
        </form>

      </div>
    );
  }
}

ReaktorAlgoliaSettingsForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  settings: PropTypes.object
};

export default ReaktorAlgoliaSettingsForm;
