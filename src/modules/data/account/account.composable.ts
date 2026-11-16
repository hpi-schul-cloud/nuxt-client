import { AccountProfileData, ConsentSessionResponse, UpdateProfilePayload, UpdateProfileResult } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { AccountApiFactory, Oauth2ApiFactory } from "@api-server";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { computed, ref } from "vue";

export const useAccount = () => {
	const { execute, isRunning } = useSafeAxiosTask();
	const appStore = useAppStore();
	const { user, isStudent, systemId } = useAppStoreRefs();

	const accountApi = AccountApiFactory(undefined, "/v3", $axios);
	const oauth2Api = Oauth2ApiFactory(undefined, "/v3", $axios);

	const profile = ref<AccountProfileData | null>(null);
	const consentSessions = ref<ConsentSessionResponse[]>([]);
	const hasConsentSessionsError = ref(false);
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

	const updateProfile = async (payload: UpdateProfilePayload): Promise<UpdateProfileResult> => {
		isUpdating.value = true;
		try {
			await accountApi.accountControllerUpdateMyAccount(payload);
		} catch (error: unknown) {
			const axiosError = error as { response?: { data?: { message?: string } } };
			isUpdating.value = false;
			return { success: false, errorMessage: axiosError?.response?.data?.message };
		}

		// The changes are saved at this point, so a failed refresh must not be reported as a failed save
		await Promise.allSettled([appStore.login(), loadProfile()]);
		isUpdating.value = false;
		return { success: true };
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
			return true;
		} catch {
			return false;
		} finally {
			isUpdating.value = false;
		}
	};

	const loadConsentSessions = async (): Promise<ConsentSessionResponse[]> => {
		try {
			const response = await oauth2Api.oauthProviderControllerListConsentSessions();
			consentSessions.value = response.data || [];
			hasConsentSessionsError.value = false;
		} catch {
			consentSessions.value = [];
			hasConsentSessionsError.value = true;
		}
		return consentSessions.value;
	};

	const revokeConsentSession = async (clientId: string): Promise<boolean> => {
		try {
			await oauth2Api.oauthProviderControllerRevokeConsentSession(clientId);
			consentSessions.value = consentSessions.value.filter((session) => session.client_id !== clientId);
			return true;
		} catch {
			return false;
		}
	};

	return {
		profile,
		consentSessions,
		hasConsentSessionsError,
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
