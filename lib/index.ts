import axios from "axios";

declare global {
  interface String {
    pluralize(isCancelled: boolean, revert: boolean): string;
  }
}

export function getMethodName() {
  return {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
  }
}

async function executeAxiosMethod(method: string, url: string, data: any) {
  switch (method) {
    case getMethodName().POST:
      return data ? await axios.post(url, data) : await axios.post(url);
    case getMethodName().PUT:
      return data ? await axios.put(url, data) : await axios.put(url);
    case getMethodName().GET:
      return await axios.get(url);
    case getMethodName().DELETE:
      return await axios.delete(url);
  }
}

function clone(obj: object) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))
}

String.prototype.pluralize = function (this: any, isCancelled: boolean, revert: boolean): string {
  if (isCancelled) return this;

  var plural = {
    '(quiz)$': "$1zes",
    '^(ox)$': "$1en",
    '([m|l])ouse$': "$1ice",
    '(matr|vert|ind)ix|ex$': "$1ices",
    '(x|ch|ss|sh)$': "$1es",
    '([^aeiouy]|qu)y$': "$1ies",
    '(hive)$': "$1s",
    '(?:([^f])fe|([lr])f)$': "$1$2ves",
    '(shea|lea|loa|thie)f$': "$1ves",
    'sis$': "ses",
    '([ti])um$': "$1a",
    '(tomat|potat|ech|her|vet)o$': "$1oes",
    '(bu)s$': "$1ses",
    '(alias)$': "$1es",
    '(octop)us$': "$1i",
    '(ax|test)is$': "$1es",
    '(us)$': "$1es",
    '([^s]+)$': "$1s"
  };

  var singular = {
    '(quiz)zes$': "$1",
    '(matr)ices$': "$1ix",
    '(vert|ind)ices$': "$1ex",
    '^(ox)en$': "$1",
    '(alias)es$': "$1",
    '(octop|vir)i$': "$1us",
    '(cris|ax|test)es$': "$1is",
    '(shoe)s$': "$1",
    '(o)es$': "$1",
    '(bus)es$': "$1",
    '([m|l])ice$': "$1ouse",
    '(x|ch|ss|sh)es$': "$1",
    '(m)ovies$': "$1ovie",
    '(s)eries$': "$1eries",
    '([^aeiouy]|qu)ies$': "$1y",
    '([lr])ves$': "$1f",
    '(tive)s$': "$1",
    '(hive)s$': "$1",
    '(li|wi|kni)ves$': "$1fe",
    '(shea|loa|lea|thie)ves$': "$1f",
    '(^analy)ses$': "$1sis",
    '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': "$1$2sis",
    '([ti])a$': "$1um",
    '(n)ews$': "$1ews",
    '(h|bl)ouses$': "$1ouse",
    '(corpse)s$': "$1",
    '(us)es$': "$1",
    's$': ""
  };

  var irregular: any = {
    'move': 'moves',
    'foot': 'feet',
    'goose': 'geese',
    'sex': 'sexes',
    'child': 'children',
    'man': 'men',
    'tooth': 'teeth',
    'person': 'people'
  };

  var uncountable: String[] = [
    'sheep',
    'fish',
    'deer',
    'series',
    'species',
    'money',
    'rice',
    'information',
    'equipment'
  ];

  // save some time in the case that singular and plural are the same
  if (uncountable.indexOf(this.toLowerCase()) >= 0)
    return this;

  // check for irregular forms
  for (const word in irregular) {

    if (revert) {
      var pattern = new RegExp(irregular[word] + '$', 'i');
      var replace = word;
    } else {
      var pattern = new RegExp(word + '$', 'i');
      var replace: string = irregular[word];
    }
    if (pattern.test(this))
      return this.replace(pattern, replace);
  }

  if (revert) var array: any = singular;
  else var array: any = plural;

  // check for matches using regular expressions
  for (const reg in array) {

    var pattern = new RegExp(reg, 'i');

    if (pattern.test(this))
      return this.replace(pattern, array[reg]);
  }

  return this;
};

class ShopifyAdminApp {
  appContext = this;
  shop: string = "";
  apiKey: string = "";
  apiVersion: string = "";
  accessToken: string = "";
  baseUrl: string = "";
  query: string = "";

  collectionName: string = "";
  collectionPath: string = "";
  isPlural: boolean = false;
  docUrl: string = "";

  constructor(shop: string, apiKey: string, apiVersion: string, accessToken: string) {
    this.shop = shop;
    this.apiKey = apiKey;
    this.apiVersion = apiVersion;
    this.accessToken = accessToken;
    this.baseUrl = `https://${this.apiKey}:${this.accessToken}@${this.shop}/admin/api/${this.apiVersion}`;
  }

  getQuery(query: string): string {
    return query ? `?${query}` : "";
  }

  /**
   *
   * @param {*} collectionPath a path to a collection
   * @param {*} isPlural Whether a collectionName is plural, skipping pluralizing if true
   * @returns
   */
  collection(collectionPath: string, isPlural = false): ShopifyAdminApp {
    if (!collectionPath) throw new Error("collectionPath is not valid or missing");

    return Object.assign(clone(this), {
      isPlural,
      collectionPath,
      collectionName: collectionPath.indexOf("/") !== -1 ? collectionPath.slice().split("/").pop() : collectionPath,
    });
  };

  doc(docId: any): ShopifyAdminApp {
    const docUrl = `${this.baseUrl}/${this.collectionPath.pluralize(this.isPlural, false)}/${docId}.json`;

    return Object.assign(clone(this), {
      docId,
      docUrl
    });
  };

  where(key: string, operator: string, value: any): ShopifyAdminApp {
    if (!this.collectionName) throw new Error("CollectionName is not valid");
    if (!key || !operator || !value) throw new Error("Query is not valid. key, operator and value are required");

    let query = this.query ? `${this.query}&${key}=${value}` : `${key}=${value}`;

    return Object.assign(clone(this), { query });
  };

  async get() {
    if (!this.collectionName) throw new Error("CollectionName is not valid or missing");
    if (this.docUrl) return await axios.get(this.docUrl);

    const query = this.getQuery(this.query);
    const url = `${this.baseUrl}/${this.collectionPath.pluralize(this.isPlural, false)}.json`;

    return await axios.get(`${url}${query}`);
  };

  async add(data: object) {
    if (!data) throw new Error("data is not valid");
    if (!this.collectionName) throw new Error("CollectionName is not valid or missing");

    const url = `${this.baseUrl}/${this.collectionPath.pluralize(this.isPlural, false)}.json`;

    return await axios.post(url, { [this.collectionName]: data });
  };

  async update(data: any) {
    if (!data) throw new Error("data is not valid");
    if (!this.docUrl) throw new Error("docUrl is missing");

    return await axios.put(this.docUrl, { [this.collectionName]: data });
  };

  async delete() {
    if (!this.docUrl) throw new Error("docUrl is missing");

    const query = this.getQuery(this.query);

    return await axios.delete(`${this.docUrl}${query}`);
  };

  /**
   * Execute custom action
   * @param {*} name Name of the action, ex. search, batch...
   * @param {*} methodName GET, POST, PUT, DELETE
   */
  async execAction(methodName: string, actionName: string, data: any) {
    if (!methodName) throw new Error("methodName is not valid");
    if (!actionName) throw new Error("actionName is not valid");

    const query = this.getQuery(this.query);

    if (!this.collectionName && !this.docUrl) {
      return await executeAxiosMethod(methodName, `${this.baseUrl}/${actionName}.json${query}`, data);
    }

    if (this.docUrl) {
      return await executeAxiosMethod(methodName, this.docUrl.replace(".json", `/${actionName}.json${query}`), data);
    }

    return await executeAxiosMethod(methodName, `${this.baseUrl}/${this.collectionPath}s/${actionName}.json${query}`, data);
  };

  /**
   * Count items of a collection
   */
  async count() {
    return await this.execAction(getMethodName().GET, "count", null);
  };
}

export function initializeApp({ shop, apiKey, apiVersion, accessToken }: any): ShopifyAdminApp {
  return new ShopifyAdminApp(shop, apiKey, apiVersion, accessToken);
}