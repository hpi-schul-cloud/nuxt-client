import { ApiValidationError } from "@/serverApi/v3";
import { ApiResponseError } from "@/store/types/commons";
import { logger } from "@util-logger";
import { filter } from "lodash";
import { ref, Ref } from "vue";
import { useLoginApi } from "./loginApi.composable";
import type {
	BusinessError,
	ConsentCheckResult,
	LoginOptions,
	LoginPayload,
	LoginResult,
	LogoutOptions,
	Oauth2RedirectPayload,
	Oauth2System,
} from "./types/login.types";

// --- logFilter logic migrated as a utility inside composable ---

/**
 * A list of keys whose values should be filtered out (e.g. for logging,
 * storing, or sending to front).
 */
//const MAX_LEVEL_FILTER = 12; //TODO: should be used, i guess

/*const secretDataKeys: string[] = [
	// server list
	"headers",
	"password",
	"passwort",
	"new_password",
	"new-password",
	"oauth-password",
	"current-password",
	"passwort_1",
	"passwort_2",
	"password_1",
	"password_2",
	"password-1",
	"password-2",
	"password_verification",
	"password_control",
	"PASSWORD_HASH",
	"password_new",
	"accessToken",
	"ticket",
	"firstName",
	"lastName",
	"email",
	"birthday",
	"description",
	"gradeComment",
	"_csrf",
	"searchUserPassword",
	// new entry added in client
	"resetId",
	"password_control",
	"username",
].map((k) => k.toLocaleLowerCase()); */ //TODO: should be used, i guess

//TODO: get this filtering mess going...
/*const filterSecretValue = (key: string, value: string): string =>
	secretDataKeys.includes(key.toLocaleLowerCase()) ? "<secret>" : value;

const filterDeep = (newData: object, level = 0): string | object => {
	if (level > MAX_LEVEL_FILTER) {
		return "<max level exceeded>";
	}
	if (typeof newData === "object" && newData !== null) {
		Object.entries(newData).forEach(([key, value]) => {
			const newValue = filterSecretValue(key, value);
			if (typeof newValue === "string") {
				newData[key] = newValue;
			} else {
				filterDeep(value, level + 1);
			}
		});
	}
	return newData;
};*/

/**
 * Clone and deeply filter secrets in a payload.
 */
/*const filter = (data: Record<string, string>): Record<string, string> =>
	filterDeep({ ...data });*/

const secretQueryKeys = ["accessToken", "access_token"].map((k) =>
	k.toLocaleLowerCase()
);
const filterQuery = (url: string): string => {
	let newUrl = url;
	secretQueryKeys.forEach((key) => {
		if (newUrl.toLocaleLowerCase().includes(key)) {
			newUrl = url.split("?")[0];
			newUrl += "?<secretQuery>";
		}
	});
	return newUrl;
};

/**
 * Filter a log to hide secret keys in url, body, and params.
 */

export interface Log {
	//TODO: this is just temporary, use already implemented logfilter or create a type in store
	url: string;
	body: Record<string, string>;
	params: Record<string, string>;
}
/*const filterLog = (log: Log): Log => {
	if (log) {
		log.url = filterQuery(log.url);
		log.body = filter(log.body);
		log.params = filter(log.params);
	}
	return log;
};*/

/**
 * Format an error, exposing only safe fields for frontend display/logging.
 */
const formatError = (
	err: ApiValidationError & { stack?: string }
): Partial<BusinessError> => {
	try {
		const e: Partial<BusinessError & { stack?: string }> = {
			//TODO: replacement for options: any needed
			message: err.message,
			error: err.details,
			statusCode: err.code,
			stack: err.stack,
		};
		/*if (e.options) {
			// "headers" not included in exposed error options
			e.options = err.options;
			delete e.options.headers;
		} */
		return e;
	} catch (err2) {
		// fallback: frontend log -- in original this logged on server
		// In Vue composable: optional, could use e.g. console.error
		logger.error(err2);
		return { error: err2, message: "Unknown error" };
	}
};

// --- End logFilter logic migration ---

// --- Begin permissionsChecker/userHasPermission migration ---

// Permission checking utility for frontend
export type PermissionsOperator = "or" | "and" | undefined;

export interface PermissionsChecker {
	(permission: string | string[], operator?: PermissionsOperator): boolean;
}

export interface User {
	permissions?: string[];
	// [key: string]: any; //TODO: populate User object
}

/**
 * Returns true if user has the requested permission(s).
 */
const userHasPermission = (
	user: User | undefined | null,
	permissions: string | string[],
	operator: PermissionsOperator = "and"
): boolean => {
	if (!Array.isArray(permissions)) {
		permissions = [permissions];
	}
	if (!user) return false;
	const userPermissions = user.permissions || [];
	if (operator === "or") {
		return permissions.some((permission) =>
			userPermissions.includes(permission)
		);
	} else {
		// 'and' by default
		return permissions.every((permission) =>
			userPermissions.includes(permission)
		);
	}
};

/**
 * Factory for a "permissionsChecker" function, tied to the current user (from Pinia store, useAuth composable, etc).
 * Usage: const can = permissionsChecker(currentUser); can(['PERM1', 'PERM2'], 'or')
 */
const permissionsChecker = (
	user: User | undefined | null
): PermissionsChecker => {
	return (permission, operator) =>
		userHasPermission(user, permission, operator);
};

// --- End permissionsChecker/userHasPermission migration ---

// --- Begin redirect migration ---

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

/**
 * Join a path with a query string.
 */
const joinPathWithQuery = (path: string, paramsString?: string): string =>
	paramsString ? `${path}?${paramsString}` : path;

/**
 * Perform a safe back redirect using the referrer.
 * In a Vue SPA, best effort: navigate to previous route or given fallback.
 */
const safeBackRedirect = (referrer?: string, appendage = ""): void => {
	// In a real Vue app, you might use vue-router for navigation
	// Here, fall back to window.location
	const location = referrer || document.referrer || "/";
	window.location.href = getValidRedirect(location) + appendage;
};

// --- End redirect migration ---

// --- Begin renameIdsInSchool migration ---

/**
 * Rename IDs in a school object from Handlebars to Vue/TypeScript for frontend use:
 * Renames "id" to "_id" for school and all nested relevant entities.
 * Used when transforming school objects from API responses or for compatibility.
 */
export interface SchoolEntity {
	id?: string;
	_id?: string;
	//[key: string]: any; ////TODO: populate SchoolEntity object
}

export interface County {
	id?: string;
	_id?: string;
	//[key: string]: any; //TODO: populate County object
}

export interface Year {
	id?: string;
	_id?: string;
	//[key: string]: any; //TODO: populate Year object
}

export interface School {
	id?: string;
	_id?: string;
	federalState?: {
		id?: string;
		_id?: string;
		counties?: County[];
		//[key: string]: any; //TODO: populate federal state
	};
	county?: County;
	currentYear?: Year;
	years?: {
		schoolYears?: Year[];
		activeYear?: Year;
		lastYear?: Year;
		nextYear?: Year;
		//[key: string]: any; //TODO: populate years object
	};
	//[key: string]: any; //TODO: populate School object
}

/**
 * Transforms the ids in a school object (all tree: school, state, counties, years, etc.)
 * so that "id" is remapped to "_id" and "id" key removed, following the legacy data model compatibility.
 */
const renameIdsInSchool = (school: School): School => {
	if (!school) return school;
	if (school.id) {
		school._id = school.id;
		delete school.id;
	}

	if (school.federalState && school.federalState.id) {
		school.federalState._id = school.federalState.id;
		delete school.federalState.id;
	}

	// counties array
	if (school.federalState && Array.isArray(school.federalState.counties)) {
		school.federalState.counties = school.federalState.counties.map(
			(county) => {
				if (!county) return county;
				const res = { ...county, _id: county.id };
				// retain "id" for compatibility if required, or delete as appropriate
				// delete res.id; // (commented as counties kept "id" in v1)
				return res;
			}
		);
	}

	if (school.county && school.county.id) {
		school.county._id = school.county.id;
		// Not deleted? Follows v1 logic that kept "id"
		// delete school.county.id;
	}

	if (school.currentYear && school.currentYear.id) {
		school.currentYear._id = school.currentYear.id;
		delete school.currentYear.id;
	}

	if (school.years && Array.isArray(school.years.schoolYears)) {
		school.years.schoolYears = school.years.schoolYears.map((year) => {
			if (!year) return year;
			const result = { ...year, _id: year.id };
			delete result.id;
			return result;
		});
	}

	if (school.years && school.years.activeYear && school.years.activeYear.id) {
		school.years.activeYear._id = school.years.activeYear.id;
		delete school.years.activeYear.id;
	}

	if (school.years && school.years.lastYear && school.years.lastYear.id) {
		school.years.lastYear._id = school.years.lastYear.id;
		delete school.years.lastYear.id;
	}

	if (school.years && school.years.nextYear && school.years.nextYear.id) {
		school.years.nextYear._id = school.years.nextYear.id;
		delete school.years.nextYear.id;
	}

	return school;
};

// --- End renameIdsInSchool migration ---

// --- Begin Login Schools Cache migration ---

/**
 * School minimal type for login listing.
 */
export interface LoginSchool {
	_id: string;
	name?: string;
	//[key: string]: any; //TODO: implement correct interface for LoginSchool
}

/**
 * Cache store for login schools list (migrating backend Cache to a reactive/computed store with auto-update).
 */
export const loginSchoolsCache = (() => {
	// 30 minutes interval (1800 seconds)
	// const updateIntervalSeconds = 1800; never used
	const schools: Ref<LoginSchool[]> = ref([]);
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref(undefined);
	//let lastUpdate = 0; never used
	//let timeoutId: number | undefined = undefined; never used

	//TODO: implement in loginApi
	//const { fetchLoginSchools } = useLoginApi();

	// Fetch and update schools list
	/*const updateSchools = async (force = false): Promise<void> => {
		const now = Math.floor(Date.now() / 1000);
		if (!force && now - lastUpdate < updateIntervalSeconds) return;
		isLoading.value = true;
		error.value = undefined;
		try {
			const fetchedSchools = await fetchLoginSchools();
			// Optionally, apply renameIdsInSchool on each school
			schools.value = Array.isArray(fetchedSchools)
				? fetchedSchools.map((s) => renameIdsInSchool({ ...s }))
				: [];
			lastUpdate = now;
		} catch (err: unknown) {
			error.value = {
				message:
					err instanceof Error
						? err.message
						: "Failed to fetch schools for login",
				error: err,
				statusCode: (err as any)?.code ?? 500,
			};
		} finally {
			isLoading.value = false;
			// schedule next update
			if (typeof window !== "undefined") {
				if (timeoutId) clearTimeout(timeoutId);
				timeoutId = window.setTimeout(
					() => updateSchools(true),
					updateIntervalSeconds * 1000
				);
			}
		}
	};*/

	// Initial auto-load
	if (typeof window !== "undefined") {
		//updateSchools();
	}

	return {
		schools,
		isLoading,
		error,
		//updateSchools,
		// Forcible refresh
		//refresh: () => updateSchools(true),
	};
})();

// --- End Login Schools Cache migration ---

export interface CookieDefaults {
	httpOnly: boolean;
	hostOnly: boolean;
	sameSite: boolean | "strict" | "lax" | "none";
	secure: boolean;
	expires: Date;
}

export interface SetCookieOptions extends Partial<CookieDefaults> {
	[key: string]: string | boolean | Date | undefined;
}

/**
 * Simulate the server-side cookieHelper for frontend (login composable) context.
 * In a frontend app, setting cookies must use document.cookie.
 * Here, we expose setCookie and cookieDefaults (with dummy defaults, simulate Configuration values).
 * Note: On the frontend, you cannot set httpOnly or hostOnly cookies.
 */
const cookieDefaults: CookieDefaults = {
	httpOnly: false, // Browsers do not allow setting httpOnly cookies via JS
	hostOnly: false, // not available in browser APIs
	sameSite: "lax",
	//secure: import.meta.env.MODE === "production",
	secure: false,
	expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
};

/**
 * Set a cookie in the browser with sane (simulated) defaults.
 * @param cookieName
 * @param value
 * @param options
 */
const setCookie = (
	cookieName: string,
	value: string,
	options: SetCookieOptions = {}
): void => {
	const opts: CookieDefaults & SetCookieOptions = {
		...cookieDefaults,
		...options,
	};
	let cookieStr = `${encodeURIComponent(cookieName)}=${encodeURIComponent(value)}`;

	if (opts.expires) {
		cookieStr += `; expires=${opts.expires.toUTCString()}`;
	}
	if (opts.sameSite) {
		cookieStr += `; samesite=${opts.sameSite}`;
	}
	if (opts.secure) {
		cookieStr += `; secure`;
	}
	// httpOnly and hostOnly cannot be set via document.cookie
	document.cookie = cookieStr;
};

export const useLogin = () => {
	const {
		apiLogin,
		apiLoginEmail,
		apiLoginLdap,
		apiLoginOAuth2,
		apiGetOauthSystems,
		apiLogout,
		apiLogoutExternal,
		apiCheckConsent,
		//fetchLoginSchools,
	} = useLoginApi();

	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref(undefined);
	const consentCheckResult: Ref<ConsentCheckResult | undefined> =
		ref(undefined);
	const oauthSystems: Ref<Oauth2System[] | undefined> = ref(undefined);
	const loginResult: Ref<LoginResult | undefined> = ref(undefined);

	const login = async (
		payload: LoginPayload,
		options: LoginOptions = {}
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			const result = await apiLogin(payload, options);
			loginResult.value = result;
		} catch (err: unknown) {
			error.value = {
				message: err instanceof Error ? err.message : "Login failed",
				error: err,
				statusCode: (err as ApiResponseError)?.code ?? 400,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const loginEmail = async (
		username: string,
		password: string,
		redirect?: string
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			const result = await apiLoginEmail(username, password, redirect);
			loginResult.value = result;
		} catch (err: unknown) {
			error.value = {
				message: err instanceof Error ? err.message : "Email login failed",
				error: err,
				statusCode: (err as ApiResponseError)?.code ?? 400,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const loginLdap = async (
		username: string,
		password: string,
		schoolId: string,
		system: string,
		redirect?: string
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			const result = await apiLoginLdap(
				username,
				password,
				schoolId,
				system,
				redirect
			);
			loginResult.value = result;
		} catch (err: unknown) {
			error.value = {
				message: err instanceof Error ? err.message : "LDAP login failed",
				error: err,
				statusCode: (err as ApiResponseError)?.code ?? 400,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const loginOAuth2 = async (payload: Oauth2RedirectPayload): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			const result = await apiLoginOAuth2(payload);
			loginResult.value = result;
		} catch (err: unknown) {
			error.value = {
				message: err instanceof Error ? err.message : "OAuth2 login failed",
				error: err,
				statusCode: (err as ApiResponseError)?.code ?? 400,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const fetchOauthSystems = async (): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			oauthSystems.value = await apiGetOauthSystems();
		} catch (err: unknown) {
			error.value = {
				message:
					err instanceof Error ? err.message : "Fetching Oauth2 systems failed",
				error: err,
				statusCode: (err as ApiResponseError)?.code ?? 500,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const checkConsent = async (userId: string): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			consentCheckResult.value = await apiCheckConsent(userId);
		} catch (err: unknown) {
			error.value = {
				message: err instanceof Error ? err.message : "Consent check failed",
				error: err,
				statusCode: (err as ApiResponseError)?.code ?? 400,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const logout = async (options?: LogoutOptions): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			await apiLogout(options);
		} catch (err: unknown) {
			error.value = {
				message: err instanceof Error ? err.message : "Logout failed",
				error: err,
				statusCode: (err as ApiResponseError)?.code ?? 500,
			};
		} finally {
			isLoading.value = false;
		}
	};

	const logoutExternal = async (): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;
		try {
			await apiLogoutExternal();
		} catch (err: unknown) {
			error.value = {
				message: err instanceof Error ? err.message : "External logout failed",
				error: err,
				statusCode: (err as ApiResponseError)?.code ?? 500,
			};
		} finally {
			isLoading.value = false;
		}
	};

	/**
	 * Expose login schools cache (reactive)
	 */
	const schools = loginSchoolsCache.schools;
	const isLoadingSchools = loginSchoolsCache.isLoading;
	const schoolsError = loginSchoolsCache.error;
	//const refreshSchools = loginSchoolsCache.refresh;

	return {
		isLoading,
		error,
		login,
		loginEmail,
		loginLdap,
		loginOAuth2,
		fetchOauthSystems,
		oauthSystems,
		checkConsent,
		consentCheckResult,
		logout,
		logoutExternal,
		loginResult,
		cookieDefaults,
		setCookie, // expose cookie helper (simulated for browser)
		//filterLog, // expose log filter utility
		filterQuery,
		filter,
		formatError,
		userHasPermission, // expose permission checking
		permissionsChecker,
		// redirect helpers
		getValidRedirect,
		joinPathWithQuery,
		safeBackRedirect,
		// IDs renaming helper
		renameIdsInSchool,
		// schools listing for LDAP login (cache)
		schools,
		isLoadingSchools,
		schoolsError,
		//refreshSchools,
	};
};
