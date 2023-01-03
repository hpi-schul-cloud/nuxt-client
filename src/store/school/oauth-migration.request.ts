import { IOauthMigrationRequest, OauthMigrationRequest } from "@store/types/schools";
export const mapOauthMigrationRequest = (request: IOauthMigrationRequest): OauthMigrationRequest => {
    const migration: OauthMigrationRequest = {
        oauthMigrationMandatory: request.mandatory,
        oauthMigrationPossible: request.available
    }

    return migration;
}
