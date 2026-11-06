import { AccountProfileData, ConsentSessionResponse, UpdateProfilePayload } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { AccountApiFactory, Oauth2ApiFactory } from "@api-server";
import { notifyError, notifySuccess, useAppStore, useAppStoreRefs } from "@data-app";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useAccount = () => {
	const { t } = useI18n();
	const { execute, isRunning } = useSafeAxiosTask();
	const appStore = useAppStore();
	const { user, isStudent, systemId } = useAppStoreRefs();

	const accountApi = AccountApiFactory(undefined, "/v3", $axios);
	const oauth2Api = Oauth2ApiFactory(undefined, "/v3", $axios);

	const profile = ref<AccountProfileData | null>(null);
	const consentSessions = ref<ConsentSessionResponse[]>([]);
	const isUpdating = ref(false);

	const isSSO = computed(() => Boolean(systemId.value));
	const isLoading = isRunning;

	const loadProfile = async (): Promise<AccountProfileData | null> => {
		const userId = user.value?.id;
		if (!userId) return null;

		const { result, error } = await execute(() => $axios.get(`/v1/users/${userId}`));
		if (error || !result?.data) return null;

		const userData = result.data;
		profile.value = {
			id: userId,
			firstName: userData.firstName || user.value?.firstName || "",
			lastName: userData.lastName || user.value?.lastName || "",
			email: userData.email || "",
			isSSO: isSSO.value,
			isStudent: isStudent.value,
			discoverable: Boolean(userData.discoverable),
		};

		return profile.value;
	};

	const updateProfile = async (payload: UpdateProfilePayload): Promise<boolean> => {
		isUpdating.value = true;
		try {
			await accountApi.accountControllerUpdateMyAccount(payload);
			notifySuccess(t("pages.account.notifications.success"));
			await appStore.login();
			await loadProfile();
			return true;
		} catch (error: unknown) {
			const axiosError = error as { response?: { data?: { message?: string } } };
			const message = axiosError?.response?.data?.message || t("pages.account.notifications.error");
			notifyError(message);
			return false;
		} finally {
			isUpdating.value = false;
		}
	};

	const updateVisibility = async (discoverable: boolean): Promise<boolean> => {
		const userId = user.value?.id;
		if (!userId) return false;

		isUpdating.value = true;
		try {
			await $axios.patch(`/v1/users/${userId}`, { discoverable });
			if (profile.value) {
				profile.value.discoverable = discoverable;
			}
			notifySuccess(t("pages.account.notifications.visibilitySuccess"));
			return true;
		} catch {
			notifyError(t("pages.account.notifications.error"));
			return false;
		} finally {
			isUpdating.value = false;
		}
	};

	const loadConsentSessions = async (): Promise<ConsentSessionResponse[]> => {
		try {
			const response = await oauth2Api.oauthProviderControllerListConsentSessions();
			consentSessions.value = response.data || [];
			return consentSessions.value;
		} catch {
			consentSessions.value = [];
			return [];
		}
	};

	const revokeConsentSession = async (clientId: string): Promise<boolean> => {
		try {
			await oauth2Api.oauthProviderControllerRevokeConsentSession(clientId);
			consentSessions.value = consentSessions.value.filter((session) => session.client_id !== clientId);
			notifySuccess(t("pages.account.notifications.revokeSuccess"));
			return true;
		} catch {
			notifyError(t("pages.account.notifications.revokeError"));
			return false;
		}
	};

	return {
		profile,
		consentSessions,
		isLoading,
		isUpdating,
		isSSO,
		loadProfile,
		updateProfile,
		updateVisibility,
		loadConsentSessions,
		revokeConsentSession,
	};
};
