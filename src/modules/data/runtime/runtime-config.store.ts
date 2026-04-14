import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { $axios } from "@/utils/api";
import { RuntimeConfigApiFactory, RuntimeConfigListResponse } from "@api-server";
import { useAppStore } from "@data-app";
import { createSharedComposable } from "@vueuse/core";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";

export type RuntimeConfig = Array<{ key: string; value: unknown }>;

export const useRuntimeConfigStore = defineStore("runtimeConfigStore", () => {
	const runtimeConfigApi = RuntimeConfigApiFactory(undefined, "/v3", $axios);

	const runtimeConfig = ref<RuntimeConfig>();

	const setRuntimeConfig = (envConfig: RuntimeConfigListResponse) => {
		const newValue = envConfig.data.map(({ key, value }) => ({ key, value }));
		runtimeConfig.value = newValue;
	};

	const loadRuntimeConfig = async () => {
		try {
			const runtimeConfigRes = await runtimeConfigApi.runtimeConfigControllerGetRuntimeConfig();
			setRuntimeConfig(runtimeConfigRes.data);

			return true;
		} catch {
			useAppStore().handleApplicationError(HttpStatusCode.GatewayTimeout);

			return false;
		}
	};

	loadRuntimeConfig();

	return {
		loadRuntimeConfig,
		runtimeConfig,
	};
});

export const useRuntimeConfig = createSharedComposable(() => {
	const { runtimeConfig } = storeToRefs(useRuntimeConfigStore());

	return runtimeConfig;
});
