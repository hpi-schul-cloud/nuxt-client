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


import { CardElementParams } from './card-element-params';

/**
 * 
 * @export
 * @interface TaskCardParams
 */
export interface TaskCardParams {
    /**
     * The id of an course object.
     * @type {string}
     * @memberof TaskCardParams
     */
    courseId?: string;
    /**
     * The title of the card
     * @type {string}
     * @memberof TaskCardParams
     */
    title: string;
    /**
     * Visible at date of the card
     * @type {string}
     * @memberof TaskCardParams
     */
    visibleAtDate?: string;
    /**
     * Due date of the card
     * @type {string}
     * @memberof TaskCardParams
     */
    dueDate?: string;
    /**
     * Card elements array
     * @type {Array<CardElementParams>}
     * @memberof TaskCardParams
     */
    cardElements?: Array<CardElementParams>;
}


