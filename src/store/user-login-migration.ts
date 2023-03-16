import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	PageContentResponse,
	UserMigrationApiFactory,
	UserMigrationApiInterface,
} from "@/serverApi/v3";
import {
	MigrationLinkRequest,
	MigrationLinks,
} from "./types/user-login-migration";

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

	private get userMigrationApi(): UserMigrationApiInterface {
		return UserMigrationApiFactory(undefined, "v3", $axios);
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

	get getLoading(): boolean {
		return this.loading;
	}

	get getMigrationLinks(): MigrationLinks {
		return this.migrationLinks;
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
}
