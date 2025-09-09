import {
	AuthenticationApiFactory,
	ConsentResponse,
	LoginResponse,
	Oauth2ApiFactory,
	Oauth2AuthorizationBodyParams,
	PublicSystemListResponse,
	SchoolApiFactory,
	SchoolForLdapLoginResponse,
	SystemsApiFactory,
	SystemType,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";
import { E } from "vitest/dist/chunks/environment.d.cL3nLXbE.js";

/**
 * API abstraction for the login composable.
 */
export const useLoginApi = () => {
	const authApi = AuthenticationApiFactory(undefined, "/v3", $axios);
	const systemsApi = SystemsApiFactory(undefined, "/v3", $axios);
	const oAuth2Api = Oauth2ApiFactory(undefined, "/v3", $axios);
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);

	/**
	 * Standard/local login (possibly with a system/strategy).
	 */
	//const apiLogin = async (
	//	payload: LoginPayload,
	//	options: LoginOptions = {}
	//): Promise<LoginResult> => {
	//	// Assumes backend POST /login/
	//	const response = await $axios.post("/login/", {
	//		...payload,
	//		...options,
	//	});
	//	return response.data;
	//};

	/**
	 * Email strategy login.
	 */
	const apiLoginEmail = async (
		username: string,
		password: string
	): Promise<LoginResponse> => {
		const response = await authApi.loginControllerLoginLocal({
			username,
			password,
		});
		return response.data;
	};

	/**
	 * LDAP strategy login.
	 */
	const apiLoginLdap = async (
		username: string,
		password: string,
		schoolId: string,
		systemId: string
	): Promise<LoginResponse> => {
		const response = await authApi.loginControllerLoginLdap({
			username,
			password,
			schoolId,
			systemId,
		});
		return response.data;
	};

	/**
	 * OAuth2 initiate login (redirect).
	 */
	const apiLoginOAuth2 = async (
		payload: Oauth2AuthorizationBodyParams
	): Promise<LoginResponse> => {
		// POST to /login/oauth2 or GET /login/oauth2/:systemId if needed
		const response = await authApi.loginControllerLoginOauth2(payload);
		return response.data;
	};

	/**
	 * Fetch the available OAuth2 systems.
	 */
	const apiGetOauthSystems = async (): Promise<PublicSystemListResponse> => {
		const response = await systemsApi.systemControllerFind(SystemType.Oauth);
		return response.data;
	};

	const apiGetLdapSchools = async (): Promise<SchoolForLdapLoginResponse[]> => {
		const response =
			await schoolApi.schoolControllerGetSchoolListForLadpLogin();
		return response.data;
	};

	/**
	 * Check user's consent status on login success.
	 */
	const apiCheckConsent = async (
		//userId: string
		challenge: string
	): Promise<ConsentResponse> => {
		// Example: GET `/consents/${userId}/check/`
		const response =
			await oAuth2Api.oauthProviderControllerGetConsentRequest(challenge);
		return response.data;
	};

    const apiPasswordRecovery = async (username: string): Promise<AxiosResponse> => {
        const response = await $axios.post("/v1/passwordRecovery", { username });
        return response.data;
    };

	return {
		//apiLogin,
		apiLoginEmail,
		apiLoginLdap,
		apiLoginOAuth2,
		apiGetOauthSystems,
		apiGetLdapSchools,
		apiCheckConsent,
		apiPasswordRecovery,
	};
};
