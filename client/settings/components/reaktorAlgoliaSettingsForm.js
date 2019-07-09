import React, { Component } from "react";
import PropTypes from "prop-types";

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
    const setting = this.state.settings;

    return (
        <form onSubmit={this.handleSubmit}>

          <div>
            <label>
              Algolia App Id:
              <input
                name="appId"
                type="text"
                onChange={this.handleStateChange}
                value={setting.appId}
              />
            </label>
          </div>
          <div>
            <label>
              Algolia Admin API Key
              <input
                name="adminApiKey"
                type="text"
                onChange={this.handleStateChange}
                value={setting.adminApiKey}
              />
            </label>
          </div>

          <div>
            <label>
              Algolia Search Only API Key
              <input
                name="searchOnlyApiKey"
                type="text"
                onChange={this.handleStateChange}
                value={setting.searchOnlyApiKey}
              />
            </label>
          </div>

          <div>
            <label>
              Algolia Products Index Name
              <input
                label="Algolia Products Index Name"
                name="productsIndex"
                type="text"
                onChange={this.handleStateChange}
                value={setting.productsIndex}
              />
            </label>
          </div>

          <button className="btn btn-primary pull-right" type="submit">
            Save Changes
          </button>
        </form>

    );
  }
}

ReaktorAlgoliaSettingsForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  settings: PropTypes.object
};

export default ReaktorAlgoliaSettingsForm;
