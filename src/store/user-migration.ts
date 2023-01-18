import { $axios } from "@utils/api";
import { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
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

	private _userMigrationApi?: unknown;

	private get userMigrationApi(): unknown {
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
			const links: AxiosResponse<unknown> =
				await this.userMigrationApi.userMigrationControllerPageContent(request);

			const mappedLinks: MigrationLinks = {
				proceedLink: links.data.proceedButtonUrl,
				cancelLink: links.data.cancelButtonUrl,
			};
			this.setMigrationLinks(mappedLinks);
			this.setLoading(false);
		} catch (e) {
			console.error(`Some error occurred while loading migration links: ${e}`);
			this.setLoading(false);
		}
	}
}
