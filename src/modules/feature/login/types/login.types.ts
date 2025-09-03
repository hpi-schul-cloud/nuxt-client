import { OauthConfigResponse } from "@/serverApi/v3";

export type AuthStrategy = "local" | "ldap" | "oauth2" | "email";

export interface LoginPayload {
	username: string;
	password: string;
	schoolId?: string;
	system?: string;
	systemId?: string;
	strategy?: AuthStrategy;
	redirect?: string;
	privateDevice?: boolean;
}

export interface LoginOptions {
	[key: string]: string; //TODO: use real options or fix it
}

export interface LoginResult {
	redirect?: string;
	login?: unknown;
	//[key: string]: any; //TODO: use real obeject or implement it
}

export interface Oauth2RedirectPayload {
	systemId: string;
	migration?: string;
	redirect?: string;
	login_hint?: string;
}

export interface Oauth2System {
	_id: string;
	displayName: string;
	oauthConfig: OauthConfigResponse;
	//[key: string]: any; //TODO: use real obeject or implement it
}

export interface ConsentCheckResult {
	haveBeenUpdated: boolean;
	consentStatus: "ok" | string;
}

export interface LogoutOptions {
	[key: string]: string; //TODO: use real options or fix it
}

export interface BusinessError {
	message: string;
	error: unknown;
	statusCode?: number;
}
