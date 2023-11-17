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


import { H5PContentParentType } from './h5-pcontent-parent-type';

/**
 * 
 * @export
 * @interface PostH5PContentCreateParams
 */
export interface PostH5PContentCreateParams {
    /**
     * 
     * @type {H5PContentParentType}
     * @memberof PostH5PContentCreateParams
     */
    parentType: H5PContentParentType;
    /**
     * 
     * @type {string}
     * @memberof PostH5PContentCreateParams
     */
    parentId: string;
    /**
     * 
     * @type {object}
     * @memberof PostH5PContentCreateParams
     */
    params: object;
    /**
     * 
     * @type {string}
     * @memberof PostH5PContentCreateParams
     */
    library: string;
}

