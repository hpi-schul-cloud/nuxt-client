import { MaintenanceStatus } from "./types";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { notifyError, notifySuccess, useSchoolStore } from "@data-app";
import { createSharedComposable } from "@vueuse/core";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useSchoolYearChange = () => {
	const { fetchMaintenanceStatus, setMaintenanceStatus, isLoadingMaintenanceData } = useSchoolStore();

	const { t } = useI18n();
	const maintenanceStatus: Ref<MaintenanceStatus | undefined> = ref();

	const fetchSchoolYearStatus = async (schoolId: string) => {
		const { success, result } = await fetchMaintenanceStatus(schoolId);
		if (success) maintenanceStatus.value = result?.data;
	};

	const setMaintenanceMode = async (schoolId: string, isInMaintenance: boolean) => {
		const { success, result, error } = await setMaintenanceStatus(schoolId, isInMaintenance);

		if (success) {
			maintenanceStatus.value = result?.data;
			if (isInMaintenance) {
				notifySuccess(t("components.administration.schoolYearChangeSection.notification.start.success"));
			} else {
				notifySuccess(t("components.administration.schoolYearChangeSection.notification.finish.success"));
			}
		} else {
			const apiError = mapAxiosErrorToResponseError(error);
			if (apiError.type === "MISSING_YEARS") {
				notifyError(
					t("components.administration.schoolYearChangeSection.notification.finish.error.missingYears"),
					false
				); // TODO: PR: why is that one not auto closing?
			} else if (apiError.type === "SCHOOL_ALREADY_IN_NEXT_YEAR") {
				notifyError(t("components.administration.schoolYearChangeSection.notification.finish.error.alreadyInNextYear"));
				if (maintenanceStatus.value) {
					maintenanceStatus.value.maintenance.active = false;
					maintenanceStatus.value.maintenance.startDate = undefined;
					maintenanceStatus.value.currentYear = maintenanceStatus.value.nextYear;
				}
			} else {
				notifyError(t("error.generic"));
			}
		}
	};

	return {
		isLoadingMaintenanceData,
		fetchSchoolYearStatus,
		setMaintenanceMode,
		maintenanceStatus,
	};
};

export const useSharedSchoolYearChange = createSharedComposable(useSchoolYearChange);
