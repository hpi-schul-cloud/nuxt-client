import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	SchoolExternalTool,
	SchoolToolConfigurationListItem,
	ToolConfigurationListItem,
	ToolConfigurationTemplate,
} from "./external-tool";
import { $axios } from "@/utils/api";
import { authModule } from "@/store";
import { useExternalToolMappings } from "../composables/external-tool-mappings.composable";
import {
	ContextExternalToolPostParams,
	ExternalToolConfigurationTemplateResponse,
	SchoolExternalToolPostParams,
	SchoolExternalToolResponse,
	ToolApiFactory,
	ToolApiInterface,
	ToolConfigurationListResponse,
	SchoolToolConfigurationListResponse,
	ToolLaunchRequestResponse,
} from "../serverApi/v3";
import { BusinessError } from "./types/commons";
import { AxiosError, AxiosResponse } from "axios";
import { ToolContextType } from "./external-tool/tool-context-type.enum";

@Module({
	name: "externalToolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class ExternalToolsModule extends VuexModule {
	private schoolExternalTools: SchoolExternalTool[] = [];

	private toolConfigurations: ToolConfigurationListItem[] = [];

	private schoolToolConfigurations: SchoolToolConfigurationListItem[] = [];
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

	get getSchoolToolConfigurations(): SchoolToolConfigurationListItem[] {
		return this.schoolToolConfigurations;
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
	async getToolLaunchData(
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
		} catch (error: unknown) {
			console.log(`Some error occurred while launching tool: ${error}`);

			if (error instanceof AxiosError) {
				this.setBusinessError({
					error,
					statusCode: error?.response?.status ?? 500,
					message: error?.response?.data.message ?? "",
				});
			}

			this.setLoading(false);
		}
	}

	@Mutation
	setSchoolToolConfigurations(
		schoolToolConfigurations: SchoolToolConfigurationListItem[]
	): void {
		this.schoolToolConfigurations = [...schoolToolConfigurations];
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
			console.log("here we go");
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

	// TODO: test the real endpoint
	@Action
	async loadAvailableToolConfigurationsForContext(payload: {
		contextId: string;
		contextType: ToolContextType;
	}): Promise<void> {
		try {
			this.setLoading(true);
			this.resetBusinessError();

			if (payload.contextId && payload.contextType) {
				const availableTools: AxiosResponse<SchoolToolConfigurationListResponse> =
					await this.toolApi.toolConfigurationControllerGetAvailableToolsForContext(
						payload.contextType,
						payload.contextId
					);
				console.log("available tools: ", availableTools.data);

				this.setSchoolToolConfigurations(
					useExternalToolMappings().mapSchoolToolConfigurationListResponse(
						availableTools.data
					)
				);
			}
			console.log("after mapping: ", this.getSchoolToolConfigurations);
			this.setLoading(false);
		} catch (error: any) {
			console.log(
				`Some error occurred while loading available tools for scope CONTEXT and contextId ${payload.contextId}: ${error}`
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
	async createContextExternalTool(payload: {
		toolTemplate: ToolConfigurationTemplate;
		contextId: string;
		contextType: ToolContextType;
	}): Promise<void> {
		try {
			this.setLoading(true);
			this.resetBusinessError();
			if (payload.contextId && payload.contextType) {
				const contextExternalToolPostParams: ContextExternalToolPostParams =
					useExternalToolMappings().mapToolConfigurationTemplateToContextExternalToolPostParams(
						payload.toolTemplate,
						payload.contextId,
						payload.contextType
					);
				await this.toolApi.toolContextControllerCreateContextExternalTool(
					contextExternalToolPostParams
				);
			}

			this.setLoading(false);
		} catch (error: any) {
			console.log(
				`Some error occurred while saving contextExternalTool for schoolExternalTool with id ${payload.toolTemplate.id}: ${error}`
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
