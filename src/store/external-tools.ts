import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	SchoolExternalTool,
	ToolConfigurationListItem,
	ToolConfigurationScope,
	ToolConfigurationTemplate,
} from "./external-tool";
import { $axios } from "@/utils/api";
import { authModule } from "@/store";
import { useExternalToolMappings } from "../composables/external-tool-mappings.composable";
import {
	ExternalToolConfigurationTemplateResponse,
	SchoolExternalToolPostParams,
	SchoolExternalToolResponse,
	ToolApiFactory,
	ToolApiInterface,
	ToolConfigurationListResponse,
	ToolLaunchRequestResponse,
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

	private toolConfigurations: ToolConfigurationListItem[] = [];
	private loading = false;

	private businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: undefined,
	};

	private get toolApi(): ToolApiInterface {
		return ToolApiFactory(undefined, "v3", $axios);
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getSchoolExternalTools(): SchoolExternalTool[] {
		return this.schoolExternalTools;
	}

	get getToolConfigurations(): ToolConfigurationListItem[] {
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
	removeSchoolExternalTool(configId: string): void {
		this.schoolExternalTools = this.schoolExternalTools.filter(
			(tool: SchoolExternalTool) => tool.id !== configId
		);
	}

	@Mutation
	setToolConfigurations(toolConfigurations: ToolConfigurationListItem[]): void {
		this.toolConfigurations = [...toolConfigurations];
	}

	@Action
	async launchTool(
		contextExternalToolId: string
	): Promise<ToolLaunchRequestResponse | undefined> {
		try {
			this.setLoading(true);
			const resp: AxiosResponse<ToolLaunchRequestResponse> =
				await this.toolApi.toolLaunchControllerGetToolLaunchRequest(
					contextExternalToolId
				);
			this.setLoading(false);
			return resp.data;
		} catch (error: any) {
			console.log(`Some error occurred while launching tool: ${error}`);
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
			});
			this.setLoading(false);
		}
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
					useExternalToolMappings().mapSchoolExternalToolSearchListResponse(
						resp.data
					);
				this.setSchoolExternalTools(schoolExternalTools);
			}
			this.setLoading(false);
		} catch (error: any) {
			console.log(`Some error occurred while loading tools data: ${error}`);
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
			});
			this.setLoading(false);
		}
	}

	@Action
	async deleteSchoolExternalTool(configId: string): Promise<void> {
		try {
			this.setLoading(true);

			await this.toolApi.toolSchoolControllerDeleteSchoolExternalTool(configId);
			this.removeSchoolExternalTool(configId);

			this.setLoading(false);
		} catch (error: any) {
			console.log(
				`Some error occurred while deleting tool configuration with id ${configId}: ${error}`
			);
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
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
						ToolConfigurationScope.school,
						authModule.getUser.schoolId
					);

				this.setToolConfigurations(
					useExternalToolMappings().mapToolConfigurationListResponse(
						availableTools.data
					)
				);
			}
			this.setLoading(false);
		} catch (error: any) {
			console.log(
				`Some error occurred while loading available tools for scope SCHOOL and schoolId ${authModule.getUser?.schoolId}: ${error}`
			);
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
			});
			this.setLoading(false);
		}
	}

	@Action
	async loadToolConfigurationTemplateFromExternalTool(
		toolId: string
	): Promise<ToolConfigurationTemplate | undefined> {
		try {
			this.setLoading(true);
			this.resetBusinessError();
			const configTemplate: AxiosResponse<ExternalToolConfigurationTemplateResponse> =
				await this.toolApi.toolConfigurationControllerGetExternalToolForScope(
					toolId
				);
			const toolConfigurationTemplate: ToolConfigurationTemplate =
				useExternalToolMappings().mapExternalToolConfigurationTemplateResponse(
					configTemplate.data
				);
			this.setLoading(false);

			return toolConfigurationTemplate;
		} catch (error: any) {
			console.log(
				`Some error occurred while loading tool configuration template for external tool with id ${toolId}: ${error}`
			);
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
			});
			this.setLoading(false);
		}
	}

	@Action
	async createSchoolExternalTool(
		toolTemplate: ToolConfigurationTemplate
	): Promise<void> {
		try {
			this.setLoading(true);
			this.resetBusinessError();
			if (authModule.getUser?.schoolId) {
				const schoolExternalToolPostParams: SchoolExternalToolPostParams =
					useExternalToolMappings().mapToolConfigurationTemplateToSchoolExternalToolPostParams(
						toolTemplate,
						authModule.getUser.schoolId
					);

				await this.toolApi.toolSchoolControllerCreateSchoolExternalTool(
					schoolExternalToolPostParams
				);
			}
			this.setLoading(false);
		} catch (error: any) {
			console.log(
				`Some error occurred while saving schoolExternalTool for externalTool with id ${toolTemplate.id}: ${error}`
			);
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
			});
			this.setLoading(false);
		}
	}

	@Action
	async updateSchoolExternalTool(
		toolTemplate: ToolConfigurationTemplate
	): Promise<void> {
		try {
			this.setLoading(true);
			this.resetBusinessError();
			if (authModule.getUser?.schoolId && toolTemplate.configId) {
				const schoolExternalToolPostParams: SchoolExternalToolPostParams =
					useExternalToolMappings().mapToolConfigurationTemplateToSchoolExternalToolPostParams(
						toolTemplate,
						authModule.getUser.schoolId
					);

				await this.toolApi.toolSchoolControllerUpdateSchoolExternalTool(
					toolTemplate.configId,
					schoolExternalToolPostParams
				);
			}
			this.setLoading(false);
		} catch (error: any) {
			console.log(
				`Some error occurred while updating schoolExternalTool with id ${toolTemplate.configId} for externalTool with id ${toolTemplate.id}: ${error}`
			);
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
			});
			this.setLoading(false);
		}
	}

	@Action
	async loadSchoolExternalTool(
		configId: string
	): Promise<SchoolExternalTool | undefined> {
		try {
			this.setLoading(true);
			this.resetBusinessError();

			const response: AxiosResponse<SchoolExternalToolResponse> =
				await this.toolApi.toolSchoolControllerGetSchoolExternalTool(configId);
			const schoolExternalTool: SchoolExternalTool =
				useExternalToolMappings().mapSchoolExternalToolResponse(response.data);

			this.setLoading(false);

			return schoolExternalTool;
		} catch (error: any) {
			console.log(
				`Some error occurred while loading schoolExternalTool with id ${configId}: ${error}`
			);
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
			});
			this.setLoading(false);
		}
	}
}
