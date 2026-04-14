import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { $axios } from "@/utils/api";
import { RuntimeConfigApiFactory, RuntimeConfigListResponse } from "@api-server";
import { useAppStore } from "@data-app";
import { defineStore } from "pinia";
import { readonly, ref } from "vue";

export type RuntimeConfig = Record<string, { value: string | boolean | number; description: string; type: string }>;

export const useRuntimeConfigStore = defineStore("runtimeConfigStore", () => {
	const runtimeConfigApi = RuntimeConfigApiFactory(undefined, "/v3", $axios);
	const runtimeConfig = ref<RuntimeConfig>({});

	const setRuntimeConfig = (config: RuntimeConfigListResponse) => {
		runtimeConfig.value = Object.fromEntries(
			config.data.map(({ key, value, description, type }) => [
				key,
				{
					value:
						typeof value === "string" || typeof value === "number" || typeof value === "boolean"
							? value
							: String(value),
					description: description ?? "",
					type: String(type),
				},
			])
		);
	};

	// const parseRuntimeConfig = (entries: RuntimeConfig[]): RuntimeConfig =>
	// 	Object.fromEntries(entries.map(({ key, value, description, type }) => [key, { value, description, type }]));

	const fetchRuntimeConfig = async () => {
		try {
			const runtimeConfigRes = await runtimeConfigApi.runtimeConfigControllerGetRuntimeConfig();

			setRuntimeConfig(runtimeConfigRes.data);
		} catch {
			useAppStore().handleApplicationError(HttpStatusCode.GatewayTimeout);
		}
	};

	// type RuntimeConfigAsObject = Record<string, string | boolean>;

	// const parseRuntimeConfig = (entries: RuntimeConfigAsObject[]): RuntimeConfigAsObject =>
	// 	Object.fromEntries(entries.map(({ key, value }) => [key, value]));

	// const dashboardAnnouncement = computed((): string | undefined => {
	// 	const runtimeConfigEntries = useRuntimeConfigStore().runtimeConfig as RuntimeConfigAsObject[] | undefined;

	// 	if (!runtimeConfigEntries) {
	// 		return undefined;
	// 	}

	// 	const config = parseRuntimeConfig(runtimeConfigEntries);

	// 	if (!config.DASHBOARD_ANNOUNCEMENT_ENABLED) {
	// 		return undefined;
	// 	}

	// 	const userRoles = useAppStore().userRoles;
	// 	const rolesForAnnouncement = String(config.DASHBOARD_ANNOUNCEMENT_FOR_ROLES).split(",");
	// 	const hasMatchingRole = userRoles.some((role) => rolesForAnnouncement.includes(role));

	// 	if (!hasMatchingRole) {
	// 		return undefined;
	// 	}

	// 	const { locale } = useI18nGlobal();
	// 	const langKey = `DASHBOARD_ANNOUNCEMENT_TEXT_${locale.value.toUpperCase()}`;

	// 	return config[langKey] as string | undefined;
	// });

	return {
		// dashboardAnnouncement: dashboardAnnouncement,
		fetchRuntimeConfig,
		runtimeConfig: readonly(runtimeConfig),
	};
});
