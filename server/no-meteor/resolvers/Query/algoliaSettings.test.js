import mockContext from "../../../test-utils/mockContext";
import algoliaSettings from "./algoliaSettings"

describe("algoliaSettings", () => {

    test("+ when registered", async () => {

        mockContext.collections.Packages.findOne.mockReturnValueOnce(Promise.resolve({
            "settings" : {
                "reaktor-algolia" : {
                    "appId" : "appId",
                    "adminApiKey" : "adminApiKey",
                    "searchOnlyApiKey" : "searchOnlyApiKey",
                    "productsIndex" : "productsIndex"
                }
            }
        }));

        await expect(algoliaSettings({}, {}, mockContext))
            .resolves
            .toEqual({
                "appId" : "appId",
                "adminApiKey" : "adminApiKey",
                "searchOnlyApiKey" : "searchOnlyApiKey",
                "productsIndex" : "productsIndex"
            })
    });
});


