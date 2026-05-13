import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { PublicSystemResponse, SystemsApiFactory } from "@api-server";
import { useEnvConfig } from "@data-env";
import { useOAuthApi } from "@data-oauth";
import { computed, Ref, ref, watch } from "vue";

export const useSystem = (systemId: Ref<string | undefined>) => {
	const systemApi = SystemsApiFactory(undefined, "/v3", $axios);

	const { t } = useI18nGlobal();

	const { execute, status, error, isRunning: isLoading } = useSafeAxiosTask();

	const system: Ref<PublicSystemResponse | undefined> = ref();
	const systemName = computed(() => system.value?.displayName);
	const { getSessionTokenExpiration } = useOAuthApi();
	const sessionTokenExpiration: Ref<Date | undefined> = ref();

	const fetchSystem = async (id: string) => {
		const onErrorNotifyMessage = t("common.notifications.errors.notLoaded", { type: t("common.words.system") });
		const { result, success } = await execute(() => systemApi.systemControllerGetSystem(id), onErrorNotifyMessage);

		if (success) {
			system.value = result.data;
			if (system.value?.oauthConfig?.endSessionEndpoint) {
				sessionTokenExpiration.value = await getSessionTokenExpiration();
			}
		}
	};

	const hasEndSessionEndpoint = computed(() => !!system.value?.oauthConfig?.endSessionEndpoint);

	const isSessionTokenExpired = ref(false);
	const updateSessionTokenExpiration = async () => {
		if (hasEndSessionEndpoint.value) {
			sessionTokenExpiration.value = await getSessionTokenExpiration();
			const now = new Date();
			isSessionTokenExpired.value = !sessionTokenExpiration.value || now >= sessionTokenExpiration.value;
		}
	};

	const isExternalLogoutAllowed = computed(
		() => useEnvConfig().value.FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED && hasEndSessionEndpoint.value
	);

	watch(
		systemId,
		(newId) => {
			if (newId) {
				fetchSystem(newId);
			}
		},
		{ immediate: true }
	);

	return {
		system,
		systemName,
		status,
		error,
		isLoading,
		sessionTokenExpiration,
		isExternalLogoutAllowed,
		isSessionTokenExpired,
		updateSessionTokenExpiration,
	};
};
