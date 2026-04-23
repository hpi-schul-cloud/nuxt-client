import { OauthConfigResponse } from "@api-server";
import { Factory } from "fishery";

export const oauthConfigResponseFactory = Factory.define<OauthConfigResponse>(({ sequence }) => ({
	clientId: `clientId-${sequence}`,
	redirectUri: `redirectUri-${sequence}`,
	grantType: `grantType-${sequence}`,
	tokenEndpoint: `tokenEndpoint-${sequence}`,
	authEndpoint: `authEndpoint-${sequence}`,
	responseType: `responseType-${sequence}`,
	scope: `scope-${sequence}`,
	provider: `provider-${sequence}`,
	issuer: `issuer-${sequence}`,
	jwksEndpoint: `jwksEndpoint-${sequence}`,
}));
