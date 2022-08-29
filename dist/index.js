"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = exports.getMethodName = void 0;
var axios_1 = require("axios");
function getMethodName() {
    return {
        GET: "get",
        POST: "post",
        PUT: "put",
        DELETE: "delete"
    };
}
exports.getMethodName = getMethodName;
function executeAxiosMethod(method, url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = method;
                    switch (_a) {
                        case getMethodName().POST: return [3 /*break*/, 1];
                        case getMethodName().PUT: return [3 /*break*/, 6];
                        case getMethodName().GET: return [3 /*break*/, 11];
                        case getMethodName().DELETE: return [3 /*break*/, 13];
                    }
                    return [3 /*break*/, 15];
                case 1:
                    if (!data) return [3 /*break*/, 3];
                    return [4 /*yield*/, axios_1.default.post(url, data)];
                case 2:
                    _b = _d.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, axios_1.default.post(url)];
                case 4:
                    _b = _d.sent();
                    _d.label = 5;
                case 5: return [2 /*return*/, _b];
                case 6:
                    if (!data) return [3 /*break*/, 8];
                    return [4 /*yield*/, axios_1.default.put(url, data)];
                case 7:
                    _c = _d.sent();
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, axios_1.default.put(url)];
                case 9:
                    _c = _d.sent();
                    _d.label = 10;
                case 10: return [2 /*return*/, _c];
                case 11: return [4 /*yield*/, axios_1.default.get(url)];
                case 12: return [2 /*return*/, _d.sent()];
                case 13: return [4 /*yield*/, axios_1.default.delete(url)];
                case 14: return [2 /*return*/, _d.sent()];
                case 15: return [2 /*return*/];
            }
        });
    });
}
function clone(obj) {
    return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
String.prototype.pluralize = function (isCancelled, revert) {
    if (isCancelled)
        return this;
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
    var irregular = {
        'move': 'moves',
        'foot': 'feet',
        'goose': 'geese',
        'sex': 'sexes',
        'child': 'children',
        'man': 'men',
        'tooth': 'teeth',
        'person': 'people'
    };
    var uncountable = [
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
    for (var word in irregular) {
        if (revert) {
            var pattern = new RegExp(irregular[word] + '$', 'i');
            var replace = word;
        }
        else {
            var pattern = new RegExp(word + '$', 'i');
            var replace = irregular[word];
        }
        if (pattern.test(this))
            return this.replace(pattern, replace);
    }
    if (revert)
        var array = singular;
    else
        var array = plural;
    // check for matches using regular expressions
    for (var reg in array) {
        var pattern = new RegExp(reg, 'i');
        if (pattern.test(this))
            return this.replace(pattern, array[reg]);
    }
    return this;
};
var ShopifyAdminApp = /** @class */ (function () {
    function ShopifyAdminApp(shop, apiKey, apiVersion, accessToken) {
        this.appContext = this;
        this.shop = "";
        this.apiKey = "";
        this.apiVersion = "";
        this.accessToken = "";
        this.baseUrl = "";
        this.query = "";
        this.collectionName = "";
        this.collectionPath = "";
        this.isPlural = false;
        this.docUrl = "";
        this.shop = shop;
        this.apiKey = apiKey;
        this.apiVersion = apiVersion;
        this.accessToken = accessToken;
        this.baseUrl = "https://".concat(this.apiKey, ":").concat(this.accessToken, "@").concat(this.shop, "/admin/api/").concat(this.apiVersion);
    }
    ShopifyAdminApp.prototype.getQuery = function (query) {
        return query ? "?".concat(query) : "";
    };
    /**
     *
     * @param {*} collectionPath a path to a collection
     * @param {*} isPlural Whether a collectionName is plural, skipping pluralizing if true
     * @returns
     */
    ShopifyAdminApp.prototype.collection = function (collectionPath, isPlural) {
        if (isPlural === void 0) { isPlural = false; }
        if (!collectionPath)
            throw new Error("collectionPath is not valid or missing");
        return Object.assign(clone(this), {
            isPlural: isPlural,
            collectionPath: collectionPath,
            collectionName: collectionPath.indexOf("/") !== -1 ? collectionPath.slice().split("/").pop() : collectionPath,
        });
    };
    ;
    ShopifyAdminApp.prototype.doc = function (docId) {
        var docUrl = "".concat(this.baseUrl, "/").concat(this.collectionPath.pluralize(this.isPlural, false), "/").concat(docId, ".json");
        return Object.assign(clone(this), {
            docId: docId,
            docUrl: docUrl
        });
    };
    ;
    ShopifyAdminApp.prototype.where = function (key, operator, value) {
        if (!this.collectionName)
            throw new Error("CollectionName is not valid");
        if (!key || !operator || !value)
            throw new Error("Query is not valid. key, operator and value are required");
        var query = this.query ? "".concat(this.query, "&").concat(key, "=").concat(value) : "".concat(key, "=").concat(value);
        return Object.assign(clone(this), { query: query });
    };
    ;
    ShopifyAdminApp.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.collectionName)
                            throw new Error("CollectionName is not valid or missing");
                        if (!this.docUrl) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(this.docUrl)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        query = this.getQuery(this.query);
                        url = "".concat(this.baseUrl, "/").concat(this.collectionPath.pluralize(this.isPlural, false), ".json");
                        return [4 /*yield*/, axios_1.default.get("".concat(url).concat(query))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    ShopifyAdminApp.prototype.add = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!data)
                            throw new Error("data is not valid");
                        if (!this.collectionName)
                            throw new Error("CollectionName is not valid or missing");
                        url = "".concat(this.baseUrl, "/").concat(this.collectionPath.pluralize(this.isPlural, false), ".json");
                        return [4 /*yield*/, axios_1.default.post(url, (_a = {}, _a[this.collectionName] = data, _a))];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ;
    ShopifyAdminApp.prototype.update = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!data)
                            throw new Error("data is not valid");
                        if (!this.docUrl)
                            throw new Error("docUrl is missing");
                        return [4 /*yield*/, axios_1.default.put(this.docUrl, (_a = {}, _a[this.collectionName] = data, _a))];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ;
    ShopifyAdminApp.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.docUrl)
                            throw new Error("docUrl is missing");
                        query = this.getQuery(this.query);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.docUrl).concat(query))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    /**
     * Execute custom action
     * @param {*} name Name of the action, ex. search, batch...
     * @param {*} methodName GET, POST, PUT, DELETE
     */
    ShopifyAdminApp.prototype.execAction = function (methodName, actionName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!methodName)
                            throw new Error("methodName is not valid");
                        if (!actionName)
                            throw new Error("actionName is not valid");
                        query = this.getQuery(this.query);
                        if (!(!this.collectionName && !this.docUrl)) return [3 /*break*/, 2];
                        return [4 /*yield*/, executeAxiosMethod(methodName, "".concat(this.baseUrl, "/").concat(actionName, ".json").concat(query), data)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!this.docUrl) return [3 /*break*/, 4];
                        return [4 /*yield*/, executeAxiosMethod(methodName, this.docUrl.replace(".json", "/".concat(actionName, ".json").concat(query)), data)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [4 /*yield*/, executeAxiosMethod(methodName, "".concat(this.baseUrl, "/").concat(this.collectionPath, "s/").concat(actionName, ".json").concat(query), data)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    /**
     * Count items of a collection
     */
    ShopifyAdminApp.prototype.count = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execAction(getMethodName().GET, "count", null)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    return ShopifyAdminApp;
}());
function initializeApp(_a) {
    var shop = _a.shop, apiKey = _a.apiKey, apiVersion = _a.apiVersion, accessToken = _a.accessToken;
    return new ShopifyAdminApp(shop, apiKey, apiVersion, accessToken);
}
exports.initializeApp = initializeApp;
