const mockContext = {
    accountId: "FAKE_ACCOUNT_ID",
    appEvents: {
        emit() {},
        on() {}
    },
    collections: {},
    getFunctionsOfType: jest.fn().mockName("getFunctionsOfType").mockReturnValue([]),
    mutations: {},
    queries: {},
    shopId: "FAKE_SHOP_ID",
    userHasPermission: jest.fn().mockName("userHasPermission"),
    userId: "FAKE_USER_ID"
};

export function mockCollection(collectionName) {
    return {
        findOne: jest.fn().mockName(`${collectionName}.findOne`)
    };
}

["Packages"].forEach((collectionName) => {
    mockContext.collections[collectionName] = mockCollection(collectionName);
});

export default mockContext;
