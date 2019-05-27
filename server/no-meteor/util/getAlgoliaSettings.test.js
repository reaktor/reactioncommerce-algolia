import mockContext from "../../test-utils/mockContext";
import getAlgoliaSettings from "./getAlgoliaSettings";

describe("getAlgoliaSettings", () => {
    test("- when not found", async () => {
        mockContext.collections.Packages.findOne.mockReturnValueOnce(Promise.resolve());

        await expect(getAlgoliaSettings(mockContext))
            .rejects
            .toThrow(Error)
    });

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

        await expect(getAlgoliaSettings(mockContext))
            .resolves
            .toEqual({
            "appId" : "appId",
            "adminApiKey" : "adminApiKey",
            "searchOnlyApiKey" : "searchOnlyApiKey",
            "productsIndex" : "productsIndex"
        })
    });
});


