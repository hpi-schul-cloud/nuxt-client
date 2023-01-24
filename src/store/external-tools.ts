import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { SchoolExternalTool } from "./types/school-external-tool";
import { $axios } from "@/utils/api";
import { authModule } from "@/store";
import { useSchoolExternalToolUtils } from "@/components/administration/school-external-tool-utils.composable";
import { ToolApiFactory, ToolApiInterface } from "../serverApi/v3";

@Module({
	name: "externalToolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class ExternalToolsModule extends VuexModule {
	private schoolExternalTools: SchoolExternalTool[] = [];
	private loading = false;

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
	setSchoolExternalTools(schoolExternalTools: SchoolExternalTool[]): void {
		this.schoolExternalTools = [...schoolExternalTools];
	}

	@Mutation
	removeSchoolExternalTool(schoolExternalTool: SchoolExternalTool): void {
		this.schoolExternalTools = [
			...this.schoolExternalTools.filter(
				(tool: SchoolExternalTool) => tool.id !== schoolExternalTool.id
			),
		];
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

	@Action
	async deleteSchoolExternalTool(
		toolToDelete: SchoolExternalTool
	): Promise<void> {
		this.setLoading(true);
		try {
			await this.toolApi.toolSchoolControllerDeleteSchoolExternalTool(
				toolToDelete.id
			);
			this.removeSchoolExternalTool(toolToDelete);
			this.setLoading(false);
		} catch (e) {
			console.log(
				`Some error occurred while deleting tool with id ${toolToDelete.id}: ${e}`
			);
			this.setLoading(false);
			return Promise.resolve();
		}
	}
}
