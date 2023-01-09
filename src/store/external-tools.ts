import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { SchoolExternalTool } from "./types/school-external-tool";
import { $axios } from "@utils/api";
import { authModule } from "@utils/store-accessor";
import { useSchoolExternalToolUtils } from "@components/administration/school-external-tool-utils.composable";
import { ToolApiFactory, ToolApiInterface } from "../serverApi/v3";

@Module({
	name: "external-tools",
	namespaced: true,
	stateFactory: true,
})
export default class ExternalToolsModule extends VuexModule {
	private schoolExternalTools: SchoolExternalTool[] = [];
	private loading: boolean = false;

	private _toolApi?: ToolApiInterface;

	private get toolApi(): ToolApiInterface {
		if (!this._toolApi) {
			this._toolApi = ToolApiFactory(undefined, "v3", $axios);
		}
		return this._toolApi;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getSchoolExternalTools(): SchoolExternalTool[] {
		return this.schoolExternalTools;
	}

	@Mutation
	setSchoolExternalTools(externalTools: SchoolExternalTool[]): void {
		this.schoolExternalTools = [...externalTools];
	}

	@Action
	async loadSchoolExternalTools(): Promise<void> {
		this.setLoading(true);
		try {
			if (authModule.getUser?.schoolId) {
				const resp =
					await this.toolApi.toolSchoolControllerGetSchoolExternalTools(
						authModule.getUser.schoolId
					);
				const schoolExternalTools: SchoolExternalTool[] =
					useSchoolExternalToolUtils().mapSchoolExternalToolSearchListResponse(
						resp.data
					);
				this.setSchoolExternalTools(schoolExternalTools);
			}
			this.setLoading(false);
		} catch (e) {
			console.log(`Some error occurred while loading tools data: ${e}`);
			this.setLoading(false);
			return Promise.resolve();
		}
	}
}
