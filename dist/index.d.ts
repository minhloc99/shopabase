declare global {
    interface String {
        pluralize(isCancelled: boolean, revert: boolean): string;
    }
}
export declare function getMethodName(): {
    GET: string;
    POST: string;
    PUT: string;
    DELETE: string;
};
declare class ShopifyAdminApp {
    appContext: this;
    shop: string;
    apiKey: string;
    apiVersion: string;
    accessToken: string;
    baseUrl: string;
    query: string;
    collectionName: string;
    collectionPath: string;
    isPlural: boolean;
    docUrl: string;
    constructor(shop: string, apiKey: string, apiVersion: string, accessToken: string);
    getQuery(query: string): string;
    /**
     *
     * @param {*} collectionPath a path to a collection
     * @param {*} isPlural Whether a collectionName is plural, skipping pluralizing if true
     * @returns
     */
    collection(collectionPath: string, isPlural?: boolean): ShopifyAdminApp;
    doc(docId: any): ShopifyAdminApp;
    where(key: string, operator: string, value: any): ShopifyAdminApp;
    get(): Promise<import("axios").AxiosResponse<any, any>>;
    add(data: object): Promise<import("axios").AxiosResponse<any, any>>;
    update(data: any): Promise<import("axios").AxiosResponse<any, any>>;
    delete(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Execute custom action
     * @param {*} name Name of the action, ex. search, batch...
     * @param {*} methodName GET, POST, PUT, DELETE
     */
    execAction(methodName: string, actionName: string, data: any): Promise<import("axios").AxiosResponse<any, any> | undefined>;
    /**
     * Count items of a collection
     */
    count(): Promise<import("axios").AxiosResponse<any, any> | undefined>;
}
export declare function initializeApp({ shop, apiKey, apiVersion, accessToken }: any): ShopifyAdminApp;
export {};
