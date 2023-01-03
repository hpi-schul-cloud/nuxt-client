import {
    IOauthMigration,
    IOauthMigrationRequest,
    OauthMigrationRequest,
    OauthMigrationResponse
} from "@store/types/schools";
import { mapOauthMigrationResponse } from "@store/school/oauth-migration.response";
import { mapOauthMigrationRequest } from "@store/school/oauth-migration.request";

export function useOAuthMigration(response: OauthMigrationResponse, request: IOauthMigrationRequest){

    const getMappedOAuthMigration =  (): IOauthMigration  => {
       return mapOauthMigrationResponse(response);
    }

    const mapOAuthMigration = (): OauthMigrationRequest => {
        return mapOauthMigrationRequest(request)
    }

    return { getMappedOAuthMigration, mapOAuthMigration };
}
