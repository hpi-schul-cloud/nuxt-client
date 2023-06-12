import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ContextExternalTool } from "./external-tool/context-external-tool";
import { ToolContextType } from "./external-tool/tool-context-type.enum";
import { AxiosResponse } from "axios";
import {
	ContextExternalToolPostParams,
	ContextExternalToolSearchListResponse,
	ToolApiFactory,
	ToolApiInterface,
} from "../serverApi/v3";
import { useExternalToolMappings } from "../composables/external-tool-mappings.composable";
import { BusinessError } from "./types/commons";
import { $axios } from "../utils/api";
import { SchoolToolConfigurationTemplate } from "./external-tool/school-tool-configuration-template";

@Module({
	name: "contextExternalToolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class ContextExternalToolsModule extends VuexModule {
	private contextExternalTools: ContextExternalTool[] = [];
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

	get getContextExternalTools() {
		return this.contextExternalTools;
	}

	get getBusinessError() {
		return this.businessError;
	}

	@Mutation
	setContextExternalTools(contextExternalTools: ContextExternalTool[]): void {
		this.contextExternalTools = [...contextExternalTools];
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
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
	removeContextExternalTool(toolId: string): void {
		this.contextExternalTools = this.contextExternalTools.filter(
			(tool: ContextExternalTool) => tool.id !== toolId
		);
	}

	@Action
	async createContextExternalTool(payload: {
		toolTemplate: SchoolToolConfigurationTemplate;
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

	@Action
	async loadContextExternalTools(payload: {
		contextId: string;
		contextType: ToolContextType;
	}): Promise<void> {
		try {
			this.setLoading(true);
			this.resetBusinessError();

			if (payload.contextId && payload.contextType) {
				const tools: AxiosResponse<ContextExternalToolSearchListResponse> =
					await this.toolApi.toolContextControllerGetContextExternalToolsForContext(
						payload.contextId,
						payload.contextType
					);

				this.setContextExternalTools(
					useExternalToolMappings().mapContextExternalToolSearchListResponse(
						tools.data
					)
				);
			}

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
	async deleteContextExternalTool(toolId: string): Promise<void> {
		try {
			this.setLoading(true);

			await this.toolApi.toolContextControllerDeleteContextExternalTool(toolId);
			this.removeContextExternalTool(toolId);

			this.setLoading(false);
		} catch (error: any) {
			console.log(
				`Some error occurred while deleting tool configuration with id ${toolId}: ${error}`
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
