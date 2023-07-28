import {
	ContextExternalToolConfigurationTemplateListResponse,
	ContextExternalToolPostParams,
	ToolApiInterface,
	ToolReferenceListResponse,
	ToolReferenceResponse,
} from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import {
	axiosErrorFactory,
	businessErrorFactory,
	contextExternalToolConfigurationTemplateResponseFactory,
	contextExternalToolSaveFactory,
	customParameterResponseFactory,
	externalToolDisplayDataFactory,
	toolParameterEntryFactory,
} from "@@/tests/test-utils/factory";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mockApiResponse } from "@@/tests/test-utils";
import { toolReferenceResponseFactory } from "../../tests/test-utils/factory/toolReferenceResponseFactory";
import ContextExternalToolsModule from "./context-external-tools";
import {
	ContextExternalToolConfigurationTemplate,
	ExternalToolDisplayData,
	ToolConfigurationStatus,
	ToolContextType,
	ToolParameterLocation,
	ToolParameterScope,
	ToolParameterType,
} from "./external-tool";
import { BusinessError } from "./types/commons";

describe("ContextExternalToolsModule", () => {
	let module: ContextExternalToolsModule;

	let apiMock: DeepMocked<ToolApiInterface>;

	beforeEach(() => {
		module = new ContextExternalToolsModule({});

		apiMock = createMock<ToolApiInterface>();

		jest.spyOn(serverApi, "ToolApiFactory").mockReturnValue(apiMock);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getter/setter", () => {
		describe("getExternalToolDisplayDataList is called", () => {
			describe("when no tool is found", () => {
				it("should initialized as empty array", () => {
					const tools: ExternalToolDisplayData[] =
						module.getExternalToolDisplayDataList;

					expect(tools.length).toEqual(0);
				});
			});

			describe("when tools are found", () => {
				const setup = () => {
					const contextExternalTools: ExternalToolDisplayData[] =
						externalToolDisplayDataFactory.buildList(2);

					module.setExternalToolDisplayDataList(contextExternalTools);

					return {
						contextExternalTools,
					};
				};

				it("should return the state of contextExternalTools", () => {
					const { contextExternalTools } = setup();

					const tools: ExternalToolDisplayData[] =
						module.getExternalToolDisplayDataList;

					expect(tools).toEqual(contextExternalTools);
				});
			});
		});

		describe("getBusinessError is called", () => {
			describe("when the store has no error", () => {
				it("should return the default state", () => {
					const businessError: BusinessError = module.getBusinessError;

					expect(businessError).toEqual<BusinessError>({
						statusCode: "",
						message: "",
						error: undefined,
					});
				});
			});

			describe("when an error was set", () => {
				const setup = () => {
					const businessError = businessErrorFactory.build({
						message: "error message",
					});

					module.setBusinessError(businessError);

					return {
						businessError,
					};
				};

				it("should return the error", () => {
					const { businessError } = setup();

					const error: BusinessError = module.getBusinessError;

					expect(error).toEqual(businessError);
				});
			});
		});

		describe("setLoading is called", () => {
			describe("when it is called with true", () => {
				it("should set loading state to true", () => {
					module.setLoading(true);

					expect(module.getLoading).toBeTruthy();
				});
			});

			describe("when it is calles with false", () => {
				it("should set loading state to false", () => {
					module.setLoading(false);

					expect(module.getLoading).toBeFalsy();
				});
			});
		});
	});

	describe("actions", () => {
		describe("createContextExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const contextExternalTool = contextExternalToolSaveFactory.build({
						displayName: "ToolName",
						parameters: toolParameterEntryFactory.buildList(1, {
							value: "testValue",
						}),
					});

					return {
						contextExternalTool,
					};
				};

				it("should call the toolApi.toolContextControllerCreateContextExternalTool", async () => {
					const { contextExternalTool } = setup();

					await module.createContextExternalTool(contextExternalTool);

					expect(
						apiMock.toolContextControllerCreateContextExternalTool
					).toHaveBeenCalledWith<[ContextExternalToolPostParams]>({
						contextId: contextExternalTool.contextId,
						contextType: ToolContextType.COURSE,
						parameters: [
							{
								name: contextExternalTool.parameters[0].name,
								value: contextExternalTool.parameters[0].value,
							},
						],
						toolVersion: contextExternalTool.toolVersion,
						schoolToolId: contextExternalTool.schoolToolId,
						displayName: contextExternalTool.displayName,
					});
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolContextControllerCreateContextExternalTool.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await module.createContextExternalTool(
						contextExternalToolSaveFactory.build()
					);

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});

		describe("loadExternalToolDisplayData is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const contextId = "contextId";
					const contextType = ToolContextType.COURSE;

					const displayData: ToolReferenceResponse =
						toolReferenceResponseFactory.build({ logoUrl: "logoUrl" });

					apiMock.toolControllerGetToolReferences.mockResolvedValue(
						mockApiResponse({ data: { data: [displayData] } })
					);

					return {
						contextId,
						contextType,
						displayData,
					};
				};

				it("should call the toolApi.toolControllerGetToolReferences", async () => {
					const { contextId, contextType } = setup();

					await module.loadExternalToolDisplayData({ contextId, contextType });

					expect(apiMock.toolControllerGetToolReferences).toHaveBeenCalledWith(
						contextId,
						contextType
					);
				});

				it("should set the state", async () => {
					const { contextId, contextType, displayData } = setup();

					await module.loadExternalToolDisplayData({ contextId, contextType });

					expect(module.getExternalToolDisplayDataList).toEqual<
						ExternalToolDisplayData[]
					>([
						{
							id: displayData.contextToolId,
							name: displayData.displayName,
							logoUrl: displayData.logoUrl,
							status: ToolConfigurationStatus.Latest,
							openInNewTab: displayData.openInNewTab,
						},
					]);
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const contextId = "contextId";
					const contextType = ToolContextType.COURSE;

					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolControllerGetToolReferences.mockRejectedValue(error);

					return {
						apiError,
						contextId,
						contextType,
					};
				};

				it("should set the businessError", async () => {
					const { apiError, contextId, contextType } = setup();

					await module.loadExternalToolDisplayData({ contextId, contextType });

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});

		describe("deleteContextExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const externalToolDisplayData =
						externalToolDisplayDataFactory.build();

					module.setExternalToolDisplayDataList([externalToolDisplayData]);

					return {
						externalToolDisplayData,
					};
				};

				it("should call the toolApi.toolControllerGetToolReferences", async () => {
					const { externalToolDisplayData } = setup();

					await module.deleteContextExternalTool(externalToolDisplayData.id);

					expect(
						apiMock.toolContextControllerDeleteContextExternalTool
					).toHaveBeenCalledWith(externalToolDisplayData.id);
				});

				it("should remove the tool from the store", async () => {
					const { externalToolDisplayData } = setup();

					await module.deleteContextExternalTool(externalToolDisplayData.id);

					expect(module.getExternalToolDisplayDataList).not.toContain(
						externalToolDisplayData
					);
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const contextExternalToolId = "contextExternalToolId";

					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolContextControllerDeleteContextExternalTool.mockRejectedValue(
						error
					);

					return {
						apiError,
						contextExternalToolId,
					};
				};

				it("should set the businessError", async () => {
					const { apiError, contextExternalToolId } = setup();

					await module.deleteContextExternalTool(contextExternalToolId);

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
						contextExternalToolConfigurationTemplateResponseFactory.build({
							logoUrl: "logoUrl",
							parameters: customParameterResponseFactory.buildList(1, {
								defaultValue: "defaultValue",
								description: "description",
								regex: "regex",
								regexComment: "regexComment",
							}),
						});

					const response: ContextExternalToolConfigurationTemplateListResponse =
						{ data: [toolConfigurationTemplate] };

					apiMock.toolConfigurationControllerGetAvailableToolsForContext.mockResolvedValue(
						mockApiResponse({ data: response })
					);

					return {
						toolConfigurationTemplate,
					};
				};

				it("should call the toolApi.toolConfigurationControllerGetAvailableToolsForContext", async () => {
					setup();

					await module.loadAvailableToolsForContext({
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					});

					expect(
						apiMock.toolConfigurationControllerGetAvailableToolsForContext
					).toHaveBeenCalledWith(ToolContextType.COURSE, "contextId");
				});

				it("should set the state", async () => {
					const { toolConfigurationTemplate } = setup();

					await module.loadAvailableToolsForContext({
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					});

					expect(module.getContextExternalToolConfigurationTemplates).toEqual<
						ContextExternalToolConfigurationTemplate[]
					>([
						{
							externalToolId: toolConfigurationTemplate.externalToolId,
							name: toolConfigurationTemplate.name,
							schoolExternalToolId:
								toolConfigurationTemplate.schoolExternalToolId,
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
									regex: toolConfigurationTemplate.parameters[0].regex,
									regexComment:
										toolConfigurationTemplate.parameters[0].regexComment,
								},
							],
							version: toolConfigurationTemplate.version,
							logoUrl: toolConfigurationTemplate.logoUrl,
						},
					]);
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolConfigurationControllerGetAvailableToolsForContext.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await module.loadAvailableToolsForContext({
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					});

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});

		describe("loadConfigurationTemplateForContextExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const toolConfigurationTemplate =
						contextExternalToolConfigurationTemplateResponseFactory.build({
							logoUrl: "logoUrl",
							parameters: customParameterResponseFactory.buildList(1, {
								defaultValue: "defaultValue",
								description: "description",
								regex: "regex",
								regexComment: "regexComment",
							}),
						});

					apiMock.toolConfigurationControllerGetConfigurationTemplateForContext.mockResolvedValue(
						mockApiResponse({ data: toolConfigurationTemplate })
					);

					return {
						toolConfigurationTemplate,
					};
				};

				it("should call the toolApi.toolConfigurationControllerGetAvailableToolsForContext", async () => {
					setup();

					await module.loadConfigurationTemplateForContextExternalTool(
						"contextExternalToolId"
					);

					expect(
						apiMock.toolConfigurationControllerGetConfigurationTemplateForContext
					).toHaveBeenCalledWith("contextExternalToolId");
				});

				it("should set the state", async () => {
					const { toolConfigurationTemplate } = setup();

					await module.loadConfigurationTemplateForContextExternalTool(
						"contextExternalToolId"
					);

					expect(module.getContextExternalToolConfigurationTemplates).toEqual<
						ContextExternalToolConfigurationTemplate[]
					>([
						{
							externalToolId: toolConfigurationTemplate.externalToolId,
							name: toolConfigurationTemplate.name,
							schoolExternalToolId:
								toolConfigurationTemplate.schoolExternalToolId,
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
									regex: toolConfigurationTemplate.parameters[0].regex,
									regexComment:
										toolConfigurationTemplate.parameters[0].regexComment,
								},
							],
							version: toolConfigurationTemplate.version,
							logoUrl: toolConfigurationTemplate.logoUrl,
						},
					]);
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolConfigurationControllerGetConfigurationTemplateForContext.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await module.loadConfigurationTemplateForContextExternalTool(
						"contextExternalToolId"
					);

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
