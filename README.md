## Introduction

Shopabase is a wrapper of Shopify admin RESTapi. It is heavily inspired by firebase/firestore which allows the apis to be written in queries.  
Installation:

**npm install shopabase** or **yarn add shopabase**  
 

---

##   
Setup

```css
const { initializeApp } = require("shopabase");

let shopifyAdminApp = initializeApp({
  shop: process.env.SHOPIFY_STORE_NAME,
  apiKey: process.env.SHOPIFY_ADMIN_API_KEY,
  apiVersion: process.env.SHOPIFY_ADMIN_API_VERSION,
  accessToken: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN
});
```

## Queries

```css

  // GET
  // Get by id
  const { data } = await shopifyAdminApp.collection("custom_collection").where("product_id", "==", id).get();
  // Get a list
  const { data } = await shopifyAdminApp.collection("product").get();
  // Get using query params
  const collectsRes = await shopifyAdminApp
    .collection("collect")
    .where("product_id", "=", productId)
    .where("fields", "=", "id")
    .get();
  
  // POST
  // ex. productData = {title:"product1", }
  const { data } = await shopifyAdminApp.collection("product").add(productData);
  
  // PUT
  const { data } = await shopifyAdminApp.collection("product").doc(id).update(productData);
  
  // DELETE
  const { data } = await shopifyAdminApp.collection("customer").doc(id).delete();
  
  // Custom actions:
  // Generated url: https://123456789:at99999@nike/admin/api/2021-10/customers/207119551/addresses/1053317290/default.json
  cost {initializeApp, getMethodName} = require("shopabase");
  
  let shopifyAdminApp = initializeApp({
    shop: "nike",
    apiKey: "123456789",
    apiVersion: "2021-10",
    accessToken: "at99999"
  });
  
  const actual = await shopifyAdminApp
      .collection("customers/207119551/address)
      .doc(docId)
      .execAction(getMethodName().PUT, "default");
```

## [github source](https://github.com/minhloc99/shopabase)