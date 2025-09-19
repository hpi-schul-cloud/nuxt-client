import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import {
	LanguageType,
	MeApiFactory,
	MeResponse,
	Permission,
	RoleName,
	UserApiFactory,
} from "@/serverApi/v3";
import { Status } from "@/store/types/commons";
import { $axios } from "@/utils/api";
import { useEnvConfig } from "@data-env";
import { schoolsModule } from "@/store";

const setCookie = (cname: string, cvalue: string, exdays: number) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + d.toUTCString();
	document.cookie = `${cname}=${cvalue}; Expires=${expires}; Path=/; Secure; SameSite=None`;
};

export const useAuthStore = defineStore("authStore", () => {
	const meApi = MeApiFactory(undefined, "/v3", $axios);
	const userApi = UserApiFactory(undefined, "/v3", $axios);

	const loggedIn = ref(false);
	const userLocale = ref<LanguageType>();
	const meResponse = ref<MeResponse>();
	const status = ref<Status>("");

	// Computed store properties
	const school = computed(() => meResponse.value?.school);
	const user = computed(() => meResponse.value?.user);

	const userRoles = computed(
		() => meResponse.value?.roles.map((r) => r.name) ?? []
	);

	const locale = computed(
		() =>
			// TODO: Why is it not directly using useEnvStore().fallBackLanguage and if it is, why is here default preferred before fallBack ?!
			userLocale.value ??
			useEnvConfig().value.I18N__DEFAULT_LANGUAGE ??
			LanguageType.De
	);
	const userPermissions = computed(() => meResponse.value?.permissions ?? []);
	const systemId = computed(() => meResponse.value?.systemId);

	const hasPermission = (permission: Permission) =>
		computed(() => userPermissions.value?.includes(permission) || false);

	const isTeacher = computed(() => userRoles.value.includes(RoleName.Teacher));
	const isStudent = computed(() => userRoles.value.includes(RoleName.Student));
	const isExpert = computed(() => userRoles.value.includes(RoleName.Expert));

	// Actions

	const login = async () => {
		const { data } = await meApi.meControllerMe();

		userLocale.value = data.language;
		meResponse.value = data;

		// There are several places in the app, where more school data is needed, than is included in the MeResponse (e.g. on school admin page).
		// It is not easily possible to fetch it there when needed. That's why it is fetched here centrally.
		await schoolsModule.fetchSchool();

		loggedIn.value = true;
	};

	const logout = (redirectUrl = "/logout") => {
		localStorage.clear();
		delete $axios.defaults.headers.common["Authorization"];
		window.location.replace(redirectUrl);
	};

	const externalLogout = () => logout("/logout/external");

	const updateUserLanguage = async (language: LanguageType) => {
		status.value = "pending";
		try {
			const response = await userApi.userControllerChangeLanguage({ language });
			if (response.data.successful) {
				userLocale.value = language;
				setCookie("USER_LANG", language, 30);
			}
		} catch {
			status.value = "error";
		}
	};

	return {
		loggedIn,
		userLocale,
		locale,
		meResponse,
		status,
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
	};
});

export const useAuthStoreRefs = () => storeToRefs(useAuthStore());
