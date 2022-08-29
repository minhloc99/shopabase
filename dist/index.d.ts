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
export declare function ShopifyAdminApp(this: any, { shop, apiKey, apiVersion, accessToken }: any): any;
