import { IOauthMigration, OauthMigrationResponse } from "@store/types/schools";
export const mapOauthMigrationResponse = (response: OauthMigrationResponse): IOauthMigration => {
    const migration: IOauthMigration = {
        mandatory: response.oauthMigrationMandatory,
        available: response.oauthMigrationPossible,
        enabled: response.enableMigrationStart
    }

    return migration;
}
