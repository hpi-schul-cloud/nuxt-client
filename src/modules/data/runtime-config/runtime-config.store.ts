import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { RuntimeConfigApiFactory, RuntimeConfigListResponse } from "@api-server";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

export type RuntimeConfigValue = Record<string, string | boolean | number>;
export type RuntimeConfigData = { value: string | boolean | number; description: string; type: string };
export type RuntimeConfig = Record<string, RuntimeConfigData>;

export const useRuntimeConfigStore = defineStore("runtimeConfigStore", () => {
	const PLURAL_COUNT = 2;
	const { t } = useI18nGlobal();
	const { execute, isRunning: isLoading } = useSafeAxiosTask();
	const runtimeConfigApi = RuntimeConfigApiFactory(undefined, "/v3", $axios);
	const runtimeConfigData = ref<RuntimeConfig>({});

	const runtimeConfig = computed<RuntimeConfigValue>(() =>
		Object.fromEntries(Object.entries(runtimeConfigData.value).map(([key, entry]) => [key, entry.value]))
	);

	const fetchRuntimeConfig = async () => {
		const result = await fetchRuntimeConfigPlain();
		if (result) {
			setRuntimeConfig(result.data);
		}
	};

	const fetchRuntimeConfigPlain = async () => {
		const { result } = await execute(
			runtimeConfigApi.runtimeConfigControllerGetRuntimeConfig,
			t("common.notifications.errors.notLoaded", { type: t("common.labels.runtimeConfig") }, PLURAL_COUNT)
		);
		return result;
	};

	const setRuntimeConfig = (config: RuntimeConfigListResponse) => {
		runtimeConfigData.value = Object.fromEntries(
			config.data.map(({ key, value, description, type }) => [
				key,
				{
					value,
					description: description ?? "",
					type,
				},
			])
		);
	};

	return {
		fetchRuntimeConfig,
		isLoading,
		runtimeConfig: readonly(runtimeConfig),
	};
});
