import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import {
	SchoolApiFactory,
	SchoolFeature,
	SchoolResponse,
	SchoolSystemResponse,
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
	const currentYear = computed(() => schoolDetails.value.currentYear);
	const isSchoolExternallyManaged = computed(() => {
		const isThr = useEnvConfig().value.SC_THEME === SchulcloudTheme.THR;
		return schoolDetails.value.isExternal || isThr;
	});

	// Helpers/Utils
	const hasFeature = (feature: SchoolFeature) => schoolFeatures.value.has(feature);

	// Actions
	const fetchSchoolDetails = async (schoolId: string) => {
		const { result, success, error } = await executeSchoolApi(
			() => schoolApi.schoolControllerGetSchoolById(schoolId),
			"pages.administration.school.index.error"
		);
		if (success) {
			schoolDetails.value = result?.data;
		}
		return { result, success, error };
	};

	const fetchSchoolSystems = async (schoolId: string) => {
		const { result, success, error } = await executeSchoolApi(
			() => schoolApi.schoolControllerGetSchoolSystems(schoolId),
			"pages.administration.school.index.error"
		);
		if (success) {
			schoolSystems.value = result.data;
		}
		return { result, success, error };
	};

	const deleteSchoolSystem = async (systemId: string) => {
		const { success } = await executeSchoolApi(
			() => schoolApi.schoolControllerRemoveSystemFromSchool(schoolDetails.value.id, systemId),
			"pages.administration.school.index.error"
		);

		if (success) {
			await Promise.all([fetchSchoolDetails(schoolDetails.value.id), fetchSchoolSystems(schoolDetails.value.id)]);
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

	return {
		schoolDetails,
		schoolFeatures,
		schoolSystems,
		schoolMaintenanceStatus,
		currentYear,
		isSchoolExternallyManaged,
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
	};
});

export const useSchoolStoreRefs = () => storeToRefs(useSchoolStore());
