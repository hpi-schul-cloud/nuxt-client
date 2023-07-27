import * as useExternalToolUtilsComposable from "@/composables/external-tool-mappings.composable";
import {
	ApiValidationError,
	SchoolExternalToolResponse,
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolSearchListResponse,
	ToolApiInterface,
	ToolLaunchRequestResponse,
} from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import {
	CustomParameterResponse,
	SchoolExternalToolPostParams,
} from "@/serverApi/v3/api";
import { authModule } from "@/store";
import AuthModule from "@/store/auth";
import {
	businessErrorFactory,
	schoolExternalToolFactory,
	toolLaunchRequestResponeFactory,
} from "@@/tests/test-utils/factory";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
	ContextExternalToolTemplateListItem,
	SchoolExternalTool,
	ToolConfigurationStatus,
	SchoolExternalToolConfigurationTemplate,
	ToolContextType,
	ToolParameter,
} from "./external-tool";
import ExternalToolsModule from "./external-tools";
import { User } from "./types/auth";
import { BusinessError } from "./types/commons";

describe("ExternalToolsModule", () => {
	let module: ExternalToolsModule;

	let apiMock: DeepMocked<ToolApiInterface>;

	beforeEach(() => {
		module = new ExternalToolsModule({});

		apiMock = createMock<ToolApiInterface>();

		jest.spyOn(serverApi, "ToolApiFactory").mockReturnValue(apiMock);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const setup = () => {
		const schoolId = "schoolId";
		const toolId = "toolId";

		module = new ExternalToolsModule({});
		setupStores({ authModule: AuthModule });

		const schoolExternalTool: SchoolExternalTool =
			schoolExternalToolFactory.build({
				name: "Test",
				status: ToolConfigurationStatus.Latest,
			});
		const schoolExternalTools: SchoolExternalTool[] = [
			schoolExternalTool,
			schoolExternalToolFactory.build({
				name: "Test2",
				status: ToolConfigurationStatus.Outdated,
			}),
		];
		module.setSchoolExternalTools(schoolExternalTools);

		const toolConfiguration: ToolConfigurationListItem =
			toolConfigurationFactory.build();
		const toolConfigurations: ToolConfigurationListItem[] = [toolConfiguration];
		module.setSchoolExternalToolConfigurationTemplates(toolConfigurations);

		const businessError: BusinessError = businessErrorFactory.build();
		module.setBusinessError(businessError);

		const axiosErrorResponse: AxiosResponse<ApiValidationError> = {
			status: 400,
			statusText: "statusText",
			headers: {},
			config: {} as InternalAxiosRequestConfig,
			data: {
				message: "errorMessage",
				code: 400,
				type: "type",
				details: [],
				title: "title",
			},
		};
		const axiosError: AxiosError = new AxiosError(
			undefined,
			undefined,
			undefined,
			undefined,
			axiosErrorResponse
		);

		const toolConfigurationTemplate: SchoolExternalToolConfigurationTemplate =
			toolConfigurationTemplateFactory.build();

		const payload = {
			contextId: "contextId",
			contextType: ToolContextType.COURSE,
		};

		return {
			schoolId,
			schoolExternalTool,
			schoolExternalTools,
			toolConfigurations,
			toolConfiguration,
			businessError,
			axiosError,
			axiosErrorResponse,
			toolId,
			toolConfigurationTemplate,
			payload,
		};
	};

	describe("getter", () => {
		describe("getSchoolExternalTools is called", () => {
			it("should initialized as empty array", () => {
				module = new ExternalToolsModule({});

				const tools: SchoolExternalTool[] = module.getSchoolExternalTools;

				expect(tools.length).toEqual(0);
			});

			it("should return the state of schoolExternalTools", () => {
				const { schoolExternalTools } = setup();

				const tools: SchoolExternalTool[] = module.getSchoolExternalTools;

				expect(tools).toEqual(schoolExternalTools);
			});
		});

		describe("getToolConfigurations is called", () => {
			it("should initialized as empty array", () => {
				module = new ExternalToolsModule({});

				const configs: ToolConfigurationListItem[] =
					module.getSchoolExternalToolConfigurationTemplates;

				expect(configs.length).toEqual(0);
			});

			it("should return the state of schoolExternalTools", () => {
				const { toolConfigurations } = setup();

				const tools: ToolConfigurationListItem[] =
					module.getSchoolExternalToolConfigurationTemplates;

				expect(tools).toEqual(toolConfigurations);
			});
		});

		describe("getBusinessError is called", () => {
			it("should initialized with defaults", () => {
				module = new ExternalToolsModule({});

				const businessError: BusinessError = module.getBusinessError;

				expect(businessError).toEqual(
					expect.objectContaining<BusinessError>({
						statusCode: "",
						message: "",
						error: undefined,
					})
				);
			});

			it("should return the state of schoolExternalTools", () => {
				const { businessError } = setup();

				const error: BusinessError = module.getBusinessError;

				expect(error).toEqual(businessError);
			});
		});
	});

	describe("mutations", () => {
		describe("setLoading is called", () => {
			describe("when is called with true", () => {
				it("should set loading state to true", () => {
					module.setLoading(true);
					expect(module.getLoading).toBeTruthy();
				});

				it("should set loading state to false", () => {
					module.setLoading(false);
					expect(module.getLoading).toBeFalsy();
				});
			});
		});

		describe("setSchoolExternalTools is called", () => {
			it("should set the new state", () => {
				setup();
				const expectedName = "NewTool";

				module.setSchoolExternalTools([
					schoolExternalToolFactory.build({
						name: expectedName,
						status: ToolConfigurationStatus.Latest,
					}),
				]);

				const tools: SchoolExternalTool[] = module.getSchoolExternalTools;
				expect(tools.length).toEqual(1);
				expect(tools[0].name).toEqual("NewTool");
			});
		});

		describe("removeSchoolExternalTool is called", () => {
			it("should remove the given tool from the state", () => {
				const { schoolExternalTool } = setup();

				let tools: SchoolExternalTool[] = module.getSchoolExternalTools;
				expect(tools.length).toEqual(2);

				module.removeSchoolExternalTool(schoolExternalTool.id);

				tools = module.getSchoolExternalTools;
				expect(tools.length).toEqual(1);
			});
		});

		describe("setBusinessError is called", () => {
			it("should set the given businessError to the state", () => {
				setup();
				const expectedBusinessError: BusinessError = businessErrorFactory.build(
					{
						message: "expectedMessage",
					}
				);
				module.setBusinessError(expectedBusinessError);

				expect(module.getBusinessError).toEqual(
					expect.objectContaining<BusinessError>(expectedBusinessError)
				);
			});
		});

		describe("resetBusinessError is called", () => {
			it("should reset the business error state", () => {
				setup();
				module.setBusinessError(businessErrorFactory.build());

				module.resetBusinessError();

				expect(module.getBusinessError).toEqual(
					expect.objectContaining<BusinessError>({
						statusCode: "",
						message: "",
						error: undefined,
					})
				);
			});
		});

		describe("setToolConfigurations is called", () => {
			it("should set the given toolConfigurations array to the state", () => {
				setup();
				const expectedToolConfiguration: ToolConfigurationListItem =
					toolConfigurationFactory.build();
				module.setSchoolExternalToolConfigurationTemplates([
					expectedToolConfiguration,
				]);

				expect(module.getSchoolExternalToolConfigurationTemplates).toEqual(
					expect.arrayContaining<ToolConfigurationListItem>([
						expectedToolConfiguration,
					])
				);
			});
		});
	});

	describe("actions", () => {
		const setupWithAuth = () => {
			const {
				schoolId,
				axiosError,
				axiosErrorResponse,
				toolConfigurationTemplate,
			} = setup();
			const user: User = { schoolId } as User;
			authModule.setUser(user);
			return {
				schoolId,
				user,
				axiosError,
				axiosErrorResponse,
				toolConfigurationTemplate,
			};
		};

		describe("loadToolLaunchData is called", () => {
			describe("when receiving an api response", () => {
				const setup = () => {
					const mockResponse: ToolLaunchRequestResponse =
						toolLaunchRequestResponeFactory.build();

					const { toolApiMock } = mockToolApi();

					toolApiMock.toolLaunchControllerGetToolLaunchRequest.mockResolvedValue(
						{ data: mockResponse }
					);

					return {
						toolApiMock,
						mockResponse,
					};
				};

				it("should call the api", async () => {
					const { toolApiMock } = setup();

					await module.loadToolLaunchData("contextToolId");

					expect(
						toolApiMock.toolLaunchControllerGetToolLaunchRequest
					).toHaveBeenCalledWith("contextToolId");
				});

				it("should return a response", async () => {
					const { mockResponse } = setup();

					const response: ToolLaunchRequestResponse | undefined =
						await module.loadToolLaunchData("contextToolId");

					expect(response).toEqual(mockResponse);
				});
			});

			describe("when receiving an error response", () => {
				const setup = () => {
					const { toolApiMock } = mockToolApi();

					const error: AxiosError = new AxiosError("Api Error");

					toolApiMock.toolLaunchControllerGetToolLaunchRequest.mockRejectedValue(
						error
					);

					return {
						toolApiMock,
						error,
					};
				};

				it("should store an error", async () => {
					const { error } = setup();

					await module.loadToolLaunchData("contextToolId");

					expect(module.getBusinessError).toEqual<BusinessError>({
						error,
						statusCode: 500,
						message: "",
					});
				});
			});
		});

		describe("loadSchoolExternalTools is called", () => {
			describe("when loading", () => {
				it("should set loading to true and after operation to false", async () => {
					const setLoadingSpy = jest.spyOn(module, "setLoading");

					await module.loadSchoolExternalTools();

					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				describe("when an error occurs", () => {
					it("should set loading to false", async () => {
						setupWithAuth();
						const setLoadingSpy = jest.spyOn(module, "setLoading");
						mockToolApi(new Error(), {}, {}, {});

						const func = async () => await module.loadSchoolExternalTools();

						await expect(func()).toEqual(Promise.resolve());
						expect(setLoadingSpy).toHaveBeenCalledWith(false);
						expect(module.getLoading).toBeFalsy();
					});

					it("should set the businessError", async () => {
						const { axiosError, axiosErrorResponse } = setupWithAuth();
						const setBusinessSpy = jest.spyOn(module, "setBusinessError");
						mockToolApi(axiosError);

						const func = async () => await module.loadSchoolExternalTools();

						await expect(func()).toEqual(Promise.resolve());
						expect(setBusinessSpy).toHaveBeenCalledWith({
							...axiosError,
							statusCode: axiosErrorResponse.data.code,
							message: axiosErrorResponse.data.message,
						});
					});
				});
			});

			describe("when schoolId exists", () => {
				it("should call the toolApi.toolSchoolControllerGetSchoolExternalTools", async () => {
					const { schoolId } = setupWithAuth();
					const { toolApiMock } = mockToolApi();

					await module.loadSchoolExternalTools();

					expect(
						toolApiMock.toolSchoolControllerGetSchoolExternalTools
					).toHaveBeenCalledWith(schoolId);
				});

				it("should call mapSchoolExternalToolSearchListResponse", async () => {
					setupWithAuth();
					const { searchListResponse } = mockToolApi();
					const mapSchoolExternalToolSearchListResponseMock = jest
						.fn()
						.mockReturnValue([{ id: "toolId" }]);
					jest
						.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
						.mockReturnValue({
							...useExternalToolUtilsComposable.useExternalToolMappings(),
							mapSchoolExternalToolSearchListResponse:
								mapSchoolExternalToolSearchListResponseMock,
						});

					await module.loadSchoolExternalTools();

					expect(
						mapSchoolExternalToolSearchListResponseMock
					).toHaveBeenCalledWith(searchListResponse);
				});

				it("should call set setSchoolExternalTools", async () => {
					setupWithAuth();
					const { searchListResponse } = mockToolApi();

					const setSchoolExternalToolsSpy = jest.spyOn(
						module,
						"setSchoolExternalTools"
					);

					await module.loadSchoolExternalTools();

					expect(setSchoolExternalToolsSpy).toHaveBeenCalledWith([
						schoolExternalToolFactory.build({
							id: searchListResponse.data[0].id,
							name: searchListResponse.data[0].name,
							status: ToolConfigurationStatus.Latest,
							version: searchListResponse.data[0].toolVersion,
						}),
					]);
				});
			});
		});

		describe("deleteSchoolExternalTool is called", () => {
			describe("when loading", () => {
				it("should set loading to true and after operation to false", async () => {
					const { schoolExternalTool } = setup();
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					mockToolApi();

					await module.deleteSchoolExternalTool(schoolExternalTool.id);

					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				describe("when an error occurs", () => {
					it("should set loading to false", async () => {
						const { schoolExternalTool, axiosError } = setup();
						const setLoadingSpy = jest.spyOn(module, "setLoading");
						mockToolApi(axiosError);

						const func = async () =>
							await module.deleteSchoolExternalTool(schoolExternalTool.id);

						await expect(func()).toEqual(Promise.resolve());
						expect(setLoadingSpy).toHaveBeenCalledWith(false);
						expect(module.getLoading).toBeFalsy();
					});

					it("should set the businessError", async () => {
						const { schoolExternalTool, axiosError, axiosErrorResponse } =
							setup();
						const setBusinessSpy = jest.spyOn(module, "setBusinessError");
						mockToolApi(axiosError);

						const func = async () =>
							await module.deleteSchoolExternalTool(schoolExternalTool.id);

						await expect(func()).toEqual(Promise.resolve());
						expect(setBusinessSpy).toHaveBeenCalledWith({
							...axiosError,
							statusCode: axiosErrorResponse.data.code,
							message: axiosErrorResponse.data.message,
						});
					});
				});
			});

			describe("when toolToDelete is given", () => {
				it("should call the api with id of given tool", async () => {
					const { schoolExternalTool } = setup();
					const { toolApiMock } = mockToolApi();

					await module.deleteSchoolExternalTool(schoolExternalTool.id);

					expect(
						toolApiMock.toolSchoolControllerDeleteSchoolExternalTool
					).toHaveBeenCalledWith(schoolExternalTool.id);
				});

				it("should call the mutation removeSchoolExternalTool", async () => {
					const { schoolExternalTool } = setup();
					mockToolApi();

					const removeSchoolExternalToolSpy = jest.spyOn(
						module,
						"removeSchoolExternalTool"
					);

					await module.deleteSchoolExternalTool(schoolExternalTool.id);

					expect(removeSchoolExternalToolSpy).toHaveBeenCalledWith(
						schoolExternalTool.id
					);
				});
			});
		});

		describe("loadAvailableToolsForSchool is called", () => {
			describe("when loading", () => {
				it("should set loading to true and after operation to false", async () => {
					setupWithAuth();
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					mockToolApi();

					await module.loadAvailableToolsForSchool();

					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});
			});

			describe("when an error occurs", () => {
				it("should set loading to false", async () => {
					const { axiosError } = setupWithAuth();
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					mockToolApi(axiosError);

					const func = async () => await module.loadAvailableToolsForSchool();

					await expect(func()).toEqual(Promise.resolve());
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				it("should set the businessError", async () => {
					const { axiosError, axiosErrorResponse } = setupWithAuth();
					const setBusinessSpy = jest.spyOn(module, "setBusinessError");
					mockToolApi(axiosError);

					const func = async () => await module.loadAvailableToolsForSchool();

					await expect(func()).toEqual(Promise.resolve());
					expect(setBusinessSpy).toHaveBeenCalledWith({
						...axiosError,
						statusCode: axiosErrorResponse.data.code,
						message: axiosErrorResponse.data.message,
					});
				});
			});

			describe("when schoolId exists", () => {
				it("should call the toolApi.toolConfigurationControllerGetAvailableToolsForSchool", async () => {
					const { schoolId } = setupWithAuth();
					const { toolApiMock } = mockToolApi();

					await module.loadAvailableToolsForSchool();

					expect(
						toolApiMock.toolConfigurationControllerGetAvailableToolsForSchool
					).toHaveBeenCalledWith(schoolId);
				});

				it("should call mapToolConfigurationListResponse", async () => {
					setupWithAuth();
					const { toolConfigurationListResponse } = mockToolApi();
					const mapToolConfigurationListResponseMock = jest
						.fn()
						.mockReturnValue([{ id: "toolId" }]);
					jest
						.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
						.mockReturnValue({
							...useExternalToolUtilsComposable.useExternalToolMappings(),
							mapToolConfigurationListResponse:
								mapToolConfigurationListResponseMock,
						});

					await module.loadAvailableToolsForSchool();

					expect(mapToolConfigurationListResponseMock).toHaveBeenCalledWith(
						toolConfigurationListResponse
					);
				});

				it("should call set toolConfigurations", async () => {
					setupWithAuth();
					const { toolConfigurationListResponse } = mockToolApi();

					const setToolConfigurationsSpy = jest.spyOn(
						module,
						"setSchoolExternalToolConfigurationTemplates"
					);

					await module.loadAvailableToolsForSchool();

					expect(setToolConfigurationsSpy).toHaveBeenCalledWith([
						toolConfigurationFactory.build({
							id: toolConfigurationListResponse.data[0].id,
							name: toolConfigurationListResponse.data[0].name,
							logoUrl: toolConfigurationListResponse.data[0].logoUrl,
						}),
					]);
				});
			});
		});

		describe("loadToolConfigurationTemplateFromExternalTool is called", () => {
			describe("when loading", () => {
				it("should set loading to true and after operation to false", async () => {
					const { toolId } = setup();
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					mockToolApi();

					await module.loadConfigurationTemplateForSchoolExternalTool(toolId);

					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});
			});

			describe("when an error occurs", () => {
				it("should set loading to false", async () => {
					const { axiosError, toolId } = setup();
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					mockToolApi(axiosError);

					const func = async () =>
						await module.loadConfigurationTemplateForSchoolExternalTool(toolId);

					await expect(func()).toEqual(Promise.resolve());
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				it("should set the businessError", async () => {
					const { axiosError, axiosErrorResponse, toolId } = setup();
					const setBusinessSpy = jest.spyOn(module, "setBusinessError");
					mockToolApi(axiosError);

					const func = async () =>
						await module.loadConfigurationTemplateForSchoolExternalTool(toolId);

					await expect(func()).toEqual(Promise.resolve());
					expect(setBusinessSpy).toHaveBeenCalledWith({
						...axiosError,
						statusCode: axiosErrorResponse.data.code,
						message: axiosErrorResponse.data.message,
					});
				});
			});

			it("should call the toolApi.toolConfigurationControllerGetExternalToolForScope", async () => {
				const { toolId } = setup();
				const { toolApiMock } = mockToolApi();

				await module.loadConfigurationTemplateForSchoolExternalTool(toolId);

				expect(
					toolApiMock.toolConfigurationControllerGetExternalToolForScope
				).toHaveBeenCalledWith(toolId);
			});

			it("should call mapExternalToolConfigurationTemplateResponse", async () => {
				const { toolId } = setup();
				const { externalToolConfigurationTemplateResponse } = mockToolApi();
				const mapExternalToolConfigurationTemplateResponseMock = jest
					.fn()
					.mockReturnValue([{ id: "toolId" }]);
				jest
					.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
					.mockReturnValue({
						...useExternalToolUtilsComposable.useExternalToolMappings(),
						mapExternalToolConfigurationTemplateResponse:
							mapExternalToolConfigurationTemplateResponseMock,
					});

				await module.loadConfigurationTemplateForSchoolExternalTool(toolId);

				expect(
					mapExternalToolConfigurationTemplateResponseMock
				).toHaveBeenCalledWith(externalToolConfigurationTemplateResponse);
			});

			it("should return an toolConfigurationTemplate", async () => {
				const { toolId } = setup();
				const { externalToolConfigurationTemplateResponse } = mockToolApi();

				const toolConfigurationTemplate:
					| SchoolExternalToolConfigurationTemplate
					| undefined =
					await module.loadConfigurationTemplateForSchoolExternalTool(toolId);

				expect(toolConfigurationTemplate).toEqual(
					expect.objectContaining<
						Partial<SchoolExternalToolConfigurationTemplate>
					>({
						id: externalToolConfigurationTemplateResponse.id,
						parameters: expect.arrayContaining<ToolParameter>([
							{
								name: externalToolConfigurationTemplateResponse.parameters[0]
									.name,
							} as ToolParameter,
						]),
					})
				);
			});
		});

		describe("saveSchoolExternalTool is called", () => {
			describe("when loading", () => {
				it("should set loading to true and after operation to false", async () => {
					const { toolConfigurationTemplate } = setupWithAuth();
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					mockToolApi();

					await module.createSchoolExternalTool(toolConfigurationTemplate);

					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});
			});

			describe("when an error occurs", () => {
				it("should set loading to false", async () => {
					const { axiosError, toolConfigurationTemplate } = setupWithAuth();
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					mockToolApi(axiosError);

					const func = async () =>
						await module.createSchoolExternalTool(toolConfigurationTemplate);

					await expect(func()).toEqual(Promise.resolve());
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				it("should set the businessError", async () => {
					const { axiosError, axiosErrorResponse, toolConfigurationTemplate } =
						setupWithAuth();
					const setBusinessSpy = jest.spyOn(module, "setBusinessError");
					mockToolApi(axiosError);

					const func = async () =>
						await module.createSchoolExternalTool(toolConfigurationTemplate);

					await expect(func()).toEqual(Promise.resolve());
					expect(setBusinessSpy).toHaveBeenCalledWith({
						...axiosError,
						statusCode: axiosErrorResponse.data.code,
						message: axiosErrorResponse.data.message,
					});
				});
			});

			describe("when schoolId exists", () => {
				it("should call mapToolConfigurationTemplateToSchoolExternalToolPostParams", async () => {
					const { toolConfigurationTemplate, schoolId } = setupWithAuth();
					const mapToolConfigurationTemplateToSchoolExternalToolPostParamsMock =
						jest.fn().mockReturnValue([{ toolId: "toolId" }]);
					jest
						.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
						.mockReturnValue({
							...useExternalToolUtilsComposable.useExternalToolMappings(),
							mapToolConfigurationTemplateToSchoolExternalToolPostParams:
								mapToolConfigurationTemplateToSchoolExternalToolPostParamsMock,
						});

					await module.createSchoolExternalTool(toolConfigurationTemplate);

					expect(
						mapToolConfigurationTemplateToSchoolExternalToolPostParamsMock
					).toHaveBeenCalledWith(toolConfigurationTemplate, schoolId);
				});

				it("should call the toolApi.toolSchoolControllerCreateSchoolExternalTool", async () => {
					const { toolConfigurationTemplate } = setupWithAuth();
					const { toolApiMock } = mockToolApi();

					const schoolExternalToolPostParams: SchoolExternalToolPostParams = {
						toolId: "toolId",
					} as SchoolExternalToolPostParams;
					jest
						.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
						.mockReturnValue({
							...useExternalToolUtilsComposable.useExternalToolMappings(),
							mapToolConfigurationTemplateToSchoolExternalToolPostParams: () =>
								schoolExternalToolPostParams,
						});

					await module.createSchoolExternalTool(toolConfigurationTemplate);

					expect(
						toolApiMock.toolSchoolControllerCreateSchoolExternalTool
					).toHaveBeenCalledWith(schoolExternalToolPostParams);
				});
			});
		});

		describe("updateSchoolExternalTool is called", () => {
			describe("when an error occurs", () => {
				it("should set the businessError", async () => {
					const { axiosError, axiosErrorResponse } = setupWithAuth();
					const { toolApiMock } = mockToolApi();
					const toolTemplate: SchoolExternalToolConfigurationTemplate =
						toolConfigurationTemplateFactory.build();

					toolApiMock.toolSchoolControllerUpdateSchoolExternalTool.mockRejectedValue(
						axiosError
					);

					await module.updateSchoolExternalTool(toolTemplate);

					expect(module.getBusinessError).toEqual<BusinessError>({
						...axiosError,
						statusCode: axiosErrorResponse.data.code,
						message: axiosErrorResponse.data.message,
					});
				});
			});

			describe("when schoolId exists", () => {
				it("should call mapToolConfigurationTemplateToSchoolExternalToolPostParams", async () => {
					const { toolConfigurationTemplate, schoolId } = setupWithAuth();
					mockToolApi();
					const mapToolConfigurationTemplateToSchoolExternalToolPostParamsMock =
						jest
							.fn()
							.mockReturnValue({ toolId: "toolId", configId: "configId" });
					jest
						.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
						.mockReturnValue({
							...useExternalToolUtilsComposable.useExternalToolMappings(),
							mapToolConfigurationTemplateToSchoolExternalToolPostParams:
								mapToolConfigurationTemplateToSchoolExternalToolPostParamsMock,
						});

					await module.updateSchoolExternalTool(toolConfigurationTemplate);

					expect(
						mapToolConfigurationTemplateToSchoolExternalToolPostParamsMock
					).toHaveBeenCalledWith(toolConfigurationTemplate, schoolId);
				});

				it("should call the toolApi.toolSchoolControllerCreateSchoolExternalTool", async () => {
					const { toolConfigurationTemplate } = setupWithAuth();
					const { toolApiMock } = mockToolApi();

					const schoolExternalToolPostParams: SchoolExternalToolPostParams = {
						toolId: "toolId",
						schoolId: "schoolId",
						version: 1,
					} as SchoolExternalToolPostParams;
					jest
						.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
						.mockReturnValue({
							...useExternalToolUtilsComposable.useExternalToolMappings(),
							mapToolConfigurationTemplateToSchoolExternalToolPostParams: () =>
								schoolExternalToolPostParams,
						});

					await module.updateSchoolExternalTool(toolConfigurationTemplate);

					expect(
						toolApiMock.toolSchoolControllerUpdateSchoolExternalTool
					).toHaveBeenCalledWith("configId", schoolExternalToolPostParams);
				});
			});
		});

		describe("loadSchoolExternalTool is called", () => {
			describe("when an error occurs", () => {
				it("should set the businessError", async () => {
					const { axiosError, axiosErrorResponse } = setupWithAuth();
					const { toolApiMock } = mockToolApi();

					toolApiMock.toolSchoolControllerGetSchoolExternalTool.mockRejectedValue(
						axiosError
					);

					const result: SchoolExternalTool | undefined =
						await module.loadSchoolExternalTool("configId");

					expect(module.getBusinessError).toEqual<BusinessError>({
						...axiosError,
						statusCode: axiosErrorResponse.data.code,
						message: axiosErrorResponse.data.message,
					});
					expect(result).toBeUndefined();
				});
			});

			describe("when no error occurs", () => {
				it("should call the toolApi.toolSchoolControllerGetSchoolExternalTool", async () => {
					setupWithAuth();
					const { toolApiMock } = mockToolApi();

					const configId = "configId";
					const mockResponse: SchoolExternalToolResponse = {
						id: "id",
						name: "name",
						toolId: "toolId",
						schoolId: "schoolId",
						parameters: [],
						status: SchoolExternalToolResponseStatusEnum.Unknown,
						toolVersion: 1,
					};
					toolApiMock.toolSchoolControllerGetSchoolExternalTool.mockResolvedValue(
						{
							data: mockResponse,
						}
					);

					await module.loadSchoolExternalTool(configId);

					expect(
						toolApiMock.toolSchoolControllerGetSchoolExternalTool
					).toHaveBeenCalledWith(configId);
				});

				it("should return the SchoolExternalTool", async () => {
					setupWithAuth();
					const { toolApiMock } = mockToolApi();

					const configId = "configId";
					const mockResponse: SchoolExternalToolResponse = {
						id: "id",
						name: "name",
						toolId: "toolId",
						schoolId: "schoolId",
						parameters: [],
						status: SchoolExternalToolResponseStatusEnum.Unknown,
						toolVersion: 1,
					};
					toolApiMock.toolSchoolControllerGetSchoolExternalTool.mockResolvedValue(
						{
							data: mockResponse,
						}
					);

					const result: SchoolExternalTool | undefined =
						await module.loadSchoolExternalTool(configId);

					expect(result).toEqual<SchoolExternalTool>({
						id: mockResponse.id,
						name: mockResponse.name,
						status: ToolConfigurationStatus.Unknown,
						version: mockResponse.toolVersion,
						toolId: mockResponse.toolId,
						parameters: mockResponse.parameters,
					});
				});
			});
		});

		describe("loadAvailableToolsForContext is called", () => {
			describe("when no error occurs", () => {
				const setup = () => {
					const payload = {
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					};

					const { toolApiMock } = mockToolApi();

					const schoolToolConfigurationListItems: ContextExternalToolTemplateListItem[] =
						[
							{
								schoolToolId: "schoolToolId",
								name: "toolName",
								id: "id",
								logoUrl: "logoUrl",
							},
						];

					const mockResponse: SchoolToolConfigurationListResponse = {
						data: [
							{
								name: "toolName",
								logoUrl: "logoUrl",
								id: "id",
								schoolToolId: "schoolToolId",
							},
						],
					};

					toolApiMock.toolConfigurationControllerGetAvailableToolsForContext.mockResolvedValue(
						{
							data: mockResponse,
							status: 200,
							statusText: "OK",
							headers: {},
							config: {},
						}
					);

					jest
						.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
						.mockReturnValue({
							...useExternalToolUtilsComposable.useExternalToolMappings(),
							mapSchoolToolConfigurationListResponse: () =>
								schoolToolConfigurationListItems,
						});

					return { payload, toolApiMock, schoolToolConfigurationListItems };
				};

				it("should call toolApi.toolConfigurationControllerGetAvailableToolsForContext", async () => {
					const { payload, toolApiMock } = setup();

					await module.loadAvailableToolsForContext(payload);

					expect(
						toolApiMock.toolConfigurationControllerGetAvailableToolsForContext
					).toHaveBeenCalledWith(payload.contextType, payload.contextId);
				});

				it("should call set SchoolToolConfiguration", async () => {
					const { payload, schoolToolConfigurationListItems } = setup();

					await module.loadAvailableToolsForContext(payload);

					expect(module.getContextExternalToolConfigurationTemplates).toEqual([
						{
							schoolToolId: schoolToolConfigurationListItems[0].schoolToolId,
							name: schoolToolConfigurationListItems[0].name,
							id: schoolToolConfigurationListItems[0].id,
							logoUrl: schoolToolConfigurationListItems[0].logoUrl,
						},
					]);
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const payload = {
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					};

					const { toolApiMock } = mockToolApi();

					const { axiosError, axiosErrorResponse } = setupWithAuth();

					toolApiMock.toolConfigurationControllerGetAvailableToolsForContext.mockRejectedValue(
						axiosError
					);

					return { payload, axiosError, axiosErrorResponse };
				};

				it("should set the businessError", async () => {
					const { payload, axiosError, axiosErrorResponse } = setup();

					await module.loadAvailableToolsForContext(payload);

					expect(module.getBusinessError).toEqual<BusinessError>({
						...axiosError,
						statusCode: axiosErrorResponse.data.code,
						message: axiosErrorResponse.data.message,
					});
				});
			});
		});

		describe("loadConfigurationTemplateForContextExternalTool is called", () => {
			describe("when loading", () => {
				const setup = () => {
					module = new ExternalToolsModule({});

					const payload = {
						toolId: "toolId",
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					};

					const { toolApiMock } = mockToolApi();

					const setLoadingSpy = jest.spyOn(module, "setLoading");

					return { payload, toolApiMock, setLoadingSpy };
				};

				it("should set loading to true and after operation to false", async () => {
					const { payload, setLoadingSpy } = setup();

					await module.loadConfigurationTemplateForContextExternalTool(payload);

					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const payload = {
						toolId: "toolId",
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					};

					const { axiosError, axiosErrorResponse } = setupWithAuth();

					const { toolApiMock } = mockToolApi(axiosError);

					const setLoadingSpy = jest.spyOn(module, "setLoading");
					const setBusinessSpy = jest.spyOn(module, "setBusinessError");

					return {
						payload,
						toolApiMock,
						axiosError,
						axiosErrorResponse,
						setLoadingSpy,
						setBusinessSpy,
					};
				};

				it("should set loading to false", async () => {
					const { setLoadingSpy, payload } = setup();

					const func = async () =>
						await module.loadConfigurationTemplateForContextExternalTool(
							payload
						);

					await expect(func()).toEqual(Promise.resolve());
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				it("should set the businessError", async () => {
					const { axiosError, axiosErrorResponse, payload, setBusinessSpy } =
						setup();

					const func = async () =>
						await module.loadConfigurationTemplateForContextExternalTool(
							payload
						);

					await expect(func()).toEqual(Promise.resolve());
					expect(setBusinessSpy).toHaveBeenCalledWith({
						...axiosError,
						statusCode: axiosErrorResponse.data.code,
						message: axiosErrorResponse.data.message,
					});
				});
			});

			describe("when no error occurs", () => {
				const setup = () => {
					module = new ExternalToolsModule({});

					const payload = {
						toolId: "toolId",
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					};

					const { toolApiMock, externalToolConfigurationTemplateResponse } =
						mockToolApi();

					const mapExternalToolConfigurationTemplateResponseMock = jest
						.fn()
						.mockReturnValue([{ id: "toolId" }]);
					jest
						.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
						.mockReturnValue({
							...useExternalToolUtilsComposable.useExternalToolMappings(),
							mapExternalToolConfigurationTemplateResponse:
								mapExternalToolConfigurationTemplateResponseMock,
						});

					return {
						payload,
						toolApiMock,
						externalToolConfigurationTemplateResponse,
						mapExternalToolConfigurationTemplateResponseMock,
					};
				};

				it("should call the toolApi.toolConfigurationControllerGetExternalToolForContext", async () => {
					const { payload, toolApiMock } = setup();

					await module.loadConfigurationTemplateForContextExternalTool(payload);

					expect(
						toolApiMock.toolConfigurationControllerGetExternalToolForContext
					).toHaveBeenCalledWith(
						payload.toolId,
						payload.contextType,
						payload.contextId
					);
				});

				it("should call mapExternalToolConfigurationTemplateResponse", async () => {
					const {
						payload,
						mapExternalToolConfigurationTemplateResponseMock,
						externalToolConfigurationTemplateResponse,
					} = setup();

					await module.loadConfigurationTemplateForContextExternalTool(payload);

					expect(
						mapExternalToolConfigurationTemplateResponseMock
					).toHaveBeenCalledWith(externalToolConfigurationTemplateResponse);
				});
			});

			describe("when mapper is not mocked", () => {
				const setup = () => {
					module = new ExternalToolsModule({});

					const payload = {
						toolId: "toolId",
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					};

					const { externalToolConfigurationTemplateResponse } = mockToolApi();

					return {
						payload,
						externalToolConfigurationTemplateResponse,
					};
				};

				it("should return a toolConfigurationTemplate", async () => {
					const { payload, externalToolConfigurationTemplateResponse } =
						setup();

					const toolConfigurationTemplate:
						| SchoolExternalToolConfigurationTemplate
						| undefined =
						await module.loadConfigurationTemplateForContextExternalTool(
							payload
						);

					expect(toolConfigurationTemplate).toEqual(
						expect.objectContaining<
							Partial<SchoolExternalToolConfigurationTemplate>
						>({
							id: externalToolConfigurationTemplateResponse.id,
							parameters: expect.arrayContaining<ToolParameter>([
								{
									name: externalToolConfigurationTemplateResponse.parameters[0]
										.name,
								} as ToolParameter,
							]),
						})
					);
				});
			});
		});
	});
});
