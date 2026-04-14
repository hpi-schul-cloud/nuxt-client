import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { $axios } from "@/utils/api";
import { RuntimeConfigApiFactory, RuntimeConfigListResponse } from "@api-server";
import { useAppStore } from "@data-app";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

export type RuntimeConfigValue = Record<string, string | boolean | number>;
export type RuntimeConfigData = { value: string | boolean | number; description: string; type: string };
export type RuntimeConfig = Record<string, RuntimeConfigData>;

export const useRuntimeConfigStore = defineStore("runtimeConfigStore", () => {
	const runtimeConfigApi = RuntimeConfigApiFactory(undefined, "/v3", $axios);
	const runtimeConfigData = ref<RuntimeConfig>({});

	const runtimeConfig = computed<RuntimeConfigValue>(() =>
		Object.fromEntries(Object.entries(runtimeConfigData.value).map(([key, entry]) => [key, entry.value]))
	);

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

	const fetchRuntimeConfig = async () => {
		try {
			const runtimeConfigRes = await runtimeConfigApi.runtimeConfigControllerGetRuntimeConfig();

			setRuntimeConfig(runtimeConfigRes.data);
		} catch {
			useAppStore().handleApplicationError(HttpStatusCode.GatewayTimeout);
		}
	};

	return {
		fetchRuntimeConfig,
		runtimeConfig: readonly(runtimeConfig),
	};
});
