import {
	ContextExternalToolConfigurationTemplateListResponse,
	ContextExternalToolConfigurationTemplateResponse,
	ContextExternalToolPostParams,
	ContextExternalToolResponse,
	ToolApiFactory,
	ToolApiInterface,
	ToolContextType,
	ToolReferenceListResponse,
} from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	ContextExternalToolConfigurationTemplate,
	ExternalToolDisplayData,
} from "./external-tool";
import {
	ContextExternalTool,
	ContextExternalToolSave,
} from "./external-tool/context-external-tool";
import {
	ContextExternalToolMapper,
	ExternalToolMapper,
} from "./external-tool/mapper";
import { BusinessError } from "./types/commons";

@Module({
	name: "contextExternalToolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class ContextExternalToolsModule extends VuexModule {
	private contextExternalToolConfigurationTemplates: ContextExternalToolConfigurationTemplate[] =
		[];

	private externalToolDisplayDataList: ExternalToolDisplayData[] = [];

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

	get getExternalToolDisplayDataList(): ExternalToolDisplayData[] {
		return this.externalToolDisplayDataList;
	}

	get getContextExternalToolConfigurationTemplates(): ContextExternalToolConfigurationTemplate[] {
		return this.contextExternalToolConfigurationTemplates;
	}

	get getBusinessError(): BusinessError {
		return this.businessError;
	}

	@Mutation
	setExternalToolDisplayDataList(
		externalToolDisplayData: ExternalToolDisplayData[]
	): void {
		this.externalToolDisplayDataList = [...externalToolDisplayData];
	}

	@Mutation
	setContextExternalToolConfigurationTemplates(
		contextExternalToolTemplates: ContextExternalToolConfigurationTemplate[]
	): void {
		this.contextExternalToolConfigurationTemplates = [
			...contextExternalToolTemplates,
		];
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
		this.externalToolDisplayDataList = this.externalToolDisplayDataList.filter(
			(tool: ExternalToolDisplayData) => tool.contextExternalToolId !== toolId
		);
	}

	@Action
	async createContextExternalTool(
		contextExternalTool: ContextExternalToolSave
	): Promise<ContextExternalTool | null> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const contextExternalToolPostParams: ContextExternalToolPostParams =
				ContextExternalToolMapper.mapToContextExternalToolPostParams(
					contextExternalTool
				);

			const response: AxiosResponse<ContextExternalToolResponse> =
				await this.toolApi.toolContextControllerCreateContextExternalTool(
					contextExternalToolPostParams
				);

			const mapped: ContextExternalTool =
				ContextExternalToolMapper.mapToContextExternalTool(response.data);

			this.setLoading(false);

			return mapped;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			console.log(apiError);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});

			this.setLoading(false);
		}

		return null;
	}

	@Action
	async updateContextExternalTool(params: {
		contextExternalToolId: string;
		contextExternalTool: ContextExternalToolSave;
	}): Promise<ContextExternalTool | null> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const contextExternalToolPostParams: ContextExternalToolPostParams =
				ContextExternalToolMapper.mapToContextExternalToolPostParams(
					params.contextExternalTool
				);

			const response: AxiosResponse<ContextExternalToolResponse> =
				await this.toolApi.toolContextControllerUpdateContextExternalTool(
					params.contextExternalToolId,
					contextExternalToolPostParams
				);

			const mapped: ContextExternalTool =
				ContextExternalToolMapper.mapToContextExternalTool(response.data);

			this.setLoading(false);

			return mapped;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			console.log(apiError);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});

			this.setLoading(false);
		}

		return null;
	}

	/**
	 * @deprecated useContextExternalToolApi.fetchDisplayDataCall
	 */
	@Action
	async loadExternalToolDisplayData(payload: {
		contextId: string;
		contextType: ToolContextType;
	}): Promise<void> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const response: AxiosResponse<ToolReferenceListResponse> =
				await this.toolApi.toolControllerGetToolReferences(
					payload.contextId,
					payload.contextType
				);

			const mapped: ExternalToolDisplayData[] =
				ExternalToolMapper.mapToExternalToolDisplayData(response.data);

			this.setExternalToolDisplayDataList(mapped);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			console.log(apiError);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		this.setLoading(false);
	}

	@Action
	async deleteContextExternalTool(toolId: string): Promise<void> {
		this.setLoading(true);

		try {
			await this.toolApi.toolContextControllerDeleteContextExternalTool(toolId);

			this.removeContextExternalTool(toolId);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			console.log(apiError);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		this.setLoading(false);
	}

	@Action
	async loadAvailableToolsForContext(payload: {
		contextId: string;
		contextType: ToolContextType;
	}): Promise<void> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const availableTools: AxiosResponse<ContextExternalToolConfigurationTemplateListResponse> =
				await this.toolApi.toolConfigurationControllerGetAvailableToolsForContext(
					payload.contextType,
					payload.contextId
				);

			const mapped: ContextExternalToolConfigurationTemplate[] =
				ContextExternalToolMapper.mapToContextExternalToolConfigurationTemplateList(
					availableTools.data
				);

			this.setContextExternalToolConfigurationTemplates(mapped);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			console.log(apiError);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		this.setLoading(false);
	}

	@Action
	async loadConfigurationTemplateForContextExternalTool(
		contextExternalToolId: string
	): Promise<void> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const configTemplate: AxiosResponse<ContextExternalToolConfigurationTemplateResponse> =
				await this.toolApi.toolConfigurationControllerGetConfigurationTemplateForContext(
					contextExternalToolId
				);

			const toolConfigurationTemplate: ContextExternalToolConfigurationTemplate =
				ContextExternalToolMapper.mapToContextExternalToolConfigurationTemplate(
					configTemplate.data
				);

			this.setContextExternalToolConfigurationTemplates([
				toolConfigurationTemplate,
			]);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			console.log(apiError);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		this.setLoading(false);
	}

	@Action
	async loadContextExternalTool(
		contextExternalToolId: string
	): Promise<ContextExternalTool | undefined> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const availableTools: AxiosResponse<ContextExternalToolResponse> =
				await this.toolApi.toolContextControllerGetContextExternalTool(
					contextExternalToolId
				);

			const mapped: ContextExternalTool =
				ContextExternalToolMapper.mapToContextExternalTool(availableTools.data);

			this.setLoading(false);

			return mapped;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			console.log(apiError);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		this.setLoading(false);
	}
}
