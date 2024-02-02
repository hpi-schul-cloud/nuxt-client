import {
	SchoolExternalToolConfigurationTemplateListResponse,
	SchoolExternalToolConfigurationTemplateResponse,
	SchoolExternalToolPostParams,
	SchoolExternalToolResponse,
	ToolApiFactory,
	ToolApiInterface,
} from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	SchoolExternalTool,
	SchoolExternalToolConfigurationTemplate,
	SchoolExternalToolSave,
} from "./external-tool";
import { SchoolExternalToolMapper } from "./external-tool/mapper";
import { BusinessError } from "./types/commons";

@Module({
	name: "schoolExternalToolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class SchoolExternalToolsModule extends VuexModule {
	private schoolExternalTools: SchoolExternalTool[] = [];

	private schoolExternalToolConfigurationTemplates: SchoolExternalToolConfigurationTemplate[] =
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

	get getSchoolExternalTools(): SchoolExternalTool[] {
		return this.schoolExternalTools;
	}

	get getSchoolExternalToolConfigurationTemplates(): SchoolExternalToolConfigurationTemplate[] {
		return this.schoolExternalToolConfigurationTemplates;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getBusinessError() {
		return this.businessError;
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
	async loadSchoolExternalTools(schoolId: string): Promise<void> {
		this.setLoading(true);

		try {
			const resp =
				await this.toolApi.toolSchoolControllerGetSchoolExternalTools(schoolId);

			const schoolExternalTools: SchoolExternalTool[] =
				SchoolExternalToolMapper.mapSchoolExternalToolSearchListResponse(
					resp.data
				);

			this.setSchoolExternalTools(schoolExternalTools);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		this.setLoading(false);
	}

	@Action
	async loadSchoolExternalTool(
		schoolExternalToolId: string
	): Promise<SchoolExternalTool | undefined> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const response: AxiosResponse<SchoolExternalToolResponse> =
				await this.toolApi.toolSchoolControllerGetSchoolExternalTool(
					schoolExternalToolId
				);

			const mapped: SchoolExternalTool =
				SchoolExternalToolMapper.mapToSchoolExternalTool(response.data);

			this.setLoading(false);

			return mapped;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		this.setLoading(false);
	}

	@Action
	async deleteSchoolExternalTool(schoolExternalToolId: string): Promise<void> {
		this.setLoading(true);

		try {
			await this.toolApi.toolSchoolControllerDeleteSchoolExternalTool(
				schoolExternalToolId
			);

			this.removeSchoolExternalTool(schoolExternalToolId);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		this.setLoading(false);
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
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
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
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		this.setLoading(false);
	}

	@Action
	async createSchoolExternalTool(
		schoolExternalTool: SchoolExternalToolSave
	): Promise<void> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const schoolExternalToolPostParams: SchoolExternalToolPostParams =
				SchoolExternalToolMapper.mapToSchoolExternalToolPostParams(
					schoolExternalTool
				);

			await this.toolApi.toolSchoolControllerCreateSchoolExternalTool(
				schoolExternalToolPostParams
			);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		this.setLoading(false);
	}

	@Action
	async updateSchoolExternalTool(params: {
		schoolExternalToolId: string;
		schoolExternalTool: SchoolExternalToolSave;
	}): Promise<void> {
		this.setLoading(true);
		this.resetBusinessError();

		try {
			const schoolExternalToolPostParams: SchoolExternalToolPostParams =
				SchoolExternalToolMapper.mapToSchoolExternalToolPostParams(
					params.schoolExternalTool
				);

			await this.toolApi.toolSchoolControllerUpdateSchoolExternalTool(
				params.schoolExternalToolId,
				schoolExternalToolPostParams
			);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		this.setLoading(false);
	}

	@Action
	showDatasheet(externalToolId: string) {
		// TODO N21-1626 try to get the generated url from the api
		const url = `${window.location.origin}/api/v3/tools/external-tools/${externalToolId}/datasheet`;
		window.open(url);
	}
}
