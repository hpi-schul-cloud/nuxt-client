import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	SchoolExternalTool,
	ToolConfiguration,
	ToolConfigurationScope,
	ToolConfigurationTemplate,
} from "./external-tool";
import { $axios } from "@/utils/api";
import { authModule } from "@/store";
import { useExternalToolUtils } from "../composables/external-tool-utils.composable";
import {
	ExternalToolConfigurationTemplateResponse,
	SchoolExternalToolPostParams,
	ToolApiFactory,
	ToolApiInterface,
	ToolConfigurationListResponse,
} from "../serverApi/v3";
import { BusinessError } from "./types/commons";
import { AxiosResponse } from "axios";

@Module({
	name: "externalToolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class ExternalToolsModule extends VuexModule {
	private schoolExternalTools: SchoolExternalTool[] = [];
	private loading = false;

	private toolConfigurations: ToolConfiguration[] = [];

	private businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: undefined,
	};

	private _toolApi?: ToolApiInterface;

	private get toolApi(): ToolApiInterface {
		return ToolApiFactory(undefined, "v3", $axios);
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

	get getBusinessError() {
		return this.businessError;
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

	@Action
	async loadSchoolExternalTools(): Promise<void> {
		try {
			this.setLoading(true);
			if (authModule.getUser?.schoolId) {
				const resp =
					await this.toolApi.toolSchoolControllerGetSchoolExternalTools(
						authModule.getUser.schoolId
					);
				const schoolExternalTools: SchoolExternalTool[] =
					useExternalToolUtils().mapSchoolExternalToolSearchListResponse(
						resp.data
					);
				this.setSchoolExternalTools(schoolExternalTools);
			}
			this.setLoading(false);
		} catch (e: any) {
			console.log(`Some error occurred while loading tools data: ${e}`);
			this.setBusinessError({
				...e,
				statusCode: e.response.status,
				message: e.response.data.message,
			});
			this.setLoading(false);
		}
	}

	@Action
	async deleteSchoolExternalTool(
		toolToDelete: SchoolExternalTool
	): Promise<void> {
		try {
			this.setLoading(true);
			await this.toolApi.toolSchoolControllerDeleteSchoolExternalTool(
				toolToDelete.id
			);
			this.removeSchoolExternalTool(toolToDelete);
			this.setLoading(false);
		} catch (e: any) {
			console.log(
				`Some error occurred while deleting tool with id ${toolToDelete.id}: ${e}`
			);
			this.setBusinessError({
				...e,
				statusCode: e.response.status,
				message: e.response.data.message,
			});
			this.setLoading(false);
		}
	}

	@Action
	async loadAvailableToolConfigurations(): Promise<void> {
		try {
			this.setLoading(true);
			this.resetBusinessError();
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
		} catch (e: any) {
			console.log(
				`Some error occurred while loading available tools for scope SCHOOL and schoolId ${authModule.getUser?.schoolId}: ${e}`
			);
			this.setBusinessError({
				...e,
				statusCode: e.response.status,
				message: e.response.data.message,
			});
			this.setLoading(false);
		}
	}

	@Action
	async loadToolConfigurationTemplateFromExternalTool(
		toolId: string
	): Promise<ToolConfigurationTemplate> {
		try {
			this.setLoading(true);
			this.resetBusinessError();
			const configTemplate: AxiosResponse<ExternalToolConfigurationTemplateResponse> =
				await this.toolApi.toolConfigurationControllerGetExternalToolForScope(
					toolId
				);
			const toolConfigurationTemplate: ToolConfigurationTemplate =
				useExternalToolUtils().mapExternalToolConfigurationTemplateResponse(
					configTemplate.data
				);
			this.setLoading(false);

			return toolConfigurationTemplate;
		} catch (e: any) {
			console.log(
				`Some error occurred while loading tool configuration template for external tool with id ${toolId}: ${e}`
			);
			this.setBusinessError({
				...e,
				statusCode: e.response.status,
				message: e.response.data.message,
			});
			this.setLoading(false);
			return new ToolConfigurationTemplate();
		}
	}

	@Action
	async saveSchoolExternalTool(
		toolTemplate: ToolConfigurationTemplate
	): Promise<void> {
		try {
			this.setLoading(true);
			this.resetBusinessError();
			if (authModule.getUser?.schoolId) {
				const schoolExternalToolPostParams: SchoolExternalToolPostParams =
					useExternalToolUtils().mapToolConfigurationTemplateToSchoolExternalToolPostParams(
						toolTemplate,
						authModule.getUser.schoolId
					);

				await this.toolApi.toolSchoolControllerCreateSchoolExternalTool(
					schoolExternalToolPostParams
				);
			}
			this.setLoading(false);
		} catch (e: any) {
			console.log(
				`Some error occurred while saving schoolExternalTool for externalTool with id ${toolTemplate.id}: ${e}`
			);
			this.setBusinessError({
				...e,
				statusCode: e.response.status,
				message: e.response.data.message,
			});
			this.setLoading(false);
		}
	}
}
