import {
	BusinessError,
	LoginResponse,
	MeResponse,
	Oauth2AuthorizationBodyParams,
	PublicSystemListResponse,
	RoleName,
	SchoolForLdapLoginResponse,
} from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { ApiResponseError } from "@/store/types/commons";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { ref, Ref } from "vue";
import { useLoginApi } from "./loginApi.composable";

/**
 * Collapse leading slashes to one slash to avoid redirects to other websites
 */
const collapseLeadingSlashes = (redirectUrl: string): string =>
	redirectUrl.replace(/^\/+/, "/");

/**
 * Sanitize HTML from a string - in browser, a simple implementation
 * In Node.js, 'sanitize-html' is used; in browser, use DOMPurify or fall back.
 * For now, replace potentially dangerous chars for basic sanitization.
 */
const sanitizeHtml = (input: string): string => {
	if (!input) return "";
	// Basic pass: escape < and >
	return input.replace(/[<>]/g, "");
};

/**
 * Transform given URL to valid (sanitized and relative) redirect URL.
 */
const getValidRedirect = (redirectUrl?: string): string => {
	if (!redirectUrl) return "/";
	const sanitizedUrl = sanitizeHtml(redirectUrl);
	// Collapse leading slashes
	const cleanedUrl = collapseLeadingSlashes(sanitizedUrl); // initially let

	try {
		// Use browser-native URL constructor (base with window.location.origin)
		const parsedUrl = new URL(cleanedUrl, window.location.origin);
		let relativeUrl = "/";
		if (parsedUrl) {
			const path = parsedUrl.pathname || ""; //initially let
			const search = parsedUrl.search || ""; //initially let
			const hash = parsedUrl.hash || ""; //initially let
			relativeUrl = path + search + hash;
		}
		return relativeUrl;
	} catch {
		return "/";
	}
};

export const useLogin = () => {
	const {
		apiLoginEmail,
		apiLoginLdap,
		apiLoginOAuth2,
		apiGetOauthSystems,
		apiGetLdapSchools,
		apiCheckConsent,
		apiPasswordRecovery,
	} = useLoginApi();

	const schools: Ref<SchoolForLdapLoginResponse[]> = ref([]);
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref(undefined);
	const oauthSystems: Ref<PublicSystemListResponse | undefined> = ref(undefined);
	const loginResult: Ref<LoginResponse | undefined> = ref(undefined);
	const passwordRecoveryError = ref<string | null>(null);
	const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

	const loginEmail = async (
		username: string,
		password: string,
		createLoginCookies?: boolean
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			const result: LoginResponse = await apiLoginEmail(
				username,
				password,
				createLoginCookies
			);
			loginResult.value = result;
			await authModule.login();
		} catch (err: unknown) {
			error.value = {
				message: err instanceof Error ? err.message : "Email login failed",
				code: (err as ApiResponseError)?.code ?? 400,
				type: (err as ApiResponseError)?.type,
				title: (err as ApiResponseError)?.title,
			};
			console.error("Login error:", err);
		} finally {
			isLoading.value = false;
		}
	};

	const loginLdap = async (
		username: string,
		password: string,
		schoolId: string,
		system: string,
		createLoginCookies?: boolean
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			const result: LoginResponse = await apiLoginLdap(
				username,
				password,
				schoolId,
				system,
				createLoginCookies
			);
			loginResult.value = result;
			await authModule.login();
		} catch (err: unknown) {
			error.value = {
				message: err instanceof Error ? err.message : "LDAP login failed",
				code: (err as ApiResponseError)?.code ?? 400,
				type: (err as ApiResponseError)?.type,
				title: (err as ApiResponseError)?.title,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const loginOAuth2 = async (
		payload: Oauth2AuthorizationBodyParams
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			const result: LoginResponse = await apiLoginOAuth2(payload);
			loginResult.value = result;
			await authModule.login();
		} catch (err: unknown) {
			error.value = {
				message: err instanceof Error ? err.message : "OAuth2 login failed",
				code: (err as ApiResponseError)?.code ?? 400,
				type: (err as ApiResponseError)?.type,
				title: (err as ApiResponseError)?.title,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const fetchOauthSystems = async (): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			const response: PublicSystemListResponse = await apiGetOauthSystems();
			oauthSystems.value = response;
		} catch (err: unknown) {
			error.value = {
				message:
					err instanceof Error ? err.message : "Fetching Oauth2 systems failed",
				code: (err as ApiResponseError)?.code ?? 500,
				type: (err as ApiResponseError)?.type,
				title: (err as ApiResponseError)?.title,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const fetchLdapSchools = async (): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			const response: SchoolForLdapLoginResponse[] = await apiGetLdapSchools();
			schools.value = response;
		} catch (err: unknown) {
			error.value = {
				message:
					err instanceof Error ? err.message : "Fetching Ldap schools failed",
				code: (err as ApiResponseError)?.code ?? 500,
				type: (err as ApiResponseError)?.type,
				title: (err as ApiResponseError)?.title,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const checkConsent = async (me: MeResponse): Promise<string | undefined> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			const { haveBeenUpdated, consentStatus } = await apiCheckConsent(
				me.user.id
			);
			if (
				!(
					consentStatus === "ok" &&
					!haveBeenUpdated &&
					me.user.preferences?.firstLogin
				)
			) {
				return "/firstlogin";
			}
			return;
		} catch (err: unknown) {
			error.value = {
				message: err instanceof Error ? err.message : "Consent check failed",
				code: (err as ApiResponseError)?.code ?? 400,
				type: (err as ApiResponseError)?.type,
				title: (err as ApiResponseError)?.title,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const submitPasswordRecovery = async (username: string) => {
		passwordRecoveryError.value = null;
		try {
			const result = await apiPasswordRecovery(username.trim().toLowerCase());
			return result;
		} catch (err: any) {
			if (
				err?.response?.status === 400 &&
				err?.response?.data?.message === "EMAIL_DOMAIN_BLOCKED"
			) {
				passwordRecoveryError.value = "EMAIL_DOMAIN_BLOCKED";
			} else {
				passwordRecoveryError.value = "GENERIC_ERROR";
			}
			throw err;
		}
	};

	const validatePostLoginRedirect = async (): Promise<string | undefined> => {
		const me = authModule.getMe;
		if (!me) return;
		const isSuperhero: boolean = me.roles.some(
			(role) => role.name === RoleName.Superhero
		);
		if (isSuperhero) {
			return "isSuperhero";
		}

		const forcePasswordChange: boolean | undefined =
			me.user.forcePasswordChange;
		if (forcePasswordChange) {
			return "/forcePasswordChange";
		}

		const firstLogin = checkConsent(me);
		if (firstLogin) {
			return firstLogin;
		}
		return;
	};

	return {
		isLoading,
		oauthSystems,
		passwordRecoveryError,
		loginResult,
		schools,
		loginEmail,
		loginLdap,
		fetchOauthSystems,
		fetchLdapSchools,
		validatePostLoginRedirect,
		submitPasswordRecovery,
		getValidRedirect,
	};
};
