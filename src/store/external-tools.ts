import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	SchoolExternalTool,
	ToolConfiguration,
	ToolConfigurationScope,
	ToolConfigurationTemplate,
} from "./external-tool";
import { $axios } from "@utils/api";
import { authModule } from "@utils/store-accessor";
import { useSchoolExternalToolUtils } from "@components/administration/school-external-tool-utils.composable";
import {
	ExternalToolConfigurationTemplateResponse,
	SchoolExternalToolPostParams,
	ToolApiFactory,
	ToolApiInterface,
	ToolConfigurationListResponse,
} from "../serverApi/v3";
import { AxiosResponse } from "axios";
import { useExternalToolUtils } from "@pages/administration/external-tool/external-tool-utils.composable";

@Module({
	name: "external-tools",
	namespaced: true,
	stateFactory: true,
})
export default class ExternalToolsModule extends VuexModule {
	private schoolExternalTools: SchoolExternalTool[] = [];

	private toolConfigurations: ToolConfiguration[] = [];

	private toolConfigurationTemplate: ToolConfigurationTemplate =
		new ToolConfigurationTemplate();

	private loading: boolean = false;

	private _toolApi?: ToolApiInterface;

	private get toolApi(): ToolApiInterface {
		if (!this._toolApi) {
			this._toolApi = ToolApiFactory(undefined, "v3", $axios);
		}
		return this._toolApi;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getSchoolExternalTools(): SchoolExternalTool[] {
		return this.schoolExternalTools;
	}

	get getToolConfigurations(): ToolConfiguration[] {
		return this.toolConfigurations;
	}

	get getToolConfigurationTemplate(): ToolConfigurationTemplate {
		return this.toolConfigurationTemplate;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
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

	@Mutation
	setToolConfigurations(toolConfigurations: ToolConfiguration[]): void {
		this.toolConfigurations = [...toolConfigurations];
	}

	@Mutation
	setToolConfigurationTemplate(
		toolConfigTemplate: ToolConfigurationTemplate
	): void {
		this.toolConfigurationTemplate = { ...toolConfigTemplate };
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

	@Action
	async loadAvailableToolConfigurations(): Promise<void> {
		this.setLoading(true);
		try {
			if (authModule.getUser?.schoolId) {
				const availableTools: AxiosResponse<ToolConfigurationListResponse> =
					await this.toolApi.toolConfigurationControllerGetAvailableToolsForSchool(
						ToolConfigurationScope.SCHOOL,
						authModule.getUser.schoolId
					);

				this.setToolConfigurations(
					useExternalToolUtils().mapToolConfigurationListResponse(
						availableTools.data
					)
				);
			}
			this.setLoading(false);
		} catch (e) {
			console.log(
				`Some error occurred while loading available tools for scope SCHOOL and schoolId ${authModule.getUser?.schoolId}: ${e}`
			);
			this.setLoading(false);
		}
	}

	@Action
	async loadToolConfigurationTemplateFromExternalTool(
		toolId: string
	): Promise<void> {
		this.setLoading(true);
		try {
			const configTemplate: AxiosResponse<ExternalToolConfigurationTemplateResponse> =
				await this.toolApi.toolConfigurationControllerGetExternalToolForScope(
					toolId
				);

			this.setToolConfigurationTemplate(
				useExternalToolUtils().mapExternalToolConfigurationTemplateResponse(
					configTemplate.data
				)
			);
			this.setLoading(false);
		} catch (e) {
			console.log(
				`Some error occurred while loading tool configuration template for external tool with id ${toolId}: ${e}`
			);
			this.setLoading(false);
		}
		this.setLoading(false);
	}

	@Action
	async saveSchoolExternalTool(): Promise<void> {
		this.setLoading(true);
		try {
			if (authModule.getUser?.schoolId) {
				const schoolExternalToolPostParams: SchoolExternalToolPostParams =
					useExternalToolUtils().mapToolConfigurationTemplateToSchoolExternalToolPostParams(
						this.getToolConfigurationTemplate,
						authModule.getUser.schoolId
					);

				await this.toolApi.toolSchoolControllerCreateSchoolExternalTool(
					schoolExternalToolPostParams
				);
				this.setToolConfigurationTemplate(new ToolConfigurationTemplate());
			}
			this.setLoading(false);
		} catch (e) {
			console.log(
				`Some error occurred while saving schoolExternalTool for externalTool with id ${this.getToolConfigurationTemplate.id}: ${e}`
			);
			this.setLoading(false);
		}
		this.setLoading(false);
	}
}
