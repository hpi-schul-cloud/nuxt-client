import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ContextExternalTool } from "./external-tool/context-external-tool";
import { ToolContextType } from "./external-tool/tool-context-type.enum";
import { AxiosResponse } from "axios";
import {
	ContextExternalToolSearchListResponse,
	ToolApiFactory,
	ToolApiInterface,
} from "../serverApi/v3";
import { useExternalToolMappings } from "../composables/external-tool-mappings.composable";
import { BusinessError } from "./types/commons";
import { $axios } from "../utils/api";

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

	get getContextExternalTools() {
		return this.contextExternalTools;
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

	@Action
	async loadContextExternalTools(payload: {
		contextId: string;
		contextType: ToolContextType;
	}): Promise<void> {
		try {
			this.setLoading(true);
			this.resetBusinessError();
			console.log("payload: ", payload); //TODO N21-575: remove

			if (payload.contextId && payload.contextType) {
				const tools: AxiosResponse<ContextExternalToolSearchListResponse> =
					await this.toolApi.toolContextControllerGetContextExternalToolsForContext(
						payload.contextId,
						payload.contextType
					);
				console.log("tools nach dem call: ", tools); //TODO N21-575: remove

				this.setContextExternalTools(
					useExternalToolMappings().mapContextExternalToolSearchListResponse(
						tools.data
					)
				);
				console.log(
					"ContextExternalTools nach dem mapping: ",
					this.getContextExternalTools
				); //TODO N21-575: remove
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
}
