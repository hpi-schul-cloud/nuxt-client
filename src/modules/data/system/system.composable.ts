import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { SystemsApiFactory } from "@api-server";
import { computed, Ref, ref, watch } from "vue";

export const useSystem = (systemId: Ref<string | undefined>) => {
	const systemApi = SystemsApiFactory(undefined, "/v3", $axios);

	const { t } = useI18nGlobal();

	const { execute, status, error, isRunning: isLoading } = useSafeAxiosTask();

	const system = ref();
	const systemName = computed(() => system.value?.displayName);

	const fetchSystem = async (id: string) => {
		const onErrorNotifyMessage = t("common.notifications.errors.notLoaded", { type: t("common.words.system") });
		const { result, success } = await execute(() => systemApi.systemControllerGetSystem(id), onErrorNotifyMessage);

		if (success) {
			system.value = {
				id: result.data.id,
				displayName: result.data.displayName,
				hasEndSessionEndpoint: !!result.data.oauthConfig?.endSessionEndpoint,
			};
		}
	};

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
	};
};
