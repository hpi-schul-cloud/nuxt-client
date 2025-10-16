import { LanguageType, MeApiFactory, MeResponse, Permission, RoleName, UserApiFactory } from "@/serverApi/v3";
import { ApplicationError } from "@/store/types/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { $axios } from "@/utils/api";
import { useEnvConfig } from "@data-env";
import { logger } from "@util-logger";
import { defineStore, storeToRefs } from "pinia";
import { computed, readonly, ref } from "vue";

// use of vueuse "useCookies" ?
const setCookie = (cname: string, cvalue: string, exdays: number) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + d.toUTCString();
	document.cookie = `${cname}=${cvalue}; Expires=${expires}; Path=/; Secure; SameSite=None`;
};

export const useAppStore = defineStore("applicationStore", () => {
	const meApi = MeApiFactory(undefined, "/v3", $axios);
	const userApi = UserApiFactory(undefined, "/v3", $axios);

	const isLoggedIn = ref(false);
	const applicationError = ref<{ status: HttpStatusCode; translationKeyOrText: string }>();

	const userLocale = ref<LanguageType>();
	const meResponse = ref<MeResponse>();

	// Computed store properties
	const school = computed(() => meResponse.value?.school);
	const user = computed(() => meResponse.value?.user);

	const userRoles = computed(() => meResponse.value?.roles.map((r) => r.name) ?? []);

	const locale = computed(
		() =>
			// TODO: Why is it not directly using useEnvStore().fallBackLanguage and if it is, why is here default preferred before fallBack ?!
			userLocale.value ?? useEnvConfig().value.I18N__DEFAULT_LANGUAGE ?? LanguageType.De
	);
	const userPermissions = computed(() => meResponse.value?.permissions ?? []);
	const systemId = computed(() => meResponse.value?.systemId);

	const isTeacher = computed(() => userRoles.value.includes(RoleName.Teacher));
	const isStudent = computed(() => userRoles.value.includes(RoleName.Student));
	const isExpert = computed(() => userRoles.value.includes(RoleName.Expert));

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
		localStorage.clear();
		delete $axios.defaults.headers.common["Authorization"];
		window.location.replace(redirectUrl);
	};

	const externalLogout = () => logout("/logout/external");

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

	const handleApplicationError = (status: HttpStatusCode, translationKeyOrText?: string) => {
		if (translationKeyOrText !== undefined) {
			applicationError.value = { status, translationKeyOrText: translationKeyOrText };
		} else {
			switch (status) {
				case HttpStatusCode.BadRequest:
					applicationError.value = { status, translationKeyOrText: "error.400" };
					break;
				case HttpStatusCode.Unauthorized:
					applicationError.value = { status, translationKeyOrText: "error.401" };
					break;
				case HttpStatusCode.Forbidden:
					applicationError.value = { status, translationKeyOrText: "error.403" };
					break;
				case HttpStatusCode.NotFound:
					applicationError.value = { status, translationKeyOrText: "error.404" };
					break;
				case HttpStatusCode.RequestTimeout:
					applicationError.value = { status, translationKeyOrText: "error.408" };
					break;
				case HttpStatusCode.InternalServerError:
					applicationError.value = { status, translationKeyOrText: "error.generic" };
					break;
				default:
					applicationError.value = { status, translationKeyOrText: "error.generic" };
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
		userPermissions,
		hasPermission,
		isTeacher,
		isStudent,
		isExpert,
		school,
		userRoles,
		systemId,
		login,
		logout,
		externalLogout,
		updateUserLanguage,
		clearApplicationError,
		handleUnknownError,
		handleApplicationError,
		applicationError: readonly(applicationError),
	};
});

export const useAppStoreRefs = () => storeToRefs(useAppStore());
