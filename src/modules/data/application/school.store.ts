import { useAppStore } from "./application.store";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { mapFeaturesToFeaturesObject } from "@/utils/school-features";
import {
	SchoolApiFactory,
	SchoolFeature,
	SchoolResponse,
	SchoolSystemResponse,
	SchoolUpdateBodyParams,
	SchulcloudTheme,
	SchulConneXProvisioningOptionsParams,
} from "@api-server";
import { useEnvConfig } from "@data-env";
import { MaintenanceStatus } from "@data-school";
import { defineStore, storeToRefs } from "pinia";
import { computed, Ref, ref } from "vue";

export const useSchoolStore = defineStore("schoolStore", () => {
	const schoolApi = SchoolApiFactory(undefined, "/v3", $axios);
	const { t } = useI18nGlobal();
	const { execute: executeSchoolApi, isRunning: isLoadingSchoolData, error: schoolApiError } = useSafeAxiosTask();
	const {
		execute: executeMaintenanceApi,
		isRunning: isLoadingMaintenanceData,
		error: maintenanceError,
	} = useSafeAxiosTask();

	// Treated as never undefined. Currently secured by order execution in application-store login() function.
	// Should be treated differently tho. The app does not work without school details.
	const schoolDetails = ref<SchoolResponse>(undefined!);
	const schoolSystems = ref<SchoolSystemResponse[]>([]);
	const schoolMaintenanceStatus: Ref<MaintenanceStatus | undefined> = ref();

	// Getters
	const schoolFeatures = computed(() => new Set(schoolDetails.value?.features));
	const schoolFeatureObject = computed(() => mapFeaturesToFeaturesObject(schoolDetails.value.features));
	const currentYear = computed(() => schoolDetails.value.currentYear);
	const isSchoolExternallyManaged = computed(() => {
		const isThr = useEnvConfig().value.SC_THEME === SchulcloudTheme.THR;
		return schoolDetails.value.isExternal || isThr;
	});

	/**
	 * Determines whether the school is connected to an external identity system.
	 *
	 * Three system types count as "synced":
	 *  - "tsp-school": TSP school sync (no provider distinction needed)
	 *  - "oauth":      OAuth-based login (e.g. provider: "moin.schule")
	 *  - "ldap":       LDAP-based login — but ONLY for specific providers,
	 *                  since not every LDAP setup implies a managed/synced school.
	 */
	const isSchoolSynced = computed(() =>
		schoolSystems.value.some(
			(system) =>
				system.type === "tsp-school" ||
				system.type === "oauth" ||
				// LDAP is only treated as "synced" for providers that represent
				// a fully managed identity source. Other LDAP setups may exist
				// without implying school-level sync.
				(system.type === "ldap" &&
					(system.ldapConfig?.provider === "iserv-idm" ||
						system.ldapConfig?.provider === "univention" ||
						system.ldapConfig?.provider === "general"))
		)
	);

	// Helpers/Utils
	const hasFeature = (feature: SchoolFeature) => schoolFeatures.value.has(feature);

	// Actions
	const fetchSchoolDetails = async () => {
		const { result, success, error } = await executeSchoolApi(
			() => schoolApi.schoolControllerGetSchoolById(useAppStore().school?.id as string),
			t("pages.administration.school.index.error")
		);
		if (success) {
			schoolDetails.value = result?.data;
		}
		return { result, success, error };
	};

	const fetchSchoolSystems = async (schoolId: string) => {
		const { result, success, error } = await executeSchoolApi(
			() => schoolApi.schoolControllerGetSchoolSystems(schoolId),
			t("pages.administration.school.index.error")
		);
		if (success) {
			schoolSystems.value = result.data;
		}
		return { result, success, error };
	};

	const deleteSchoolSystem = async (systemId: string) => {
		const { success } = await executeSchoolApi(
			() => schoolApi.schoolControllerRemoveSystemFromSchool(schoolDetails.value.id, systemId),
			t("pages.administration.school.index.error")
		);

		if (success) {
			await Promise.all([fetchSchoolDetails(), fetchSchoolSystems(schoolDetails.value.id)]);
		}
	};

	const fetchProvisioningOptions = (systemId: string) =>
		executeSchoolApi(
			() => schoolApi.schoolControllerGetProvisioningOptions(schoolDetails.value.id, systemId),
			t("error.load")
		);

	const setProvisioningOptions = (systemId: string, provisioningOptions: SchulConneXProvisioningOptionsParams) =>
		executeSchoolApi(
			() => schoolApi.schoolControllerSetProvisioningOptions(schoolDetails.value.id, systemId, provisioningOptions),
			t("error.generic")
		);

	const fetchMaintenanceStatus = async (schoolId: string) => {
		const { success, result } = await executeMaintenanceApi(
			() => schoolApi.schoolControllerGetMaintenanceStatus(schoolId),
			t("error.generic")
		);
		if (success) schoolMaintenanceStatus.value = result?.data;
	};

	const setMaintenanceStatus = async (schoolId: string, maintenance: boolean) =>
		await executeMaintenanceApi(
			() => schoolApi.schoolControllerSetMaintenanceStatus(schoolId, { maintenance }),
			t("error.generic")
		);

	const updateSchool = async (schoolId: string, schoolProps: SchoolUpdateBodyParams) => {
		const { result, success } = await executeSchoolApi(
			() => schoolApi.schoolControllerUpdateSchool(schoolId, schoolProps),
			t("pages.administration.school.index.error")
		);
		if (success) {
			schoolDetails.value = result?.data;
		}
		return { result, success };
	};

	return {
		schoolDetails,
		schoolFeatures,
		schoolFeatureObject,
		schoolSystems,
		schoolMaintenanceStatus,
		currentYear,
		isSchoolExternallyManaged,
		isSchoolSynced,
		isLoadingSchoolData,
		isLoadingMaintenanceData,
		schoolApiError,
		maintenanceError,
		hasFeature,
		fetchSchoolDetails,
		fetchSchoolSystems,
		fetchMaintenanceStatus,
		fetchProvisioningOptions,
		setProvisioningOptions,
		setMaintenanceStatus,
		deleteSchoolSystem,
		updateSchool,
	};
});

export const useSchoolStoreRefs = () => storeToRefs(useSchoolStore());
