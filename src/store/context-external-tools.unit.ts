import {
	ApiValidationError,
	ContextExternalToolPostParams,
	ContextExternalToolResponse,
	ContextExternalToolResponseContextTypeEnum,
	ContextExternalToolSearchListResponse,
	ToolApiInterface,
} from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { authModule } from "@/store";
import AuthModule from "@/store/auth";
import { businessErrorFactory } from "@@/tests/test-utils/factory";
import setupStores from "@@/tests/test-utils/setupStores";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { User } from "./types/auth";
import { BusinessError } from "./types/commons";
import { ToolContextType } from "./external-tool/tool-context-type.enum";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import { SchoolToolConfigurationTemplate } from "./external-tool/school-tool-configuration-template";
import ContextExternalToolsModule from "./context-external-tool";
import { contextExternalToolFactory } from "@@/tests/test-utils/factory/contextExternalToolFactory";
import { ContextExternalTool } from "./external-tool/context-external-tool";
import * as useExternalToolUtilsComposable from "../composables/external-tool-mappings.composable";

describe("ContextExternalToolsModule", () => {
	let module: ContextExternalToolsModule;

	beforeEach(() => {
		module = new ContextExternalToolsModule({});
		setupStores({ authModule: AuthModule });
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const mockToolApi = (
		error: Error | undefined = undefined,
		contextExternalToolMock: Partial<ContextExternalToolResponse> = {}
	) => {
		const searchListResponse: ContextExternalToolSearchListResponse = {
			data: [
				{
					id: "id",
					schoolToolId: "schoolToolId",
					logoUrl: "logoUrl",
					contextId: "contextId",
					contextType: ContextExternalToolResponseContextTypeEnum.Course,
					contextToolName: "ContextToolName",
					parameters: [],
					toolVersion: 1,
					...contextExternalToolMock,
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

		const toolContextControllerCreateContextExternalTool = jest.fn(async () => {
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

		const toolContextControllerGetContextExternalToolsForContext = jest.fn(
			async () => {
				if (error) {
					throw error;
				}
				return promise;
			}
		);

		const toolContextControllerDeleteContextExternalTool = jest.fn(async () => {
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

		const toolApiMock = {
			toolContextControllerCreateContextExternalTool,
			toolContextControllerDeleteContextExternalTool,
			toolContextControllerGetContextExternalToolsForContext,
		};
		jest
			.spyOn(serverApi, "ToolApiFactory")
			.mockReturnValue(toolApiMock as unknown as ToolApiInterface);

		return {
			toolApiMock,
			searchListResponse,
		};
	};

	const setup = () => {
		const contextExternalTool: ContextExternalTool =
			contextExternalToolFactory.build({
				name: "Test",
				id: "id",
				logoUrl: "logoUrl",
				openInNewTab: true,
			});
		const contextExternalTools: ContextExternalTool[] = [
			contextExternalTool,
			contextExternalToolFactory.build({
				name: "Test2",
				id: "id2",
				logoUrl: "logoUrl2",
				openInNewTab: true,
			}),
		];
		module.setContextExternalTools(contextExternalTools);

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

		return {
			contextExternalTool,
			contextExternalTools,
			businessError,
			axiosError,
			axiosErrorResponse,
		};
	};

	describe("getter", () => {
		describe("getContextExternalTools is called", () => {
			it("should initialized as empty array", () => {
				module = new ContextExternalToolsModule({});

				const tools: ContextExternalTool[] = module.getContextExternalTools;

				expect(tools.length).toEqual(0);
			});

			it("should return the state of contextExternalTools", () => {
				const { contextExternalTools } = setup();

				const tools: ContextExternalTool[] = module.getContextExternalTools;

				expect(tools).toEqual(contextExternalTools);
			});
		});

		describe("getBusinessError is called", () => {
			it("should initialized with defaults", () => {
				module = new ContextExternalToolsModule({});

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

		describe("setContextExternalTools is called", () => {
			it("should set the new state", () => {
				setup();
				const expectedName = "NewTool";

				module.setContextExternalTools([
					contextExternalToolFactory.build({
						name: expectedName,
						id: "id",
						logoUrl: "logoUrl",
						openInNewTab: true,
					}),
				]);

				const tools: ContextExternalTool[] = module.getContextExternalTools;
				expect(tools.length).toEqual(1);
				expect(tools[0].name).toEqual("NewTool");
			});
		});

		describe("removeContextExternalTool is called", () => {
			it("should remove the given tool from the state", () => {
				const { contextExternalTool } = setup();

				let tools: ContextExternalTool[] = module.getContextExternalTools;
				expect(tools.length).toEqual(2);

				module.removeContextExternalTool(contextExternalTool.id);

				tools = module.getContextExternalTools;
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
	});

	describe("actions", () => {
		const setupWithAuth = () => {
			const { axiosError, axiosErrorResponse } = setup();
			const user: User = {} as User;
			authModule.setUser(user);
			return {
				user,
				axiosError,
				axiosErrorResponse,
			};
		};

		describe("createContextExternalTool is called", () => {
			const contextId = "contextId";
			const contextType: ToolContextType = ToolContextType.COURSE;
			const toolTemplate: SchoolToolConfigurationTemplate = {
				name: "toolName",
				version: 0,
				parameters: [],
				configId: "configId",
				logoUrl: "logoUrl",
				id: "id",
				schoolToolId: "schoolToolId",
			};
			const payload = {
				toolTemplate,
				contextId,
				contextType,
			};
			describe("when an error occurs", () => {
				it("should set the businessError", async () => {
					const { axiosError, axiosErrorResponse } = setupWithAuth();
					const { toolApiMock } = mockToolApi();
					toolApiMock.toolContextControllerCreateContextExternalTool.mockRejectedValue(
						axiosError
					);
					await module.createContextExternalTool(payload);
					expect(module.getBusinessError).toEqual<BusinessError>({
						...axiosError,
						statusCode: axiosErrorResponse.data.code,
						message: axiosErrorResponse.data.message,
					});
				});
			});

			describe("when no error occurs", () => {
				it("should call the toolApi.toolContextControllerCreateContextExternalTool", async () => {
					setupWithAuth();
					const { toolApiMock } = mockToolApi();
					const contextExternalToolPostParams: ContextExternalToolPostParams =
						useExternalToolMappings().mapToolConfigurationTemplateToContextExternalToolPostParams(
							payload.toolTemplate,
							payload.contextId,
							payload.contextType
						);
					await module.createContextExternalTool(payload);
					expect(
						toolApiMock.toolContextControllerCreateContextExternalTool
					).toHaveBeenCalledWith(contextExternalToolPostParams);
				});
			});
		});

		describe("loadContextExternalTools is called", () => {
			describe("when loading", () => {
				it("should set loading to true and after operation to false", async () => {
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					await module.loadContextExternalTools({
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					});
					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});
			});

			describe("when an error occurs", () => {
				it("should set loading to false", async () => {
					setupWithAuth();
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					mockToolApi(new Error(), {});
					const func = async () =>
						await module.loadContextExternalTools({
							contextId: "contextId",
							contextType: ToolContextType.COURSE,
						});
					await expect(func()).toEqual(Promise.resolve());
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				it("should set the businessError", async () => {
					const { axiosError, axiosErrorResponse } = setupWithAuth();
					const setBusinessSpy = jest.spyOn(module, "setBusinessError");
					mockToolApi(axiosError);
					const func = async () =>
						await module.loadContextExternalTools({
							contextId: "contextId2",
							contextType: ToolContextType.COURSE,
						});
					await expect(func()).toEqual(Promise.resolve());
					expect(setBusinessSpy).toHaveBeenCalledWith({
						...axiosError,
						statusCode: axiosErrorResponse.data.code,
						message: axiosErrorResponse.data.message,
					});
				});
			});

			describe("when contextId and ContextType exist", () => {
				it("should call the toolApi.toolContextControllerGetContextExternalTools", async () => {
					const { toolApiMock } = mockToolApi();
					await module.loadContextExternalTools({
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					});
					expect(
						toolApiMock.toolContextControllerGetContextExternalToolsForContext
					).toHaveBeenCalledWith("contextId", ToolContextType.COURSE);
				});

				it("should call mapContextExternalToolSearchListResponse", async () => {
					setupWithAuth();
					const { searchListResponse } = mockToolApi();
					const mapContextExternalToolSearchListResponseMock = jest
						.fn()
						.mockReturnValue([{ id: "toolId" }]);
					jest
						.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
						.mockReturnValue({
							...useExternalToolUtilsComposable.useExternalToolMappings(),
							mapContextExternalToolSearchListResponse:
								mapContextExternalToolSearchListResponseMock,
						});
					await module.loadContextExternalTools({
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					});
					expect(
						mapContextExternalToolSearchListResponseMock
					).toHaveBeenCalledWith(searchListResponse);
				});

				it("should call setContextExternalTools", async () => {
					setupWithAuth();
					const { searchListResponse } = mockToolApi();
					const setContextExternalToolsSpy = jest.spyOn(
						module,
						"setContextExternalTools"
					);
					await module.loadContextExternalTools({
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					});
					expect(setContextExternalToolsSpy).toHaveBeenCalledWith([
						contextExternalToolFactory.build({
							id: searchListResponse.data[0].id,
							name: searchListResponse.data[0].contextToolName,
							logoUrl: searchListResponse.data[0].logoUrl,
							openInNewTab: true,
						}),
					]);
				});
			});
		});
		describe("deleteContextExternalTool is called", () => {
			describe("when loading", () => {
				it("should set loading to true and after operation to false", async () => {
					const { contextExternalTool } = setup();
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					mockToolApi();

					await module.deleteContextExternalTool(contextExternalTool.id);

					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				describe("when an error occurs", () => {
					it("should set loading to false", async () => {
						const { contextExternalTool, axiosError } = setup();
						const setLoadingSpy = jest.spyOn(module, "setLoading");
						mockToolApi(axiosError);

						const func = async () =>
							await module.deleteContextExternalTool(contextExternalTool.id);

						await expect(func()).toEqual(Promise.resolve());
						expect(setLoadingSpy).toHaveBeenCalledWith(false);
						expect(module.getLoading).toBeFalsy();
					});

					it("should set the businessError", async () => {
						const { contextExternalTool, axiosError, axiosErrorResponse } =
							setup();
						const setBusinessSpy = jest.spyOn(module, "setBusinessError");
						mockToolApi(axiosError);

						const func = async () =>
							await module.deleteContextExternalTool(contextExternalTool.id);

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
					const { contextExternalTool } = setup();
					const { toolApiMock } = mockToolApi();

					await module.deleteContextExternalTool(contextExternalTool.id);

					expect(
						toolApiMock.toolContextControllerDeleteContextExternalTool
					).toHaveBeenCalledWith(contextExternalTool.id);
				});

				it("should call the mutation removeSchoolExternalTool", async () => {
					const { contextExternalTool } = setup();
					mockToolApi();

					const removeContextExternalToolSpy = jest.spyOn(
						module,
						"removeContextExternalTool"
					);

					await module.deleteContextExternalTool(contextExternalTool.id);

					expect(removeContextExternalToolSpy).toHaveBeenCalledWith(
						contextExternalTool.id
					);
				});
			});
		});
	});
});
