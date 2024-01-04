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


import { FileRecordParentType } from './file-record-parent-type';
import { FileRecordScanStatus } from './file-record-scan-status';
import { PreviewStatus } from './preview-status';

/**
 * 
 * @export
 * @interface FileRecordResponse
 */
export interface FileRecordResponse {
    /**
     * 
     * @type {string}
     * @memberof FileRecordResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof FileRecordResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof FileRecordResponse
     */
    parentId: string;
    /**
     * 
     * @type {string}
     * @memberof FileRecordResponse
     */
    url: string;
    /**
     * 
     * @type {FileRecordScanStatus}
     * @memberof FileRecordResponse
     */
    securityCheckStatus: FileRecordScanStatus;
    /**
     * 
     * @type {number}
     * @memberof FileRecordResponse
     */
    size: number;
    /**
     * 
     * @type {string}
     * @memberof FileRecordResponse
     */
    creatorId: string;
    /**
     * 
     * @type {string}
     * @memberof FileRecordResponse
     */
    mimeType: string;
    /**
     * 
     * @type {FileRecordParentType}
     * @memberof FileRecordResponse
     */
    parentType: FileRecordParentType;
    /**
     * 
     * @type {boolean}
     * @memberof FileRecordResponse
     */
    isUploading: boolean;
    /**
     * 
     * @type {PreviewStatus}
     * @memberof FileRecordResponse
     */
    previewStatus: PreviewStatus;
    /**
     * 
     * @type {string}
     * @memberof FileRecordResponse
     */
    deletedSince?: string;
}


