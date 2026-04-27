import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { ApplicationError } from "@/store/types/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { $axios } from "@/utils/api";
import {
	LanguageType,
	MeApiFactory,
	MeResponse,
	Permission,
	RoleName,
	SchoolApiFactory,
	SchoolFeature,
	SchoolResponse,
	SchoolSystemResponse,
	UserApiFactory,
} from "@api-server";
import { useEnvConfig } from "@data-env";
import { useSessionBroadcast } from "@util-broadcast-channel";
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
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);

	const { execute: executeSchoolApi } = useSafeAxiosTask();
	const { sendLogout, close } = useSessionBroadcast();

	const isLoggedIn = ref(false);
	const applicationError = ref<{ status: HttpStatusCode; translationKeyOrText: string }>();

	const userLocale = ref<LanguageType>();
	const meResponse = ref<MeResponse>();
	// Treated as never undefined. Currently secured by order execution in login() function. Should be treated differently tho.
	// Affects more than just schoolDetails. Almost all data in here should be treated as never undefined, as the app does not work without them.
	const schoolDetails = ref<SchoolResponse>(undefined!);

	// Computed store properties
	const school = computed(() => meResponse.value?.school);
	const schoolFeatures = computed(() => new Set(schoolDetails.value?.features));
	const schoolSystems = ref<SchoolSystemResponse[]>([]);

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

	const hasFeature = (feature: SchoolFeature) => schoolFeatures.value.has(feature);

	// Actions
	const fetchSchoolDetails = async (schoolId: string) => {
		const { result, success, error } = await executeSchoolApi(
			() => schoolApi.schoolControllerGetSchoolById(schoolId),
			"pages.administration.school.index.error"
		);
		if (success) {
			schoolDetails.value = result?.data;
		}
		return { result, success, error };
	};

	const fetchSchoolSystems = async (schoolId: string) => {
		const { result, success, error } = await executeSchoolApi(
			() => schoolApi.schoolControllerGetSchoolSystems(schoolId),
			"pages.administration.school.index.error"
		);
		if (success) {
			schoolSystems.value = result.data;
		}
		return { result, success, error };
	};

	const deleteSchoolSystem = async (systemId: string) => {
		const { success } = await executeSchoolApi(
			() => schoolApi.schoolControllerRemoveSystemFromSchool(schoolDetails.value.id, systemId),
			"pages.administration.school.index.error"
		);

		if (success && school.value) {
			await Promise.all([fetchSchoolDetails(school.value.id), fetchSchoolSystems(school.value.id)]);
		}
	};

	const login = async () => {
		const { data } = await meApi.meControllerMe();

		userLocale.value = data.language;
		meResponse.value = data;
		isLoggedIn.value = true;

		await fetchSchoolDetails(meResponse.value.school.id);
	};

	const logout = (redirectUrl = "/logout") => {
		sendLogout();
		clearUserSession();
		globalThis.location.replace(redirectUrl);
	};

	const clearUserSession = () => {
		localStorage.clear();
		delete $axios.defaults.headers.common["Authorization"];
		close();
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
		if (translationKeyOrText) {
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
		userPreferences,
		userPermissions,
		hasPermission,
		isTeacher,
		isStudent,
		isAdmin,
		isExternalPerson,
		school,
		schoolDetails,
		schoolFeatures,
		hasFeature,
		userRoles,
		systemId,
		deleteSchoolSystem,
		login,
		logout,
		clearUserSession,
		externalLogout,
		updateUserLanguage,
		clearApplicationError,
		handleUnknownError,
		handleApplicationError,
		applicationError: readonly(applicationError),
	};
});

export const useAppStoreRefs = () => storeToRefs(useAppStore());
