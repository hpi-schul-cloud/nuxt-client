import {
	UserLoginMigrationApiFactory,
	UserLoginMigrationApiInterface,
	UserLoginMigrationResponse,
	UserLoginMigrationSearchListResponse,
} from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { AxiosResponse, HttpStatusCode } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { BusinessError } from "./types/commons";
import {
	UserLoginMigration,
	UserLoginMigrationMapper,
} from "./user-login-migration";
import { useAuthStore } from "@data-auth";

@Module({
	name: "userLoginMigrationModule",
	namespaced: true,
	stateFactory: true,
})
export default class UserLoginMigrationModule extends VuexModule {
	private loading = false;

	private businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: undefined,
	};

	private userLoginMigration: UserLoginMigration | undefined;

	private get userLoginMigrationApi(): UserLoginMigrationApiInterface {
		return UserLoginMigrationApiFactory(undefined, "v3", $axios);
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setBusinessError(businessError: BusinessError): void {
		this.businessError = businessError;
	}

	@Mutation
	resetBusinessError(): void {
		this.businessError = {
			statusCode: "",
			message: "",
			error: undefined,
		};
	}

	@Mutation
	setUserLoginMigration(userLoginMigration?: UserLoginMigration): void {
		this.userLoginMigration = userLoginMigration;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getUserLoginMigration(): UserLoginMigration | undefined {
		return this.userLoginMigration;
	}

	get getBusinessError(): BusinessError {
		return this.businessError;
	}

	@Action
	async fetchLatestUserLoginMigrationForCurrentUser(): Promise<void> {
		this.setLoading(true);

		this.resetBusinessError();

		if (useAuthStore().user?.id) {
			try {
				const response: AxiosResponse<UserLoginMigrationSearchListResponse> =
					await this.userLoginMigrationApi.userLoginMigrationControllerGetMigrations(
						useAuthStore().user?.id
					);

				if (response.data.total > 1) {
					throw new Error("More than one migration found for user.");
				}

				if (response.data.data.length === 1) {
					const userLoginMigrationResponse: UserLoginMigrationResponse =
						response.data.data[0];

					const userLoginMigration: UserLoginMigration =
						UserLoginMigrationMapper.mapToUserLoginMigration(
							userLoginMigrationResponse
						);

					this.setUserLoginMigration(userLoginMigration);
				}
			} catch (error: unknown) {
				const apiError = mapAxiosErrorToResponseError(error);

				this.setBusinessError({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});

				throw createApplicationError(apiError.code);
			}
		}

		this.setLoading(false);
	}

	@Action
	async fetchLatestUserLoginMigrationForSchool(): Promise<void> {
		this.setLoading(true);

		this.resetBusinessError();

		const schoolId = useAuthStore().school?.id;
		if (schoolId) {
			try {
				const response: AxiosResponse<UserLoginMigrationResponse> =
					await this.userLoginMigrationApi.userLoginMigrationControllerFindUserLoginMigrationBySchool(
						schoolId
					);

				const userLoginMigration: UserLoginMigration =
					UserLoginMigrationMapper.mapToUserLoginMigration(response.data);

				this.setUserLoginMigration(userLoginMigration);
			} catch (error: unknown) {
				const apiError = mapAxiosErrorToResponseError(error);

				if (apiError.code === HttpStatusCode.NotFound) {
					this.setUserLoginMigration(undefined);
					return;
				}

				this.setBusinessError({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});

				throw createApplicationError(apiError.code);
			}
		}

		this.setLoading(false);
	}

	@Action
	async startUserLoginMigration(): Promise<void> {
		this.setLoading(true);

		this.resetBusinessError();

		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await this.userLoginMigrationApi.userLoginMigrationControllerStartMigration();

			const userLoginMigration: UserLoginMigration =
				UserLoginMigrationMapper.mapToUserLoginMigration(response.data);

			this.setUserLoginMigration(userLoginMigration);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});

			throw createApplicationError(apiError.code);
		}
		this.setLoading(false);
	}

	@Action
	async setUserLoginMigrationMandatory(mandatory: boolean): Promise<void> {
		this.setLoading(true);

		this.resetBusinessError();

		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await this.userLoginMigrationApi.userLoginMigrationControllerSetMigrationMandatory(
					{ mandatory }
				);

			const userLoginMigration: UserLoginMigration =
				UserLoginMigrationMapper.mapToUserLoginMigration(response.data);

			this.setUserLoginMigration(userLoginMigration);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});

			throw createApplicationError(apiError.code);
		}
		this.setLoading(false);
	}

	@Action
	async restartUserLoginMigration(): Promise<void> {
		this.setLoading(true);

		this.resetBusinessError();

		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await this.userLoginMigrationApi.userLoginMigrationControllerRestartMigration();

			const userLoginMigration: UserLoginMigration =
				UserLoginMigrationMapper.mapToUserLoginMigration(response.data);

			this.setUserLoginMigration(userLoginMigration);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});

			throw createApplicationError(apiError.code);
		}
		this.setLoading(false);
	}

	@Action
	async closeUserLoginMigration(): Promise<void> {
		this.setLoading(true);

		this.resetBusinessError();

		try {
			const response: AxiosResponse<UserLoginMigrationResponse> =
				await this.userLoginMigrationApi.userLoginMigrationControllerCloseMigration();

			if (response.data.closedAt) {
				const userLoginMigration: UserLoginMigration =
					UserLoginMigrationMapper.mapToUserLoginMigration(response.data);

				this.setUserLoginMigration(userLoginMigration);
			} else {
				this.setUserLoginMigration(undefined);
			}
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});

			throw createApplicationError(apiError.code);
		}
		this.setLoading(false);
	}
}
