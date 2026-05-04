import { notifySuccess } from "./notification-store";
import { ApplicationError } from "@/store/types/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { $axios } from "@/utils/api";
import { LanguageType, MeApiFactory, MeResponse, Permission, RoleName, UserApiFactory } from "@api-server";
import { useEnvConfig } from "@data-env";
import { logger } from "@util-logger";
import { watchOnce } from "@vueuse/core";
import { defineStore, storeToRefs } from "pinia";
import { computed, readonly, ref } from "vue";

// use of vueuse "useCookies" ?
const setCookie = (cname: string, cvalue: string, exdays: number) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + d.toUTCString();
	document.cookie = `${cname}=${cvalue}; Expires=${expires}; Path=/; Secure; SameSite=None`;
};

const DEFAULT_TIMEOUT_SECONDS = 2 * 60 * 60; // 2 hours
const JWT_TIMER_ENDPOINT = "/v1/accounts/jwtTimer";

const sessionTimeoutTimestamp = ref<number | null>(null);

const BROADCAST_CHANNEL_NAME = "user-session-channel";
const BROADCAST_MESSAGE_LOGOUT = "logout";
const BROADCAST_MESSAGE_TIME_UPDATED = "time-updated";

export const useAppStore = defineStore("applicationStore", () => {
	const meApi = MeApiFactory(undefined, "/v3", $axios);
	const userApi = UserApiFactory(undefined, "/v3", $axios);

	const isLoggedIn = ref(false);
	const applicationError = ref<{
		status: HttpStatusCode;
		translationKeyOrText: string;
	}>();

	const userLocale = ref<LanguageType>();
	const meResponse = ref<MeResponse>();

	// Computed store properties
	const school = computed(() => meResponse.value?.school);
	const user = computed(() => meResponse.value?.user);

	const userRoles = computed(() => meResponse.value?.roles.map((r) => r.name) ?? []);

	const locale = computed(
		() =>
			// TODO: Why is it not directly using useEnvStore().fallBackLanguage and if it is, why is here default preferred before fallBack ?!
			userLocale.value ?? useEnvConfig().value.I18N__DEFAULT_LANGUAGE ?? LanguageType.DE
	);
	const userPreferences = computed(() => meResponse.value?.preferences);
	const userPermissions = computed(() => meResponse.value?.permissions ?? []);
	const systemId = computed(() => meResponse.value?.systemId);

	const isTeacher = computed(() => userRoles.value.includes(RoleName.TEACHER));
	const isStudent = computed(() => userRoles.value.includes(RoleName.STUDENT));
	const isAdmin = computed(() => userRoles.value.includes(RoleName.ADMINISTRATOR));
	const isExternalPerson = computed(() => userRoles.value.includes(RoleName.EXTERNAL_PERSON));

	// Helpers/Utils
	const hasPermission = (permission: Permission) =>
		computed(() => userPermissions.value?.includes(permission) ?? false);

	// Actions

	const login = async () => {
		const { data } = await meApi.meControllerMe();
		userLocale.value = data.language;
		meResponse.value = data;
		isLoggedIn.value = true;
	};

	const logout = (redirectUrl = "/logout") => {
		post(BROADCAST_MESSAGE_LOGOUT);
		logoutWithoutBroadcast(redirectUrl);
	};

	const logoutWithoutBroadcast = (redirectUrl = "/logout") => {
		clearUserSession();
		close();
		globalThis.location.replace(redirectUrl);
	};

	const externalLogout = () => logout("/logout/external");

	const autoLogout = () => logout("/logout?auto-logout=true");

	const extendSession = async () => {
		try {
			// extend the session on the server
			const result = await $axios.post(JWT_TIMER_ENDPOINT);
			setTimerSeconds(result.data.ttl);
			notifySuccess("feature-autoLogout.message.extending-session-success");
			postTimerSeconds(result.data.ttl);
		} catch {
			logoutWithoutBroadcast("/logout?auto-logout=true");
		}
	};

	// TODO: remove after testing
	const shortenSession = () => {
		setTimerSeconds(10); // Set to 10 seconds for testing purposes, can be adjusted as needed
		postTimerSeconds(10);
	};

	const clearUserSession = () => {
		isLoggedIn.value = false;
		localStorage.clear();
		delete $axios.defaults.headers.common["Authorization"];
	};

	const updateUserLanguage = (language: LanguageType) =>
		userApi
			.userControllerChangeLanguage({ language })
			.then((response) => {
				if (response.data.successful) {
					userLocale.value = language;
					setCookie("USER_LANG", language, 30);
				}
			})
			.catch(logger.error);

	// session-timer

	const startTimer = () => {
		const { JWT_TIMEOUT_SECONDS } = useEnvConfig().value;
		const timeInSeconds = JWT_TIMEOUT_SECONDS ?? DEFAULT_TIMEOUT_SECONDS;
		postTimerSeconds(timeInSeconds);
		setTimerSeconds(timeInSeconds);
	};

	const stopTimer = () => {
		sessionTimeoutTimestamp.value = null;
	};

	const setTimerSeconds = (seconds: number) => {
		sessionTimeoutTimestamp.value = Date.now() + seconds * 1000;
	};

	const postTimerSeconds = (seconds: number) => {
		post(`${BROADCAST_MESSAGE_TIME_UPDATED}:${seconds}`);
	};

	// startTimer when config was loaded
	watchOnce(() => useEnvConfig().value.JWT_TIMEOUT_SECONDS, startTimer);

	// session-state synchronization (across tabs and with schulcloud-client)

	const broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);

	broadcastChannel.onmessage = (event) => {
		const message = event.data;

		if (message === BROADCAST_MESSAGE_LOGOUT) {
			logoutWithoutBroadcast("/logout?auto-logout=true");
			return;
		}

		if (message.match(new RegExp(`^${BROADCAST_MESSAGE_TIME_UPDATED}`))) {
			const time = message.split(":").at(1) ?? "";
			const timeInSeconds = Number.parseInt(time, 10);
			if (!Number.isNaN(timeInSeconds)) {
				setTimerSeconds(timeInSeconds);
			}
		}
	};

	const post = (message: string) => {
		broadcastChannel.postMessage(message);
	};

	const close = () => {
		broadcastChannel.close();
	};

	const handleApplicationError = (status: HttpStatusCode, translationKeyOrText?: string) => {
		if (translationKeyOrText) {
			applicationError.value = {
				status,
				translationKeyOrText: translationKeyOrText,
			};
		} else {
			switch (status) {
				case HttpStatusCode.BadRequest:
					applicationError.value = {
						status,
						translationKeyOrText: "error.400",
					};
					break;
				case HttpStatusCode.Unauthorized:
					applicationError.value = {
						status,
						translationKeyOrText: "error.401",
					};
					break;
				case HttpStatusCode.Forbidden:
					applicationError.value = {
						status,
						translationKeyOrText: "error.403",
					};
					break;
				case HttpStatusCode.NotFound:
					applicationError.value = {
						status,
						translationKeyOrText: "error.404",
					};
					break;
				case HttpStatusCode.RequestTimeout:
					applicationError.value = {
						status,
						translationKeyOrText: "error.408",
					};
					break;
				case HttpStatusCode.InternalServerError:
				default:
					applicationError.value = {
						status,
						translationKeyOrText: "error.generic",
					};
					break;
			}
		}
	};

	const handleUnknownError = (err: unknown) => {
		const applicationError = err as ApplicationError;
		if (applicationError.name === "ApplicationError") {
			handleApplicationError(applicationError.statusCode, applicationError.translationKey);
		} else {
			handleApplicationError(HttpStatusCode.InternalServerError, "error.generic");
		}
	};

	const clearApplicationError = () => {
		applicationError.value = undefined;
	};

	return {
		isLoggedIn,
		userLocale,
		locale,
		meResponse,
		user,
		userPreferences,
		userPermissions,
		hasPermission,
		isTeacher,
		isStudent,
		isAdmin,
		isExternalPerson,
		school,
		userRoles,
		systemId,
		login,
		logout,
		extendSession,
		clearUserSession,
		externalLogout,
		autoLogout,
		updateUserLanguage,
		clearApplicationError,
		handleUnknownError,
		handleApplicationError,
		startTimer,
		stopTimer,
		shortenSession,
		sessionTimeoutTimestamp: readonly(sessionTimeoutTimestamp),
		applicationError: readonly(applicationError),
	};
});

export const useAppStoreRefs = () => storeToRefs(useAppStore());
