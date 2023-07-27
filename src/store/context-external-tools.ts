import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ExternalToolDisplayData, ToolContextType } from "./external-tool";
import { AxiosResponse, isAxiosError } from "axios";
import {
	ContextExternalToolPostParams,
	ToolApiFactory,
	ToolApiInterface,
	ToolReferenceListResponse,
} from "@/serverApi/v3";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import { ContextExternalToolSave } from "./external-tool/context-external-tool";
import { ContextExternalToolMapper } from "./external-tool/mapper";
import { BusinessError } from "./types/commons";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";

@Module({
	name: "contextExternalToolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class ContextExternalToolsModule extends VuexModule {
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
			(tool: ExternalToolDisplayData) => tool.id !== toolId
		);
	}

	@Action
	async createContextExternalTool(
		contextExternalTool: ContextExternalToolSave
	): Promise<void> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const contextExternalToolPostParams: ContextExternalToolPostParams =
				ContextExternalToolMapper.mapToContextExternalToolPostParams(
					contextExternalTool
				);

			await this.toolApi.toolContextControllerCreateContextExternalTool(
				contextExternalToolPostParams
			);
		} catch (error: any) {
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
				useExternalToolMappings().mapToolReferencesToExternalToolDisplayData(
					response.data
				);

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
}
