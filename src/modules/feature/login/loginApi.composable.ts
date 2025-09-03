import { $axios } from "@/utils/api";
import type {
	ConsentCheckResult,
	LoginOptions,
	LoginPayload,
	LoginResult,
	LogoutOptions,
	Oauth2RedirectPayload,
	Oauth2System,
} from "./types/login.types";

/**
 * API abstraction for the login composable.
 */
export const useLoginApi = () => {
	/**
	 * Standard/local login (possibly with a system/strategy).
	 */
	const apiLogin = async (
		payload: LoginPayload,
		options: LoginOptions = {}
	): Promise<LoginResult> => {
		// Assumes backend POST /login/
		const response = await $axios.post("/login/", {
			...payload,
			...options,
		});
		return response.data;
	};

	/**
	 * Email strategy login.
	 */
	const apiLoginEmail = async (
		username: string,
		password: string,
		redirect?: string
	): Promise<LoginResult> => {
		const response = await $axios.post("/login/email", {
			username,
			password,
			redirect,
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
		system: string,
		redirect?: string
	): Promise<LoginResult> => {
		const response = await $axios.post("/login/ldap", {
			username,
			password,
			schoolId,
			system,
			redirect,
		});
		return response.data;
	};

	/**
	 * OAuth2 initiate login (redirect).
	 */
	const apiLoginOAuth2 = async (
		payload: Oauth2RedirectPayload
	): Promise<LoginResult> => {
		// POST to /login/oauth2 or GET /login/oauth2/:systemId if needed
		const response = await $axios.post("/login/oauth2", payload);
		return response.data;
	};

	/**
	 * Fetch the available OAuth2 systems.
	 */
	const apiGetOauthSystems = async (): Promise<Oauth2System[]> => {
		const response = await $axios.get("/systems/public", {
			params: { types: "oauth" },
		});
		return response.data?.data || [];
	};

	/**
	 * Check user's consent status on login success.
	 */
	const apiCheckConsent = async (
		userId: string
	): Promise<ConsentCheckResult> => {
		// Example: GET `/consents/${userId}/check/`
		const response = await $axios.get(`/consents/${userId}/check/`, {
			params: { simple: true },
		});
		return response.data;
	};

	/**
	 * Logout current user (local session end).
	 */
	const apiLogout = async (options?: LogoutOptions): Promise<void> => {
		await $axios.post("/logout", options);
		// may also: await axios.delete('/collaborative-text-editor/delete-sessions');
	};

	/**
	 * External logout (OAuth2, ...) if needed.
	 */
	const apiLogoutExternal = async (): Promise<void> => {
		await $axios.post("/logout/external");
	};

	return {
		apiLogin,
		apiLoginEmail,
		apiLoginLdap,
		apiLoginOAuth2,
		apiGetOauthSystems,
		apiCheckConsent,
		apiLogout,
		apiLogoutExternal,
	};
};
