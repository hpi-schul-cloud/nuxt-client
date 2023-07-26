import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	SchoolExternalTool,
	SchoolExternalToolConfigurationTemplate,
	ToolContextType,
	ContextExternalToolConfigurationTemplate,
	SchoolExternalToolSave,
} from "./external-tool";
import { $axios } from "@/utils/api";
import { authModule } from "@/store";
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
	private schoolExternalTools: SchoolExternalTool[] = [];

	private schoolExternalToolConfigurationTemplates: SchoolExternalToolConfigurationTemplate[] =
		[];

	private contextExternalToolConfigurationTemplates: ContextExternalToolConfigurationTemplate[] =
		[];

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

	get getSchoolExternalToolConfigurationTemplates(): SchoolExternalToolConfigurationTemplate[] {
		return this.schoolExternalToolConfigurationTemplates;
	}

	get getContextExternalToolConfigurationTemplates(): ContextExternalToolConfigurationTemplate[] {
		return this.contextExternalToolConfigurationTemplates;
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
	setSchoolExternalToolConfigurationTemplates(
		toolConfigurations: SchoolExternalToolConfigurationTemplate[]
	): void {
		this.schoolExternalToolConfigurationTemplates = [...toolConfigurations];
	}

	@Mutation
	setContextExternalToolConfigurationTemplates(
		contextExternalToolTemplates: ContextExternalToolConfigurationTemplate[]
	): void {
		this.contextExternalToolConfigurationTemplates = [
			...contextExternalToolTemplates,
		];
	}

	@Action
	async loadToolLaunchData(
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
					message: error?.response?.data.type ?? "",
				});
			}

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
	async deleteSchoolExternalTool(schoolExternalToolId: string): Promise<void> {
		try {
			this.setLoading(true);

			await this.toolApi.toolSchoolControllerDeleteSchoolExternalTool(
				schoolExternalToolId
			);
			this.removeSchoolExternalTool(schoolExternalToolId);

			this.setLoading(false);
		} catch (error: any) {
			console.log(
				`Some error occurred while deleting tool configuration with id ${schoolExternalToolId}: ${error}`
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
	async loadAvailableToolsForSchool(schoolId: string): Promise<void> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const availableTools: AxiosResponse<SchoolExternalToolConfigurationTemplateListResponse> =
				await this.toolApi.toolConfigurationControllerGetAvailableToolsForSchool(
					schoolId
				);

			const mapped: SchoolExternalToolConfigurationTemplate[] =
				SchoolExternalToolMapper.mapToSchoolExternalToolConfigurationTemplateList(
					availableTools.data
				);

			this.setSchoolExternalToolConfigurationTemplates(mapped);
		} catch (error: any) {
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
			});
		}

		this.setLoading(false);
	}

	@Action
	async loadConfigurationTemplateForSchoolExternalTool(
		schoolExternalToolId: string
	): Promise<void> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const configTemplate: AxiosResponse<SchoolExternalToolConfigurationTemplateResponse> =
				await this.toolApi.toolConfigurationControllerGetConfigurationTemplateForSchool(
					schoolExternalToolId
				);

			const mapped: SchoolExternalToolConfigurationTemplate =
				SchoolExternalToolMapper.mapToSchoolExternalToolConfigurationTemplate(
					configTemplate.data
				);

			this.setSchoolExternalToolConfigurationTemplates([mapped]);
		} catch (error: any) {
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
			});
		}

		this.setLoading(false);
	}

	@Action
	async createSchoolExternalTool(
		schoolExternalTool: SchoolExternalToolSave
	): Promise<void> {
		try {
			this.setLoading(true);
			this.resetBusinessError();

			const schoolExternalToolPostParams: SchoolExternalToolPostParams =
				SchoolExternalToolMapper.mapToSchoolExternalToolPostParams(
					schoolExternalTool
				);

			await this.toolApi.toolSchoolControllerCreateSchoolExternalTool(
				schoolExternalToolPostParams
			);

			this.setLoading(false);
		} catch (error: any) {
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
			});
			this.setLoading(false);
		}
	}

	@Action
	async updateSchoolExternalTool(params: {
		schoolExternalToolId: string;
		schoolExternalTool: SchoolExternalToolSave;
	}): Promise<void> {
		try {
			this.setLoading(true);
			this.resetBusinessError();

			const schoolExternalToolPostParams: SchoolExternalToolPostParams =
				SchoolExternalToolMapper.mapToSchoolExternalToolPostParams(
					params.schoolExternalTool
				);

			await this.toolApi.toolSchoolControllerUpdateSchoolExternalTool(
				params.schoolExternalToolId,
				schoolExternalToolPostParams
			);

			this.setLoading(false);
		} catch (error: any) {
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
		schoolExternalToolId: string
	): Promise<SchoolExternalTool | undefined> {
		try {
			this.setLoading(true);
			this.resetBusinessError();

			const response: AxiosResponse<SchoolExternalToolResponse> =
				await this.toolApi.toolSchoolControllerGetSchoolExternalTool(
					schoolExternalToolId
				);

			const mapped: SchoolExternalTool =
				SchoolExternalToolMapper.mapToSchoolExternalTool(response.data);

			this.setLoading(false);

			return mapped;
		} catch (error: any) {
			console.log(
				`Some error occurred while loading schoolExternalTool with id ${schoolExternalToolId}: ${error}`
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
	async loadAvailableToolsForContext(payload: {
		contextId: string;
		contextType: ToolContextType;
	}): Promise<void> {
		try {
			this.setLoading(true);
			this.resetBusinessError();

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
	async loadConfigurationTemplateForContextExternalTool(
		contextExternalToolId: string
	): Promise<ContextExternalToolConfigurationTemplate | undefined> {
		try {
			this.setLoading(true);
			this.resetBusinessError();

			const configTemplate: AxiosResponse<ContextExternalToolConfigurationTemplateResponse> =
				await this.toolApi.toolConfigurationControllerGetConfigurationTemplateForContext(
					contextExternalToolId
				);

			const toolConfigurationTemplate: ContextExternalToolConfigurationTemplate =
				ContextExternalToolMapper.mapToContextExternalToolConfigurationTemplate(
					configTemplate.data
				);

			this.setLoading(false);

			return toolConfigurationTemplate;
		} catch (error: any) {
			this.setBusinessError({
				...error,
				statusCode: error?.response?.status,
				message: error?.response?.data.message,
			});
			this.setLoading(false);
		}
	}
}
