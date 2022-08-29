const { default: axios } = require("axios");
const { initializeApp, getMethodName } = require("../dist");

jest.mock("axios");

describe("fetchUsers", () => {
  let shopifyAdminApp = initializeApp({
    shop: "nike",
    apiKey: "123456789",
    apiVersion: "2021-10",
    accessToken: "at99999"
  });

  it("Get single item - GET/admin/api/2021-10/custom_collections/841564295.json", async () => {
    const collectionName = "custom_collection";
    const docId = "1";
    const expected = {
      data: {
        title: "customCollection1"
      }
    };

    axios.get.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp.collection(collectionName).doc(docId).get();

    expect(axios.get).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/custom_collections/1.json`);
    expect(actual).toEqual(expected);
  });

  it("Get all items - GET /admin/api/2021-10/custom_collections.json", async () => {
    const collectionName = "custom_collection";
    const expected = {
      data: {
        "custom_collections": [
          {
            id: 1,
            title: "event 1"
          }
        ]
      }
    };

    axios.get.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp.collection(collectionName).get();

    expect(axios.get).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/custom_collections.json`);
    expect(actual).toEqual(expected);
  });

  it("Count items - GET /admin/api/2021-10/custom_collections/count.json", async () => {
    const collectionName = "custom_collection";
    const expected = {
      data: {
        "count": 10
      }
    };

    axios.get.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp.collection(collectionName).count();

    expect(axios.get).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/custom_collections/count.json`);
    expect(actual).toEqual(expected);
  });

  it("Count items width query - GET /admin/api/2021-10/custom_collections/count.json", async () => {
    const collectionName = "custom_collection";
    const expected = {
      data: {
        "count": 10
      }
    };

    axios.get.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp.collection(collectionName).where("product_id", "=", 632910392).count();

    expect(axios.get).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/custom_collections/count.json?product_id=632910392`);
    expect(actual).toEqual(expected);
  });

  it("Query a list of items 1 - GET /admin/api/2021-10/custom_collections.json", async () => {
    const collectionName = "custom_collection";
    const expected = {
      data: {
        "custom_collections": [
          {
            id: 1,
            title: "event 1"
          }
        ]
      }
    };

    axios.get.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp.collection(collectionName).where("product_id", "=", 632910392).get();

    expect(axios.get).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/custom_collections.json?product_id=632910392`);
    expect(actual).toEqual(expected);
  });

  it("Query a list of items 2 - GET /admin/api/2021-10/custom_collections.json", async () => {
    const collectionName = "custom_collection";
    const expected = {
      data: {
        "custom_collections": [
          {
            id: 1,
            title: "event 1"
          }
        ]
      }
    };

    axios.get.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp
      .collection(collectionName)
      .where("since_id", "=", 132532)
      .where("product_id", "=", 632910392)
      .get();

    expect(axios.get).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/custom_collections.json?since_id=132532&product_id=632910392`);
    expect(actual).toEqual(expected);
  });

  it("Create collection item - POST /admin/api/2021-10/custom_collections.json", async () => {
    const collectionName = "custom_collection";
    const expected = {
      data: {
        title: "event 1"
      }
    };

    axios.post.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp.collection(collectionName).add({ title: "event 1" });

    expect(axios.post).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/custom_collections.json`, {
      custom_collection: {
        title: "event 1"
      }
    });
    expect(actual).toEqual(expected);
  });

  it("Update an item - PUT /admin/api/2021-10/custom_collections/841564295.json", async () => {
    const collectionName = "custom_collection";
    const docId = "1";
    const expected = {
      data: {
        title: "event 1"
      }
    };

    axios.put.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp.collection(collectionName).doc(docId).update({ title: "event 1" });

    expect(axios.put).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/custom_collections/1.json`, {
      custom_collection: {
        title: "event 1"
      }
    });
    expect(actual).toEqual(expected);
  });

  it("Delete item - DELETE /admin/api/2021-10/custom_collections/841564295.json", async () => {
    const collectionName = "custom_collection";
    const docId = "1";
    const expected = {
      data: {}
    };

    axios.delete.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp.collection(collectionName).doc(docId).delete();

    expect(axios.delete).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/custom_collections/1.json`);
    expect(actual).toEqual(expected);
  });

  it("CustomAction 1 - PUT /admin/api/2021-10/customers/207119551/addresses/1053317290/default.json", async () => {
    const collectionName = "customers/207119551/address";
    const docId = "1053317290";
    const expected = {
      data: {
        default: true
      }
    };

    axios.put.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp
      .collection(collectionName)
      .doc(docId)
      .execAction(getMethodName().PUT, "default")

    expect(axios.put).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/customers/207119551/addresses/1053317290/default.json`);
    expect(actual).toEqual(expected);
  });

  it("CustomAction 2 with query - GET /admin/api/2021-10/gift_cards/search.json?query=last_characters:mnop", async () => {
    const collectionName = "gift_card";
    const expected = {
      data: {
        default: true
      }
    };

    axios.get.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp
      .collection(collectionName)
      .where("query", "=", "last_characters:mnop")
      .execAction(getMethodName().GET, "search");

    expect(axios.get).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/gift_cards/search.json?query=last_characters:mnop`);
    expect(actual).toEqual(expected);
  });

  it("CustomAction 3 with data - POST /admin/api/2021-10/price_rules/507328175/batch.json", async () => {
    const collectionName = "price_rule";
    const expected = {
      data: {
        "discount_code_creation": {
          "id": 989355119
        }
      }
    };

    axios.post.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp
      .collection(collectionName)
      .doc("507328175")
      .execAction(getMethodName().POST, "batch", {
        "discount_codes": [
          { "code": "SUMMER1" },
          { "code": "SUMMER2" },
          { "code": "SUMMER3" }
        ]
      });

    expect(axios.post).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/price_rules/507328175/batch.json`, {
      "discount_codes": [
        { "code": "SUMMER1" },
        { "code": "SUMMER2" },
        { "code": "SUMMER3" }
      ]
    });
    expect(actual).toEqual(expected);
  });

  it("CustomAction 4 - GET /admin/api/2021-10/price_rules/507328175/batch/173232803.json", async () => {
    const collectionName = "price_rules/507328175/batch";
    const docId = "173232803";
    const expected = {
      data: {
        id: 1321
      }
    };

    axios.get.mockResolvedValueOnce(expected);

    const actual = await shopifyAdminApp
      .collection(collectionName, true)
      .doc(docId)
      .get();

    expect(axios.get).toHaveBeenCalledWith(`https://123456789:at99999@nike/admin/api/2021-10/price_rules/507328175/batch/173232803.json`);
    expect(actual).toEqual(expected);
  });
});