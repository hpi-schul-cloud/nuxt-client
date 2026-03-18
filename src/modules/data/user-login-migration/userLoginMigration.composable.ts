import { useUserLoginMigrationApi } from "./userLoginMigrationApi.composable";
import { BusinessError } from "@/store/types/commons";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { UserLoginMigration } from "@/store/user-login-migration";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { useAppStore } from "@data-app";
import { Ref, ref } from "vue";

export const useUserLoginMigration = () => {
	const userLoginMigrationApi = useUserLoginMigrationApi();

	const userLoginMigration: Ref<UserLoginMigration | undefined> = ref(undefined);
	const isLoading: Ref<boolean> = ref(false);
	const businessError: Ref<BusinessError> = ref({
		statusCode: "",
		message: "",
		error: undefined,
	});

	const resetBusinessError = (): void => {
		businessError.value = {
			statusCode: "",
			message: "",
			error: undefined,
		};
	};

	const fetchLatestUserLoginMigrationForCurrentUser = async (): Promise<void> => {
		isLoading.value = true;
		resetBusinessError();

		const userId = useAppStore().user?.id;
		if (userId) {
			const result = await userLoginMigrationApi.fetchLatestUserLoginMigrationForCurrentUser(userId);

			if (result.error) {
				businessError.value = result.error;
				isLoading.value = false;
				throw createApplicationError(result.error.statusCode as HttpStatusCode);
			}

			userLoginMigration.value = result.data;
		}

		isLoading.value = false;
	};

	const fetchLatestUserLoginMigrationForSchool = async (): Promise<void> => {
		isLoading.value = true;
		resetBusinessError();

		const schoolId = useAppStore().school?.id;
		if (schoolId) {
			const result = await userLoginMigrationApi.fetchLatestUserLoginMigrationForSchool(schoolId);

			if (result.error) {
				businessError.value = result.error;
				isLoading.value = false;
				throw createApplicationError(result.error.statusCode as HttpStatusCode);
			}

			userLoginMigration.value = result.data;
		}

		isLoading.value = false;
	};

	const startUserLoginMigration = async (): Promise<void> => {
		isLoading.value = true;
		resetBusinessError();

		const result = await userLoginMigrationApi.startUserLoginMigration();

		if (result.error) {
			businessError.value = result.error;
			isLoading.value = false;
			throw createApplicationError(result.error.statusCode as HttpStatusCode);
		}

		userLoginMigration.value = result.data;
		isLoading.value = false;
	};

	const setUserLoginMigrationMandatory = async (mandatory: boolean): Promise<void> => {
		isLoading.value = true;
		resetBusinessError();

		const result = await userLoginMigrationApi.setUserLoginMigrationMandatory(mandatory);

		if (result.error) {
			businessError.value = result.error;
			isLoading.value = false;
			throw createApplicationError(result.error.statusCode as HttpStatusCode);
		}

		userLoginMigration.value = result.data;
		isLoading.value = false;
	};

	const restartUserLoginMigration = async (): Promise<void> => {
		isLoading.value = true;
		resetBusinessError();

		const result = await userLoginMigrationApi.restartUserLoginMigration();

		if (result.error) {
			businessError.value = result.error;
			isLoading.value = false;
			throw createApplicationError(result.error.statusCode as HttpStatusCode);
		}

		userLoginMigration.value = result.data;
		isLoading.value = false;
	};

	const closeUserLoginMigration = async (): Promise<void> => {
		isLoading.value = true;
		resetBusinessError();

		const result = await userLoginMigrationApi.closeUserLoginMigration();

		if (result.error) {
			businessError.value = result.error;
			isLoading.value = false;
			throw createApplicationError(result.error.statusCode as HttpStatusCode);
		}

		userLoginMigration.value = result.data;
		isLoading.value = false;
	};

	return {
		userLoginMigration,
		isLoading,
		businessError,
		resetBusinessError,
		fetchLatestUserLoginMigrationForCurrentUser,
		fetchLatestUserLoginMigrationForSchool,
		startUserLoginMigration,
		setUserLoginMigrationMandatory,
		restartUserLoginMigration,
		closeUserLoginMigration,
	};
};
