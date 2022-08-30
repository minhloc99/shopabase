## Introduction

Shopabase is a wrapper of Shopify admin RESTapi. It is heavily inspired by **firebase/firestore** which allows the apis to be written in queries.  
Installation:

```npm install shopabase```
 or
```yarn add shopabase``` 
 

**Migrate from axios or fetch to shopabase**

```javascript
axios.post(`https://${apiKey}:${accessToken}@${shop}/admin/api/${apiVersion}/products.json`,{
	"product":{
	   "title":"product1"
	}
})


// => with shopabase syntax
shopifyAdminApp.collection("product").add({"title":"product1"});
```

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

With NodeJs

```plaintext
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { initializeApp } = require("shopabase");

let shopifyAdminApp = initializeApp({
  shop: process.env.SHOPIFY_STORE_NAME,
  apiKey: process.env.SHOPIFY_ADMIN_API_KEY,
  apiVersion: process.env.SHOPIFY_ADMIN_API_VERSION,
  accessToken: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN
});

app.use(cors({ origin: true }));

app.post("/customers/create", async (req, res, next) => {
  try {
    const { data } = await shopifyAdminApp.collection("customer").add(req.body);

    res.status(200).send(data);
  } catch (error) {
    res.status(404).send("Customer info is not valid");
  }
  return next();
});

app.get("/customers/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const { data } = await shopifyAdminApp.collection("customer").doc(id).get();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send("Item does not exist!");
  }

  return next();
});

app.put("/customers/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const { data } = await shopifyAdminApp.collection("customer").doc(id).update(req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send("Item does not exist!");
  }

  return next();
});

app.get("/customers", async (_req, res, next) => {
  const { data } = await shopifyAdminApp.collection("customer").get();

  res.status(200).send(data);
  return next();
});

app.delete("/customers/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const { data } = await shopifyAdminApp.collection("customer").doc(id).delete();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send("Item does not exist!");
  }

  return next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

Queries

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
