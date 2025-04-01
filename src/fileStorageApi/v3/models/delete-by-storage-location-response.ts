/* tslint:disable */
/* eslint-disable */
/**
 * Schulcloud-Verbund-Software Server API
 * This is v3 of Schulcloud-Verbund-Software Server. Checkout /docs for v1.
 *
 * The version of the OpenAPI document: 3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { StorageLocation } from './storage-location';

/**
 * 
 * @export
 * @interface DeleteByStorageLocationResponse
 */
export interface DeleteByStorageLocationResponse {
    /**
     * 
     * @type {string}
     * @memberof DeleteByStorageLocationResponse
     */
    storageLocationId: string;
    /**
     * 
     * @type {StorageLocation}
     * @memberof DeleteByStorageLocationResponse
     */
    storageLocation: StorageLocation;
    /**
     * 
     * @type {number}
     * @memberof DeleteByStorageLocationResponse
     */
    deletedFiles: number;
}


