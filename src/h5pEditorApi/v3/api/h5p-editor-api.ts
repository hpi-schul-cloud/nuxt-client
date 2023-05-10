/* tslint:disable */
/* eslint-disable */
/**
 * HPI Schul-Cloud Server API
 * This is v3 of HPI Schul-Cloud Server. Checkout /docs for v1.
 *
 * The version of the OpenAPI document: 3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
/**
 * H5pEditorApi - axios parameter creator
 * @export
 */
export const H5pEditorApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get embeddable HTML for the editor
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        h5PEditorControllerGetEditor: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/h5p-editor/{contentId}/edit`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get embeddable HTML for the player
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        h5PEditorControllerGetPlayer: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/h5p-editor/{contentId}/play`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * H5pEditorApi - functional programming interface
 * @export
 */
export const H5pEditorApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = H5pEditorApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Get embeddable HTML for the editor
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async h5PEditorControllerGetEditor(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.h5PEditorControllerGetEditor(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get embeddable HTML for the player
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async h5PEditorControllerGetPlayer(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.h5PEditorControllerGetPlayer(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * H5pEditorApi - factory interface
 * @export
 */
export const H5pEditorApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = H5pEditorApiFp(configuration)
    return {
        /**
         * 
         * @summary Get embeddable HTML for the editor
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        h5PEditorControllerGetEditor(options?: any): AxiosPromise<string> {
            return localVarFp.h5PEditorControllerGetEditor(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get embeddable HTML for the player
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        h5PEditorControllerGetPlayer(options?: any): AxiosPromise<string> {
            return localVarFp.h5PEditorControllerGetPlayer(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * H5pEditorApi - interface
 * @export
 * @interface H5pEditorApi
 */
export interface H5pEditorApiInterface {
    /**
     * 
     * @summary Get embeddable HTML for the editor
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof H5pEditorApiInterface
     */
    h5PEditorControllerGetEditor(options?: any): AxiosPromise<string>;

    /**
     * 
     * @summary Get embeddable HTML for the player
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof H5pEditorApiInterface
     */
    h5PEditorControllerGetPlayer(options?: any): AxiosPromise<string>;

}

/**
 * H5pEditorApi - object-oriented interface
 * @export
 * @class H5pEditorApi
 * @extends {BaseAPI}
 */
export class H5pEditorApi extends BaseAPI implements H5pEditorApiInterface {
    /**
     * 
     * @summary Get embeddable HTML for the editor
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof H5pEditorApi
     */
    public h5PEditorControllerGetEditor(options?: any) {
        return H5pEditorApiFp(this.configuration).h5PEditorControllerGetEditor(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get embeddable HTML for the player
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof H5pEditorApi
     */
    public h5PEditorControllerGetPlayer(options?: any) {
        return H5pEditorApiFp(this.configuration).h5PEditorControllerGetPlayer(options).then((request) => request(this.axios, this.basePath));
    }
}
