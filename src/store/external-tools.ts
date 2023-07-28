import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	SchoolExternalTool,
	SchoolExternalToolConfigurationTemplate,
	ToolContextType,
	ContextExternalToolConfigurationTemplate,
	SchoolExternalToolSave,
} from "./external-tool";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import {
	ContextExternalToolConfigurationTemplateListResponse,
	ContextExternalToolConfigurationTemplateResponse,
	SchoolExternalToolConfigurationTemplateListResponse,
	SchoolExternalToolConfigurationTemplateResponse,
	SchoolExternalToolPostParams,
	SchoolExternalToolResponse,
	ToolApiFactory,
	ToolApiInterface,
	ToolLaunchRequestResponse,
} from "@/serverApi/v3";
import {
	ContextExternalToolMapper,
	SchoolExternalToolMapper,
} from "./external-tool/mapper";
import { BusinessError } from "./types/commons";
import { AxiosError, AxiosResponse } from "axios";

@Module({
	name: "externalToolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class ExternalToolsModule extends VuexModule {
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

	get getBusinessError() {
		return this.businessError;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setBusinessError(businessError: BusinessError): void {
		this.businessError = businessError;
	}

	@Action
	async loadToolLaunchData(
		contextExternalToolId: string
	): Promise<ToolLaunchRequestResponse | undefined> {
		this.setLoading(true);

		try {
			const resp: AxiosResponse<ToolLaunchRequestResponse> =
				await this.toolApi.toolLaunchControllerGetToolLaunchRequest(
					contextExternalToolId
				);

			this.setLoading(false);

			return resp.data;
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
