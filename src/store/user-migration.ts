import { $axios } from "@utils/api";
import { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	PageContentResponse,
	UserMigrationApiFactory,
	UserMigrationApiInterface,
} from "@/serverApi/v3";
import { MigrationLinkRequest, MigrationLinks } from "./types/user-migration";

@Module({
	name: "user-migration",
	namespaced: true,
	stateFactory: true,
})
export default class UserMigrationModule extends VuexModule {
	private migrationLinks: MigrationLinks = {
		proceedLink: "",
		cancelLink: "",
	};
	private loading: boolean = false;

	private _userMigrationApi?: UserMigrationApiInterface;

	private get userMigrationApi(): UserMigrationApiInterface {
		if (!this._userMigrationApi) {
			this._userMigrationApi = UserMigrationApiFactory(undefined, "v3", $axios);
		}
		return this._userMigrationApi;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setMigrationLinks(migrationLinks: MigrationLinks): void {
		this.migrationLinks = migrationLinks;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getMigrationLinks(): MigrationLinks {
		return this.migrationLinks;
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
			this.setLoading(false);
		} catch (e) {
			console.log(`Some error occurred while loading migration links: ${e}`);
			this.setLoading(false);
		}
	}
}
