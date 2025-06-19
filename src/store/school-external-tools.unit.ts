import {
	SchoolExternalToolConfigurationTemplateListResponse,
	SchoolExternalToolPostParams,
	SchoolExternalToolSearchListResponse,
	ToolApiInterface,
} from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import {
	axiosErrorFactory,
	contextExternalToolConfigurationTemplateFactory,
	customParameterResponseFactory,
	mockApiResponse,
	schoolExternalToolConfigurationStatusResponseFactory,
	schoolExternalToolConfigurationTemplateResponseFactory,
	schoolExternalToolFactory,
	schoolExternalToolResponseFactory,
	schoolExternalToolSaveFactory,
	toolParameterEntryFactory,
} from "@@/tests/test-utils";
import { SchoolExternalToolConfigurationTemplate } from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import {
	SchoolExternalTool,
	ToolParameterLocation,
	ToolParameterScope,
	ToolParameterType,
} from "./external-tool";
import SchoolExternalToolsModule from "./school-external-tools";
import { BusinessError } from "./types/commons";

describe("SchoolExternalToolsModule", () => {
	let module: SchoolExternalToolsModule;

	let apiMock: DeepMocked<ToolApiInterface>;

	beforeEach(() => {
		module = new SchoolExternalToolsModule({});

		apiMock = createMock<ToolApiInterface>();

		vi.spyOn(serverApi, "ToolApiFactory").mockReturnValue(apiMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("getters", () => {
		describe("getLoading", () => {
			describe("when it is in initial state", () => {
				it("should return false", () => {
					expect(module.getLoading).toEqual(false);
				});
			});

			describe("when loading is set", () => {
				it("should return true", () => {
					module.setLoading(true);

					expect(module.getLoading).toEqual(true);
				});
			});
		});

		describe("getContextExternalToolConfigurationTemplate", () => {
			const setup = () => {
				const contextExternalToolConfigurationTemplate =
					contextExternalToolConfigurationTemplateFactory.build();
				module.setContextExternalToolConfigurationTemplate(
					contextExternalToolConfigurationTemplate
				);

				return {
					contextExternalToolConfigurationTemplate,
				};
			};
			it("should return template", () => {
				const { contextExternalToolConfigurationTemplate } = setup();

				expect(module.getContextExternalToolConfigurationTemplate).toEqual(
					contextExternalToolConfigurationTemplate
				);
			});
		});
	});

	describe("actions", () => {
		describe("loadSchoolExternalTools is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const schoolExternalToolResponse =
						schoolExternalToolResponseFactory.build({
							parameters: [{ name: "param1", value: "value1" }],
						});

					const schoolExternalTools: SchoolExternalToolSearchListResponse = {
						data: [schoolExternalToolResponse],
					};

					apiMock.toolSchoolControllerGetSchoolExternalTools.mockResolvedValue(
						mockApiResponse({ data: schoolExternalTools })
					);

					return {
						schoolExternalToolResponse,
					};
				};

				it("should call the toolApi.toolSchoolControllerGetSchoolExternalTools", async () => {
					setup();

					await module.loadSchoolExternalTools("schoolId");

					expect(
						apiMock.toolSchoolControllerGetSchoolExternalTools
					).toHaveBeenCalledWith("schoolId");
				});

				it("should set the state", async () => {
					const { schoolExternalToolResponse } = setup();

					await module.loadSchoolExternalTools("schoolId");

					expect(module.getSchoolExternalTools).toEqual<SchoolExternalTool[]>([
						{
							id: schoolExternalToolResponse.id,
							toolId: schoolExternalToolResponse.toolId,
							schoolId: schoolExternalToolResponse.schoolId,
							name: schoolExternalToolResponse.name,
							parameters: [
								{
									name: schoolExternalToolResponse.parameters[0].name,
									value: schoolExternalToolResponse.parameters[0].value,
								},
							],
							status:
								schoolExternalToolConfigurationStatusResponseFactory.build(),
							isDeactivated: false,
						},
					]);
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolSchoolControllerGetSchoolExternalTools.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await module.loadSchoolExternalTools("schoolId");

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});

		describe("loadSchoolExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const schoolExternalTool = schoolExternalToolResponseFactory.build();

					apiMock.toolSchoolControllerGetSchoolExternalTool.mockResolvedValue(
						mockApiResponse({ data: schoolExternalTool })
					);

					return {
						schoolExternalTool,
					};
				};

				it("should call the toolApi.toolConfigurationControllerGetAvailableToolsForSchool", async () => {
					setup();

					await module.loadSchoolExternalTool("schoolExternalToolId");

					expect(
						apiMock.toolSchoolControllerGetSchoolExternalTool
					).toHaveBeenCalledWith("schoolExternalToolId");
				});

				it("should return the school external tool", async () => {
					const { schoolExternalTool } = setup();

					const result = await module.loadSchoolExternalTool(
						"schoolExternalToolId"
					);

					expect(result).toEqual<SchoolExternalTool>({
						id: schoolExternalTool.id,
						toolId: schoolExternalTool.toolId,
						schoolId: schoolExternalTool.schoolId,
						parameters: [],
						status:
							schoolExternalToolConfigurationStatusResponseFactory.build(),
						name: schoolExternalTool.name,
						isDeactivated: false,
					});
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolSchoolControllerGetSchoolExternalTool.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await module.loadSchoolExternalTool("schoolExternalToolId");

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});

		describe("deleteSchoolExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const schoolExternalTool = schoolExternalToolFactory.build();

					module.setSchoolExternalTools([schoolExternalTool]);

					return {
						schoolExternalTool,
					};
				};

				it("should call the toolApi.toolSchoolControllerDeleteSchoolExternalTool", async () => {
					const { schoolExternalTool } = setup();

					await module.deleteSchoolExternalTool(schoolExternalTool.id);

					expect(
						apiMock.toolSchoolControllerDeleteSchoolExternalTool
					).toHaveBeenCalledWith(schoolExternalTool.id);
				});

				it("should remove the tool from the state", async () => {
					const { schoolExternalTool } = setup();

					await module.deleteSchoolExternalTool(schoolExternalTool.id);

					expect(module.getSchoolExternalTools).not.toContain(
						schoolExternalTool
					);
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolSchoolControllerDeleteSchoolExternalTool.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await module.deleteSchoolExternalTool("schoolExternalToolId");

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});

		describe("loadAvailableToolsForSchool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const toolConfigurationTemplate =
						schoolExternalToolConfigurationTemplateResponseFactory.build({
							logoUrl: "logoUrl",
							parameters: customParameterResponseFactory.buildList(1, {
								defaultValue: "defaultValue",
								description: "description",
								regex: "regex",
								regexComment: "regexComment",
							}),
						});

					const response: SchoolExternalToolConfigurationTemplateListResponse =
						{ data: [toolConfigurationTemplate] };

					apiMock.toolConfigurationControllerGetAvailableToolsForSchool.mockResolvedValue(
						mockApiResponse({ data: response })
					);

					return {
						toolConfigurationTemplate,
					};
				};

				it("should call the toolApi.toolConfigurationControllerGetAvailableToolsForSchool", async () => {
					setup();

					await module.loadAvailableToolsForSchool("schoolId");

					expect(
						apiMock.toolConfigurationControllerGetAvailableToolsForSchool
					).toHaveBeenCalledWith("schoolId");
				});

				it("should set the state", async () => {
					const { toolConfigurationTemplate } = setup();

					await module.loadAvailableToolsForSchool("schoolId");

					expect(module.getSchoolExternalToolConfigurationTemplates).toEqual<
						SchoolExternalToolConfigurationTemplate[]
					>([
						{
							externalToolId: toolConfigurationTemplate.externalToolId,
							name: toolConfigurationTemplate.name,
							baseUrl: toolConfigurationTemplate.baseUrl,
							parameters: [
								{
									name: toolConfigurationTemplate.parameters[0].name,
									displayName:
										toolConfigurationTemplate.parameters[0].displayName,
									scope: ToolParameterScope.Context,
									type: ToolParameterType.String,
									location: ToolParameterLocation.BODY,
									defaultValue:
										toolConfigurationTemplate.parameters[0].defaultValue,
									description:
										toolConfigurationTemplate.parameters[0].description,
									isOptional:
										toolConfigurationTemplate.parameters[0].isOptional,
									isProtected:
										toolConfigurationTemplate.parameters[0].isProtected,
									regex: toolConfigurationTemplate.parameters[0].regex,
									regexComment:
										toolConfigurationTemplate.parameters[0].regexComment,
								},
							],
							logoUrl: toolConfigurationTemplate.logoUrl,
							isDeactivated: false,
						},
					]);
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolConfigurationControllerGetAvailableToolsForSchool.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await module.loadAvailableToolsForSchool("schoolId");

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});

		describe("loadConfigurationTemplateForSchoolExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const toolConfigurationTemplate =
						schoolExternalToolConfigurationTemplateResponseFactory.build({
							logoUrl: "logoUrl",
							parameters: customParameterResponseFactory.buildList(1, {
								defaultValue: "defaultValue",
								description: "description",
								regex: "regex",
								regexComment: "regexComment",
							}),
						});

					apiMock.toolConfigurationControllerGetConfigurationTemplateForSchool.mockResolvedValue(
						mockApiResponse({ data: toolConfigurationTemplate })
					);

					return {
						toolConfigurationTemplate,
					};
				};

				it("should call the toolApi.toolConfigurationControllerGetAvailableToolsForSchool", async () => {
					setup();

					await module.loadConfigurationTemplateForSchoolExternalTool(
						"schoolExternalToolId"
					);

					expect(
						apiMock.toolConfigurationControllerGetConfigurationTemplateForSchool
					).toHaveBeenCalledWith("schoolExternalToolId");
				});

				it("should set the state", async () => {
					const { toolConfigurationTemplate } = setup();

					await module.loadConfigurationTemplateForSchoolExternalTool(
						"schoolExternalToolId"
					);

					expect(module.getSchoolExternalToolConfigurationTemplates).toEqual<
						SchoolExternalToolConfigurationTemplate[]
					>([
						{
							externalToolId: toolConfigurationTemplate.externalToolId,
							name: toolConfigurationTemplate.name,
							baseUrl: toolConfigurationTemplate.baseUrl,
							parameters: [
								{
									name: toolConfigurationTemplate.parameters[0].name,
									displayName:
										toolConfigurationTemplate.parameters[0].displayName,
									scope: ToolParameterScope.Context,
									type: ToolParameterType.String,
									location: ToolParameterLocation.BODY,
									defaultValue:
										toolConfigurationTemplate.parameters[0].defaultValue,
									description:
										toolConfigurationTemplate.parameters[0].description,
									isOptional:
										toolConfigurationTemplate.parameters[0].isOptional,
									isProtected:
										toolConfigurationTemplate.parameters[0].isProtected,
									regex: toolConfigurationTemplate.parameters[0].regex,
									regexComment:
										toolConfigurationTemplate.parameters[0].regexComment,
								},
							],
							logoUrl: toolConfigurationTemplate.logoUrl,
							isDeactivated: false,
						},
					]);
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolConfigurationControllerGetConfigurationTemplateForSchool.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await module.loadConfigurationTemplateForSchoolExternalTool(
						"schoolExternalToolId"
					);

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});

		describe("createSchoolExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const schoolExternalTool = schoolExternalToolSaveFactory.build({
						parameters: toolParameterEntryFactory.buildList(1),
					});

					return {
						schoolExternalTool,
					};
				};

				it("should call the toolApi.toolSchoolControllerCreateSchoolExternalTool", async () => {
					const { schoolExternalTool } = setup();

					await module.createSchoolExternalTool(schoolExternalTool);

					expect(
						apiMock.toolSchoolControllerCreateSchoolExternalTool
					).toHaveBeenCalledWith<[SchoolExternalToolPostParams]>({
						toolId: schoolExternalTool.toolId,
						schoolId: schoolExternalTool.schoolId,
						parameters: [
							{
								name: schoolExternalTool.parameters[0].name,
								value: schoolExternalTool.parameters[0].value,
							},
						],
						isDeactivated: false,
					});
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolSchoolControllerCreateSchoolExternalTool.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await module.createSchoolExternalTool(
						schoolExternalToolSaveFactory.build()
					);

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});

		describe("updateSchoolExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const schoolExternalTool = schoolExternalToolSaveFactory.build();

					return {
						schoolExternalTool,
					};
				};

				it("should call the toolApi.toolSchoolControllerUpdateSchoolExternalTool", async () => {
					const { schoolExternalTool } = setup();

					await module.updateSchoolExternalTool({
						schoolExternalToolId: "schoolExternalToolId",
						schoolExternalTool: schoolExternalTool,
					});

					expect(
						apiMock.toolSchoolControllerUpdateSchoolExternalTool
					).toHaveBeenCalledWith<[string, SchoolExternalToolPostParams]>(
						"schoolExternalToolId",
						{
							toolId: schoolExternalTool.toolId,
							schoolId: schoolExternalTool.schoolId,
							parameters: [],
							isDeactivated: false,
						}
					);
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolSchoolControllerUpdateSchoolExternalTool.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await module.updateSchoolExternalTool({
						schoolExternalToolId: "schoolExternalToolId",
						schoolExternalTool: schoolExternalToolSaveFactory.build(),
					});

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});
	});
});
