import { ref, Ref } from "vue";
import { BusinessError } from "../../../store/types/commons";
import { mapAxiosErrorToResponseError } from "../../../utils/api";
import { useSchoolApi } from "./SchoolApi.composable";
import { MaintenanceStatus } from "./types";

export const useSchoolYearChange = () => {
	const { fetchMaintenanceStatus, setMaintenance, startLDAP } = useSchoolApi();

	const maintenanceStatus: Ref<MaintenanceStatus | undefined> = ref();
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();

	const fetchSchoolYearStatus = async (
		schoolId: string
	): Promise<MaintenanceStatus | undefined> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			const schoolYearStatus: MaintenanceStatus =
				await fetchMaintenanceStatus(schoolId);

			console.log(schoolYearStatus);
			console.log(schoolYearStatus);
			maintenanceStatus.value = schoolYearStatus;

			return schoolYearStatus;
		} catch (axiosError: unknown) {
			const apiError = mapAxiosErrorToResponseError(axiosError);

			error.value = {
				error: apiError,
				message: apiError.message,
				statusCode: apiError.code,
			};
		}

		isLoading.value = false;
	};

	const setMaintenanceMode = async (
		schoolId: string,
		maintenance: boolean
	): Promise<MaintenanceStatus | undefined> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			const schoolYearStatus: MaintenanceStatus = await setMaintenance(
				schoolId,
				maintenance
			);

			maintenanceStatus.value = schoolYearStatus;

			return schoolYearStatus;
		} catch (axiosError: unknown) {
			const apiError = mapAxiosErrorToResponseError(axiosError);

			error.value = {
				error: apiError,
				message: apiError.message,
				statusCode: apiError.code,
			};
		}

		isLoading.value = false;
	};

	const useLdapStart = async (
		schoolId: string,
		maintenance: boolean
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			await startLDAP();

			//maintenanceStatus.value = schoolYearStatus;

			//return schoolYearStatus;
		} catch (axiosError: unknown) {
			const apiError = mapAxiosErrorToResponseError(axiosError);

			error.value = {
				error: apiError,
				message: apiError.message,
				statusCode: apiError.code,
			};
		}

		isLoading.value = false;
	};

	return {
		isLoading,
		error,
		fetchSchoolYearStatus,
		setMaintenanceMode,
		maintenanceStatus,
		useLdapStart,
	};
};
