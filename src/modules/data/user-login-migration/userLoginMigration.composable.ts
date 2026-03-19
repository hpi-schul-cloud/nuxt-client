import { BusinessError } from "@/store/types/commons";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { UserLoginMigration, UserLoginMigrationMapper } from "@/store/user-login-migration";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import {
	UserLoginMigrationApiFactory,
	UserLoginMigrationResponse,
	UserLoginMigrationSearchListResponse,
} from "@api-server";
import { useAppStore } from "@data-app";
import { AxiosResponse, HttpStatusCode as AxiosHttpStatusCode } from "axios";
import { Ref, ref } from "vue";

interface UserLoginMigrationApiResult<T> {
	data?: T;
	error?: BusinessError;
}

export const useUserLoginMigration = () => {
	const userLoginMigrationApi = UserLoginMigrationApiFactory(undefined, "v3", $axios);
	const userLoginMigration: Ref<UserLoginMigration | undefined> = ref(undefined);
	const isLoading: Ref<boolean> = ref(false);
	const businessError: Ref<BusinessError> = ref({
		statusCode: "",
		message: "",
		error: undefined,
	});

	const { handleApplicationError } = useAppStore();

	const createBusinessError = (error: unknown): BusinessError => {
		const apiError = mapAxiosErrorToResponseError(error);
		return {
			error: apiError,
			statusCode: apiError.code,
			message: apiError.message,
		};
	};

	const resetBusinessError = (): void => {
		businessError.value = {
			statusCode: "",
			message: "",
			error: undefined,
		};
	};

	const fetchLatestUserLoginMigrationForCurrentUserApi = async (
		userId: string
	): Promise<UserLoginMigrationApiResult<UserLoginMigration>> => {
		try {
			const response: AxiosResponse<UserLoginMigrationSearchListResponse> =
				await userLoginMigrationApi.userLoginMigrationControllerGetMigrations(userId);

			if (response.data.total > 1) {
				throw new Error("More than one migration found for user.");
			}

			if (response.data.data.length === 1) {
				const userLoginMigrationResponse: UserLoginMigrationResponse = response.data.data[0];
				return { data: UserLoginMigrationMapper.mapToUserLoginMigration(userLoginMigrationResponse) };
			}

			return { data: undefined };
		} catch (error) {
			return { error: createBusinessError(error) };
		}
	};

	const fetchLatestUserLoginMigrationForSchoolApi = async (
		schoolId: string
	): Promise<UserLoginMigrationApiResult<UserLoginMigration>> => {
		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await userLoginMigrationApi.userLoginMigrationControllerFindUserLoginMigrationBySchool(schoolId);

			return { data: UserLoginMigrationMapper.mapToUserLoginMigration(response.data) };
		} catch (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			if (apiError.code === AxiosHttpStatusCode.NotFound) {
				return { data: undefined };
			}
			return { error: createBusinessError(error) };
		}
	};

	const startUserLoginMigrationApi = async (): Promise<UserLoginMigrationApiResult<UserLoginMigration>> => {
		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await userLoginMigrationApi.userLoginMigrationControllerStartMigration();

			return { data: UserLoginMigrationMapper.mapToUserLoginMigration(response.data) };
		} catch (error) {
			return { error: createBusinessError(error) };
		}
	};

	const setUserLoginMigrationMandatoryApi = async (
		mandatory: boolean
	): Promise<UserLoginMigrationApiResult<UserLoginMigration>> => {
		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await userLoginMigrationApi.userLoginMigrationControllerSetMigrationMandatory({ mandatory });

			return { data: UserLoginMigrationMapper.mapToUserLoginMigration(response.data) };
		} catch (error) {
			return { error: createBusinessError(error) };
		}
	};

	const restartUserLoginMigrationApi = async (): Promise<UserLoginMigrationApiResult<UserLoginMigration>> => {
		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await userLoginMigrationApi.userLoginMigrationControllerRestartMigration();

			return { data: UserLoginMigrationMapper.mapToUserLoginMigration(response.data) };
		} catch (error) {
			return { error: createBusinessError(error) };
		}
	};

	const closeUserLoginMigrationApi = async (): Promise<UserLoginMigrationApiResult<UserLoginMigration>> => {
		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await userLoginMigrationApi.userLoginMigrationControllerCloseMigration();

			if (response.data.closedAt) {
				return { data: UserLoginMigrationMapper.mapToUserLoginMigration(response.data) };
			}

			return { data: undefined };
		} catch (error) {
			return { error: createBusinessError(error) };
		}
	};

	const fetchLatestUserLoginMigrationForCurrentUser = async (): Promise<void> => {
		isLoading.value = true;
		resetBusinessError();

		const userId = useAppStore().user?.id;
		if (userId) {
			const result = await fetchLatestUserLoginMigrationForCurrentUserApi(userId);

			if (result.error) {
				businessError.value = result.error;
				isLoading.value = false;
				handleApplicationError(result.error.statusCode as HttpStatusCode);
				return;
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
			const result = await fetchLatestUserLoginMigrationForSchoolApi(schoolId);

			if (result.error) {
				businessError.value = result.error;
				isLoading.value = false;
				handleApplicationError(result.error.statusCode as HttpStatusCode);
				return;
			}

			userLoginMigration.value = result.data;
		}

		isLoading.value = false;
	};

	const startUserLoginMigration = async (): Promise<void> => {
		isLoading.value = true;
		resetBusinessError();

		const result = await startUserLoginMigrationApi();

		if (result.error) {
			businessError.value = result.error;
			isLoading.value = false;
			handleApplicationError(result.error.statusCode as HttpStatusCode);
			return;
		}

		userLoginMigration.value = result.data;
		isLoading.value = false;
	};

	const setUserLoginMigrationMandatory = async (mandatory: boolean): Promise<void> => {
		isLoading.value = true;
		resetBusinessError();

		const result = await setUserLoginMigrationMandatoryApi(mandatory);

		if (result.error) {
			businessError.value = result.error;
			isLoading.value = false;
			handleApplicationError(result.error.statusCode as HttpStatusCode);
			return;
		}

		userLoginMigration.value = result.data;
		isLoading.value = false;
	};

	const restartUserLoginMigration = async (): Promise<void> => {
		isLoading.value = true;
		resetBusinessError();

		const result = await restartUserLoginMigrationApi();

		if (result.error) {
			businessError.value = result.error;
			isLoading.value = false;
			handleApplicationError(result.error.statusCode as HttpStatusCode);
			return;
		}

		userLoginMigration.value = result.data;
		isLoading.value = false;
	};

	const closeUserLoginMigration = async (): Promise<void> => {
		isLoading.value = true;
		resetBusinessError();

		const result = await closeUserLoginMigrationApi();

		if (result.error) {
			businessError.value = result.error;
			isLoading.value = false;
			handleApplicationError(result.error.statusCode as HttpStatusCode);
			return;
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
