import * as useExternalToolUtilsComposable from "@/composables/external-tool-mappings.composable";
import {
	ApiValidationError,
	SchoolExternalToolResponse,
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolSearchListResponse,
	ToolApiInterface,
	ToolConfigurationEntryResponse,
} from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import {
	CustomParameterResponse,
	ExternalToolConfigurationTemplateResponse,
	SchoolExternalToolPostParams,
	ToolConfigurationListResponse,
} from "@/serverApi/v3/api";
import { authModule } from "@/store";
import AuthModule from "@/store/auth";
import {
	businessErrorFactory,
	schoolExternalToolFactory,
	toolConfigurationFactory,
} from "@@/tests/test-utils/factory";
import { toolConfigurationTemplateFactory } from "@@/tests/test-utils/factory/toolConfigurationTemplateFactory";
import setupStores from "@@/tests/test-utils/setupStores";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
	SchoolExternalTool,
	SchoolExternalToolStatus,
	ToolConfigurationListItem,
	ToolConfigurationScope,
	ToolConfigurationTemplate,
	ToolParameter,
} from "./external-tool";
import ExternalToolsModule from "./external-tools";
import { User } from "./types/auth";
import { BusinessError } from "./types/commons";

describe("ExternalToolsModule", () => {
	let module: ExternalToolsModule;

	beforeEach(() => {
		module = new ExternalToolsModule({});
		setupStores({ authModule: AuthModule });
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const mockToolApi = (
		error: Error | undefined = undefined,
		schoolExternalToolMock: Partial<SchoolExternalToolResponse> = {},
		toolConfigurationEntryMock: Partial<ToolConfigurationEntryResponse> = {},
		externalToolConfigurationTemplateResponseMock: Partial<ExternalToolConfigurationTemplateResponse> = {}
	) => {
		const searchListResponse: SchoolExternalToolSearchListResponse = {
			data: [
				{
					id: "id",
					schoolId: "schoolId",
					name: "schoolName",
					toolId: "toolId",
					parameters: [],
					toolVersion: 1,
					status: SchoolExternalToolResponseStatusEnum.Latest,
					...schoolExternalToolMock,
				},
			],
		};

		const promise = Promise.resolve({
			data: {
				...searchListResponse,
			},
			status: 200,
			statusText: "OK",
			headers: {},
			config: {},
		});

		const toolSchoolControllerGetSchoolExternalTools = jest.fn(async () => {
			if (error) {
				throw error;
			}
			return promise;
		});

		const toolSchoolControllerDeleteSchoolExternalTool = jest.fn(async () => {
			if (error) {
				throw error;
			}
			return Promise.resolve({
				data: undefined,
				status: 200,
				statusText: "OK",
				headers: {},
				config: {},
			});
		});

		const toolConfigurationListResponse: ToolConfigurationListResponse = {
			data: [
				{
					id: "id",
					name: "name",
					logoUrl: "logoUrl",
					...toolConfigurationEntryMock,
				},
			],
		};
		const toolConfigurationControllerGetAvailableToolsForSchool = jest.fn(
			async () => {
				if (error) {
					throw error;
				}
				return Promise.resolve({
					data: {
						...toolConfigurationListResponse,
					},
					status: 200,
					statusText: "OK",
					headers: {},
					config: {},
				});
			}
		);

		const externalToolConfigurationTemplateResponse: ExternalToolConfigurationTemplateResponse =
			{
				id: "id",
				name: "name",
				logoUrl: "logoUrl",
				version: 1,
				parameters: [
					{
						name: "parameterName",
					} as CustomParameterResponse,
				],
				...externalToolConfigurationTemplateResponseMock,
			};
		const toolConfigurationControllerGetExternalToolForScope = jest.fn(
			async () => {
				if (error) {
					throw error;
				}
				return Promise.resolve({
					data: {
						...externalToolConfigurationTemplateResponse,
					},
					status: 200,
					statusText: "OK",
					headers: {},
					config: {},
				});
			}
		);

		const toolSchoolControllerCreateSchoolExternalTool = jest.fn(async () => {
			if (error) {
				throw error;
			}
			return Promise.resolve({
				data: undefined,
				status: 201,
				statusText: "Created",
				headers: {},
				config: {},
			});
		});

		const toolApiMock = {
			toolSchoolControllerGetSchoolExternalTools,
			toolSchoolControllerDeleteSchoolExternalTool,
			toolSchoolControllerCreateSchoolExternalTool,
			toolConfigurationControllerGetAvailableToolsForSchool,
			toolConfigurationControllerGetExternalToolForScope,
			toolSchoolControllerUpdateSchoolExternalTool: jest.fn(),
			toolSchoolControllerGetSchoolExternalTool: jest.fn(),
		};
		jest
			.spyOn(serverApi, "ToolApiFactory")
			.mockReturnValue(toolApiMock as unknown as ToolApiInterface);

		return {
			toolApiMock,
			searchListResponse,
			toolConfigurationListResponse,
			externalToolConfigurationTemplateResponse,
		};
	};

	const setup = () => {
		const schoolId = "schoolId";
		const toolId = "toolId";

		const schoolExternalTool: SchoolExternalTool = schoolExternalToolFactory({
			name: "Test",
			status: SchoolExternalToolStatus.Latest,
			id: "testId",
			version: 1,
		});
		const schoolExternalTools: SchoolExternalTool[] = [
			schoolExternalTool,
			schoolExternalToolFactory({
				name: "Test2",
				status: SchoolExternalToolStatus.Outdated,
				id: "testId2",
				version: 1,
			}),
		];
		module.setSchoolExternalTools(schoolExternalTools);

		const toolConfiguration: ToolConfigurationListItem =
			toolConfigurationFactory();
		const toolConfigurations: ToolConfigurationListItem[] = [toolConfiguration];
		module.setToolConfigurations(toolConfigurations);

		const businessError: BusinessError = businessErrorFactory();
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

		const toolConfigurationTemplate: ToolConfigurationTemplate =
			toolConfigurationTemplateFactory();

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
					module.getToolConfigurations;

				expect(configs.length).toEqual(0);
			});

			it("should return the state of schoolExternalTools", () => {
				const { toolConfigurations } = setup();

				const tools: ToolConfigurationListItem[] = module.getToolConfigurations;

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
					schoolExternalToolFactory({
						id: "id",
						name: expectedName,
						status: SchoolExternalToolStatus.Latest,
						version: 1,
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
				const expectedBusinessError: BusinessError = businessErrorFactory({
					message: "expectedMessage",
				});
				module.setBusinessError(expectedBusinessError);

				expect(module.getBusinessError).toEqual(
					expect.objectContaining<BusinessError>(expectedBusinessError)
				);
			});
		});

		describe("resetBusinessError is called", () => {
			it("should reset the business error state", () => {
				setup();
				module.setBusinessError(businessErrorFactory());

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
					toolConfigurationFactory();
				module.setToolConfigurations([expectedToolConfiguration]);

				expect(module.getToolConfigurations).toEqual(
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
						schoolExternalToolFactory({
							id: searchListResponse.data[0].id,
							name: searchListResponse.data[0].name,
							status: SchoolExternalToolStatus.Latest,
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

		describe("loadAvailableToolConfigurations is called", () => {
			describe("when loading", () => {
				it("should set loading to true and after operation to false", async () => {
					setupWithAuth();
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					mockToolApi();

					await module.loadAvailableToolConfigurations();

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

					const func = async () =>
						await module.loadAvailableToolConfigurations();

					await expect(func()).toEqual(Promise.resolve());
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				it("should set the businessError", async () => {
					const { axiosError, axiosErrorResponse } = setupWithAuth();
					const setBusinessSpy = jest.spyOn(module, "setBusinessError");
					mockToolApi(axiosError);

					const func = async () =>
						await module.loadAvailableToolConfigurations();

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

					await module.loadAvailableToolConfigurations();

					expect(
						toolApiMock.toolConfigurationControllerGetAvailableToolsForSchool
					).toHaveBeenCalledWith(ToolConfigurationScope.school, schoolId);
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

					await module.loadAvailableToolConfigurations();

					expect(mapToolConfigurationListResponseMock).toHaveBeenCalledWith(
						toolConfigurationListResponse
					);
				});

				it("should call set toolConfigurations", async () => {
					setupWithAuth();
					const { toolConfigurationListResponse } = mockToolApi();

					const setToolConfigurationsSpy = jest.spyOn(
						module,
						"setToolConfigurations"
					);

					await module.loadAvailableToolConfigurations();

					expect(setToolConfigurationsSpy).toHaveBeenCalledWith([
						toolConfigurationFactory({
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

					await module.loadToolConfigurationTemplateFromExternalTool(toolId);

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
						await module.loadToolConfigurationTemplateFromExternalTool(toolId);

					await expect(func()).toEqual(Promise.resolve());
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				it("should set the businessError", async () => {
					const { axiosError, axiosErrorResponse, toolId } = setup();
					const setBusinessSpy = jest.spyOn(module, "setBusinessError");
					mockToolApi(axiosError);

					const func = async () =>
						await module.loadToolConfigurationTemplateFromExternalTool(toolId);

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

				await module.loadToolConfigurationTemplateFromExternalTool(toolId);

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

				await module.loadToolConfigurationTemplateFromExternalTool(toolId);

				expect(
					mapExternalToolConfigurationTemplateResponseMock
				).toHaveBeenCalledWith(externalToolConfigurationTemplateResponse);
			});

			it("should return an toolConfigurationTemplate", async () => {
				const { toolId } = setup();
				const { externalToolConfigurationTemplateResponse } = mockToolApi();

				const toolConfigurationTemplate: ToolConfigurationTemplate | undefined =
					await module.loadToolConfigurationTemplateFromExternalTool(toolId);

				expect(toolConfigurationTemplate).toEqual(
					expect.objectContaining<Partial<ToolConfigurationTemplate>>({
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
					const toolTemplate: ToolConfigurationTemplate =
						toolConfigurationTemplateFactory();

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
						status: SchoolExternalToolStatus.Unknown,
						version: mockResponse.toolVersion,
						toolId: mockResponse.toolId,
						parameters: mockResponse.parameters,
					});
				});
			});
		});
	});
});
