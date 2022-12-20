import { IOauthMigration, OauthMigrationResponse } from "@store/types/schools";
import { mapOauthMigrationResponse } from "@store/school/oauth-migration.response";

export function useOAuthMigration(response: OauthMigrationResponse){

    const getMappedOAuthMigration =  (): IOauthMigration  => {
       return mapOauthMigrationResponse(response);
    }

    return { getMappedOAuthMigration };
}
