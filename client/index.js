import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { registerOperatorRoute } from "/imports/client/ui";

import "./settings/components";
import "./settings/containers";

import "./settings/templates/reaktorAlgoliaSettings.html";
import "./settings/templates/reaktorAlgoliaSettings.js";

registerOperatorRoute({
  isNavigationLink: true,
  isSetting: true,
  mainComponent: "reaktorAlgoliaSettings",
  path: "/reaktor-algolia",
  SidebarIconComponent: (props) => <FontAwesomeIcon icon={faSearch} {...props} />,
  sidebarI18nLabel: "admin.dashboard.reaktorAlgoliaLabel"
});
