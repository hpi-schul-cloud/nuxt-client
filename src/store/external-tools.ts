import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { SchoolExternalTool } from "./external-tool/school-external-tool";
import { $axios } from "@utils/api";
import { authModule } from "@utils/store-accessor";
import { useSchoolExternalToolUtils } from "@components/administration/school-external-tool-utils.composable";
import {
	ExternalToolConfigurationTemplateResponse,
	ToolApiFactory,
	ToolApiInterface,
	ToolConfigurationEntryResponse,
	ToolConfigurationListResponse,
} from "../serverApi/v3";
import { ToolConfigurationScope } from "./external-tool/tool-configuration-scope";
import { AxiosResponse } from "axios";
import { ToolConfiguration } from "./external-tool/tool-configuration";
import { ToolConfigurationTemplate } from "./external-tool/tool-configuration-template";

@Module({
	name: "external-tools",
	namespaced: true,
	stateFactory: true,
})
export default class ExternalToolsModule extends VuexModule {
	private schoolExternalTools: SchoolExternalTool[] = [];

	private toolConfigurations: ToolConfiguration[] = [];

	private toolConfigurationTemplate: ToolConfigurationTemplate = {
		id: "",
		parameters: [],
		version: 0,
		logoUrl: undefined,
		name: "",
	};

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
				const mappedToolConfigurations: ToolConfiguration[] =
					availableTools.data.data.map(
						(
							toolConfigResponse: ToolConfigurationEntryResponse
						): ToolConfiguration => ({
							id: toolConfigResponse.id,
							name: toolConfigResponse.name,
							logoUrl: toolConfigResponse.logoUrl,
						})
					);
				this.setToolConfigurations(mappedToolConfigurations);
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
			console.log("TOOLID");
			console.log(toolId);
			const configTemplate: AxiosResponse<ExternalToolConfigurationTemplateResponse> =
				await this.toolApi.toolConfigurationControllerGetExternalToolForScope(
					toolId
				);
			console.log(configTemplate.data);
			this.setToolConfigurationTemplate({
				id: configTemplate.data.id,
				name: configTemplate.data.name,
				logoUrl: configTemplate.data.logoUrl,
				version: configTemplate.data.version,
				parameters: [...configTemplate.data.parameters],
			});
			this.setLoading(false);
		} catch (e) {
			console.log(
				`Some error occurred while loading tool configuration template for external tool with id ${toolId}: ${e}`
			);
			this.setLoading(false);
		}
		this.setLoading(false);
	}
}
