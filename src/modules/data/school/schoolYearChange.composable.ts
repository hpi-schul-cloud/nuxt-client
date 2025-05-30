import NotifierModule from "@/store/notifier";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createSharedComposable } from "@vueuse/core";
import { ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useSchoolApi } from "./schoolApi.composable";
import { MaintenanceStatus } from "./types";

export const useSchoolYearChange = () => {
	const { fetchMaintenanceStatus, setMaintenance } = useSchoolApi();
	const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);

	const { t } = useI18n();
	const maintenanceStatus: Ref<MaintenanceStatus | undefined> = ref();
	const isLoading: Ref<boolean> = ref(false);

	const fetchSchoolYearStatus = async (schoolId: string): Promise<void> => {
		isLoading.value = true;

		try {
			maintenanceStatus.value = await fetchMaintenanceStatus(schoolId);
		} catch {
			notifierModule.show({
				text: t("error.generic"),
				status: "error",
			});
		}

		isLoading.value = false;
	};

	const setMaintenanceMode = async (
		schoolId: string,
		maintenance: boolean
	): Promise<void> => {
		isLoading.value = true;

		try {
			maintenanceStatus.value = await setMaintenance(schoolId, maintenance);

			if (maintenance) {
				notifierModule.show({
					text: t(
						"components.administration.schoolYearChangeSection.notification.start.success"
					),
					status: "success",
				});
			} else {
				notifierModule.show({
					text: t(
						"components.administration.schoolYearChangeSection.notification.finish.success"
					),
					status: "success",
				});
			}
		} catch (axiosError: unknown) {
			const apiError = mapAxiosErrorToResponseError(axiosError);

			if (apiError.type === "MISSING_YEARS") {
				notifierModule.show({
					text: t(
						"components.administration.schoolYearChangeSection.notification.finish.error.missingYears"
					),
					status: "error",
					autoClose: false,
				});
			} else if (apiError.type === "SCHOOL_ALREADY_IN_NEXT_YEAR") {
				notifierModule.show({
					text: t(
						"components.administration.schoolYearChangeSection.notification.finish.error.alreadyInNextYear"
					),
					status: "error",
				});
				if (maintenanceStatus.value) {
					maintenanceStatus.value.maintenance.active = false;
					maintenanceStatus.value.maintenance.startDate = undefined;
					maintenanceStatus.value.currentYear =
						maintenanceStatus.value.nextYear;
				}
			} else {
				notifierModule.show({
					text: t("error.generic"),
					status: "error",
				});
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

export const useSharedSchoolYearChange =
	createSharedComposable(useSchoolYearChange);
