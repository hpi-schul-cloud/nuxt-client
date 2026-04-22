import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { RuntimeConfigApiFactory, RuntimeConfigListItemResponse, RuntimeConfigListResponse } from "@api-server";
import { useAppStore } from "@data-app";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

export type RuntimeConfigValue = Record<string, RuntimeConfigListItemResponse["value"]>;
export type RuntimeConfigData = Omit<RuntimeConfigListItemResponse, "key">;
export type RuntimeConfig = Record<string, RuntimeConfigData>;

export const useRuntimeConfigStore = defineStore("runtimeConfigStore", () => {
	const runtimeConfigApi = RuntimeConfigApiFactory(undefined, "/v3", $axios);
	const runtimeConfigData = ref<RuntimeConfig>({});
	const isLoading = ref(false);

	const runtimeConfig = computed<RuntimeConfigValue>(() =>
		Object.fromEntries(Object.entries(runtimeConfigData.value).map(([key, entry]) => [key, entry.value]))
	);

	const fetchRuntimeConfig = async () => {
		isLoading.value = true;
		try {
			const result = await runtimeConfigApi.runtimeConfigControllerGetRuntimeConfig();
			if (result.data) {
				setRuntimeConfig(result.data);
			}

			return true;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);
			if (responseError.code !== 401) {
				useAppStore().handleApplicationError(responseError.code);
			}

			return false;
		} finally {
			isLoading.value = false;
		}
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
