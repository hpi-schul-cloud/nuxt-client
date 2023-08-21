import { $axios } from "@/utils/api";
import { AxiosError, AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	PageContentResponse,
	UserLoginMigrationApiFactory,
	UserLoginMigrationApiInterface,
	UserLoginMigrationResponse,
	UserLoginMigrationSearchListResponse,
	UserMigrationApiFactory,
	UserMigrationApiInterface,
} from "@/serverApi/v3";
import {
	MigrationLinkRequest,
	MigrationLinks,
	UserLoginMigration,
} from "./types/user-login-migration";
import { authModule } from "@/store/store-accessor";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { ApplicationError } from "@/store/types/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

@Module({
	name: "userLoginMigrationModule",
	namespaced: true,
	stateFactory: true,
})
export default class UserLoginMigrationModule extends VuexModule {
	private migrationLinks: MigrationLinks = {
		proceedLink: "",
		cancelLink: "",
	};
	private loading = false;

	private error: object | null = null;

	private userLoginMigration: UserLoginMigration = {
		sourceSystemId: undefined,
		targetSystemId: "",
		startedAt: "",
		closedAt: undefined,
		finishedAt: undefined,
		mandatorySince: undefined,
	};

	private get userMigrationApi(): UserMigrationApiInterface {
		return UserMigrationApiFactory(undefined, "v3", $axios);
	}

	private get userLoginMigrationApi(): UserLoginMigrationApiInterface {
		return UserLoginMigrationApiFactory(undefined, "v3", $axios);
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setMigrationLinks(migrationLinks: MigrationLinks): void {
		this.migrationLinks = migrationLinks;
	}

	@Mutation
	setError(error: object | null): void {
		this.error = error;
	}

	@Mutation
	setUserLoginMigration(userLoginMigration: UserLoginMigration): void {
		this.userLoginMigration = userLoginMigration;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getMigrationLinks(): MigrationLinks {
		return this.migrationLinks;
	}

	get getUserLoginMigration(): UserLoginMigration {
		return this.userLoginMigration;
	}

	get getError(): object | null {
		return this.error;
	}

	@Action
	async fetchMigrationLinks(request: MigrationLinkRequest): Promise<void> {
		this.setLoading(true);
		try {
			const links: AxiosResponse<PageContentResponse> =
				await this.userMigrationApi.userMigrationControllerGetMigrationPageDetails(
					request.pageType,
					request.sourceSystem,
					request.targetSystem
				);

			const mappedLinks: MigrationLinks = {
				proceedLink: links.data.proceedButtonUrl,
				cancelLink: links.data.cancelButtonUrl,
			};
			this.setMigrationLinks(mappedLinks);
		} catch (error) {
			this.setError(error as Error);
		}
		this.setLoading(false);
	}

	@Action
	async getLatestUserLoginMigrationForCurrentUser(): Promise<void> {
		this.setLoading(true);

		if (authModule.getUser) {
			try {
				const response: AxiosResponse<UserLoginMigrationSearchListResponse> =
					await this.userLoginMigrationApi.userLoginMigrationControllerGetMigrations(
						authModule.getUser.id
					);

				if (response.data.total < 1) {
					throw createApplicationError(HttpStatusCode.BadRequest);
				}

				const userLoginMigrationResponse: UserLoginMigrationResponse =
					response.data.data[0];
				const userLoginMigration: UserLoginMigration = {
					sourceSystemId: userLoginMigrationResponse.sourceSystemId,
					targetSystemId: userLoginMigrationResponse.targetSystemId,
					startedAt: userLoginMigrationResponse.startedAt,
					closedAt: userLoginMigrationResponse.closedAt,
					finishedAt: userLoginMigrationResponse.finishedAt,
					mandatorySince: userLoginMigrationResponse.mandatorySince,
				};

				this.setUserLoginMigration(userLoginMigration);
			} catch (error) {
				if (error instanceof ApplicationError) {
					throw error;
				} else if (error instanceof AxiosError) {
					throw createApplicationError(
						error.response?.status ?? HttpStatusCode.InternalServerError
					);
				} else {
					throw createApplicationError(HttpStatusCode.InternalServerError);
				}
			}
		}

		this.setLoading(false);
	}
}
