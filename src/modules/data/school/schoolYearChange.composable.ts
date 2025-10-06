import { useSchoolApi } from "./schoolApi.composable";
import { MaintenanceStatus } from "./types";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { notifyError, notifySuccess } from "@data-app";
import { createSharedComposable } from "@vueuse/core";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useSchoolYearChange = () => {
	const { fetchMaintenanceStatus, setMaintenance } = useSchoolApi();

	const { t } = useI18n();
	const maintenanceStatus: Ref<MaintenanceStatus | undefined> = ref();
	const isLoading: Ref<boolean> = ref(false);

	const fetchSchoolYearStatus = async (schoolId: string): Promise<void> => {
		isLoading.value = true;

		try {
			maintenanceStatus.value = await fetchMaintenanceStatus(schoolId);
		} catch {
			notifyError(t("error.generic"));
		}

		isLoading.value = false;
	};

	const setMaintenanceMode = async (schoolId: string, maintenance: boolean): Promise<void> => {
		isLoading.value = true;

		try {
			maintenanceStatus.value = await setMaintenance(schoolId, maintenance);

			if (maintenance) {
				notifySuccess(t("components.administration.schoolYearChangeSection.notification.start.success"));
			} else {
				notifySuccess(t("components.administration.schoolYearChangeSection.notification.finish.success"));
			}
		} catch (axiosError: unknown) {
			const apiError = mapAxiosErrorToResponseError(axiosError);

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
				notifyError("error.generic");
			}
		}

		isLoading.value = false;
	};

	return {
		isLoading,
		fetchSchoolYearStatus,
		setMaintenanceMode,
		maintenanceStatus,
	};
};

export const useSharedSchoolYearChange = createSharedComposable(useSchoolYearChange);
