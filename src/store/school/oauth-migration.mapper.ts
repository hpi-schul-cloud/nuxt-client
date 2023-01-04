import {
    OauthMigrationApiRequest,
    OauthMigrationApiResponse,
    OauthMigrationRequest,
    OauthMigrationResponse
} from "@store/types/schools";

export const mapOauthMigrationRequestToApi = (request: OauthMigrationRequest): OauthMigrationApiRequest => {
    const migration: OauthMigrationApiRequest = {
        oauthMigrationPossible: request.available,
        oauthMigrationMandatory: request.mandatory,
        oauthMigrationFinished: false,
    }

    return migration;
};

export const mapApiToOauthMigrationResponse = (response: OauthMigrationApiResponse): OauthMigrationResponse => {
    const migration: OauthMigrationResponse = {
        mandatory: !!response.oauthMigrationMandatory,
        available: !!response.oauthMigrationPossible,
        enabled: response.enableMigrationStart,
        migrationCompletionDate: response.oauthMigrationFinished
    }

    return migration;
}
