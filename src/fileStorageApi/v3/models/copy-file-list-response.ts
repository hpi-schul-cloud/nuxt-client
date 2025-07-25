/* tslint:disable */
/* eslint-disable */
/**
 * Schulcloud-Verbund-Software File Storage API
 * This is the API documentation for the Schulcloud-Verbund-Software File Storage API
 *
 * The version of the OpenAPI document: 3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { CopyFileResponse } from './copy-file-response';

/**
 * 
 * @export
 * @interface CopyFileListResponse
 */
export interface CopyFileListResponse {
    /**
     * The items for the current page.
     * @type {Array<CopyFileResponse>}
     * @memberof CopyFileListResponse
     */
    data: Array<CopyFileResponse>;
    /**
     * The total amount of items.
     * @type {number}
     * @memberof CopyFileListResponse
     */
    total: number;
    /**
     * The amount of items skipped from the start.
     * @type {number}
     * @memberof CopyFileListResponse
     */
    skip: number;
    /**
     * The page size of the response.
     * @type {number}
     * @memberof CopyFileListResponse
     */
    limit: number;
}


