import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";
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
import { authModule } from "@/store/store-accessor";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { ApplicationError } from "@/store/types/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import {
	MigrationLinkRequest,
	MigrationLinks,
	UserLoginMigration,
	UserLoginMigrationMapper,
} from "./user-login-migration";

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
	async fetchLatestUserLoginMigrationForCurrentUser(): Promise<void> {
		this.setLoading(true);

		if (authModule.getUser?.id) {
			try {
				const response: AxiosResponse<UserLoginMigrationSearchListResponse> =
					await this.userLoginMigrationApi.userLoginMigrationControllerGetMigrations(
						authModule.getUser.id
					);

				if (response.data.total !== 1) {
					throw createApplicationError(HttpStatusCode.BadRequest);
				}

				const userLoginMigrationResponse: UserLoginMigrationResponse =
					response.data.data[0];
				const userLoginMigration: UserLoginMigration =
					UserLoginMigrationMapper.mapToUserLoginMigration(
						userLoginMigrationResponse
					);

				this.setUserLoginMigration(userLoginMigration);
			} catch (error: unknown) {
				if (error instanceof ApplicationError) {
					throw error;
				} else {
					throw createApplicationError(HttpStatusCode.InternalServerError);
				}
			}
		}

		this.setLoading(false);
	}
}
