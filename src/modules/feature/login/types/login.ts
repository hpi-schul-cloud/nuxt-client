export interface LoginPayload {
	username: string;
	password: string;
	redirect?: string;
	privateDevice?: boolean;
	systemId?: string;
	schoolId?: string;
	strategy?: string;
}

export interface LoginLdapPayload extends LoginPayload {
	systemId: string;
	schoolId: string;
	// system: required for validation
	system: string;
}

export interface Oauth2AuthPayload {
	systemId: string;
	migration?: string;
	redirect?: string;
	login_hint?: string;
}
export interface Oauth2System {
	_id: string;
	displayName: string;
	oauthConfig?: {
		provider?: string;
		logoutEndpoint?: string;
	};
}

export interface Oauth2CallbackPayload {
	code?: string;
	error?: string;
}

export interface LoginResponse {
	redirect: string;
	[key: string]: string; //TODO: use real options or fix it
}

export interface LogoutResponse {
	message: string;
}

export interface BusinessError {
	error: object; //TODO: use real options or fix it
	message: string;
	statusCode: number;
}
