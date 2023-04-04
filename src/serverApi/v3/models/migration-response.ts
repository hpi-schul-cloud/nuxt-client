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



/**
 * 
 * @export
 * @interface MigrationResponse
 */
export interface MigrationResponse {
    /**
     * Date from when Migration is possible
     * @type {string}
     * @memberof MigrationResponse
     */
    oauthMigrationPossible?: string;
    /**
     * Date from when Migration is mandatory
     * @type {string}
     * @memberof MigrationResponse
     */
    oauthMigrationMandatory?: string;
    /**
     * Date from when Migration is finished
     * @type {string}
     * @memberof MigrationResponse
     */
    oauthMigrationFinished?: string;
    /**
     * Date from when Migration is finally finished and cannot be restarted again
     * @type {string}
     * @memberof MigrationResponse
     */
    oauthMigrationFinalFinish?: string;
    /**
     * Enable the Migration
     * @type {boolean}
     * @memberof MigrationResponse
     */
    enableMigrationStart: boolean;
}


