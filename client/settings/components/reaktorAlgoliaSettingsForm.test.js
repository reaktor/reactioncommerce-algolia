import React from "react";
import renderer from 'react-test-renderer';
import ReaktorAlgoliaSettingsForm from "./reaktorAlgoliaSettingsForm";

const onChange = () => true;
const onSubmit = () => true;

test("ReaktorAlgoliaSettingsForm without settings", () => {
    const settings = {};
    const tree = renderer.create(
        <ReaktorAlgoliaSettingsForm settings={settings} onChange={onChange} onSubmit={onSubmit} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test("ReaktorAlgoliaSettingsForm with settings", () => {
    const settings = {
        "appId" : "appId",
        "adminApiKey" : "adminApiKey",
        "searchOnlyApiKey" : "searchOnlyApiKey",
        "productsIndex" : "productsIndex"
    };

    const tree = renderer.create(
        <ReaktorAlgoliaSettingsForm settings={settings} onChange={onChange} onSubmit={onSubmit} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
