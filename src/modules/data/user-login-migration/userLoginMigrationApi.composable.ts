import { BusinessError } from "@/store/types/commons";
import { UserLoginMigration, UserLoginMigrationMapper } from "@/store/user-login-migration";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import {
	UserLoginMigrationApiFactory,
	UserLoginMigrationResponse,
	UserLoginMigrationSearchListResponse,
} from "@api-server";
import { AxiosResponse, HttpStatusCode } from "axios";

export interface UserLoginMigrationApiResult<T> {
	data?: T;
	error?: BusinessError;
}

export const useUserLoginMigrationApi = () => {
	const userLoginMigrationApi = UserLoginMigrationApiFactory(undefined, "v3", $axios);

	const createBusinessError = (error: unknown): BusinessError => {
		const apiError = mapAxiosErrorToResponseError(error);
		return {
			error: apiError,
			statusCode: apiError.code,
			message: apiError.message,
		};
	};

	const fetchLatestUserLoginMigrationForCurrentUser = async (
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

	const fetchLatestUserLoginMigrationForSchool = async (
		schoolId: string
	): Promise<UserLoginMigrationApiResult<UserLoginMigration>> => {
		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await userLoginMigrationApi.userLoginMigrationControllerFindUserLoginMigrationBySchool(schoolId);

			return { data: UserLoginMigrationMapper.mapToUserLoginMigration(response.data) };
		} catch (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			if (apiError.code === HttpStatusCode.NotFound) {
				return { data: undefined };
			}
			return { error: createBusinessError(error) };
		}
	};

	const startUserLoginMigration = async (): Promise<UserLoginMigrationApiResult<UserLoginMigration>> => {
		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await userLoginMigrationApi.userLoginMigrationControllerStartMigration();

			return { data: UserLoginMigrationMapper.mapToUserLoginMigration(response.data) };
		} catch (error) {
			return { error: createBusinessError(error) };
		}
	};

	const setUserLoginMigrationMandatory = async (
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

	const restartUserLoginMigration = async (): Promise<UserLoginMigrationApiResult<UserLoginMigration>> => {
		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await userLoginMigrationApi.userLoginMigrationControllerRestartMigration();

			return { data: UserLoginMigrationMapper.mapToUserLoginMigration(response.data) };
		} catch (error) {
			return { error: createBusinessError(error) };
		}
	};

	const closeUserLoginMigration = async (): Promise<UserLoginMigrationApiResult<UserLoginMigration>> => {
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

	return {
		fetchLatestUserLoginMigrationForCurrentUser,
		fetchLatestUserLoginMigrationForSchool,
		startUserLoginMigration,
		setUserLoginMigrationMandatory,
		restartUserLoginMigration,
		closeUserLoginMigration,
	};
};
