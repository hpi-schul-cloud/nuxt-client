import {
	ApiValidationError,
	ContextExternalToolPostParams,
	ContextExternalToolSearchListResponse,
	ToolApiInterface,
} from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { authModule } from "@/store";
import AuthModule from "@/store/auth";
import {
	businessErrorFactory,
	toolConfigurationTemplateFactory,
	contextExternalToolFactory,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils/factory";
import setupStores from "@@/tests/test-utils/setupStores";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { User } from "./types/auth";
import { BusinessError } from "./types/commons";
import { ToolContextType } from "./external-tool";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import ContextExternalToolsModule from "./context-external-tools";
import { ExternalToolDisplayData } from "./external-tool";
import { ContextExternalTool } from "./external-tool/context-external-tool";

describe("ContextExternalToolsModule", () => {
	let module: ContextExternalToolsModule;

	beforeEach(() => {
		module = new ContextExternalToolsModule({});
		setupStores({ authModule: AuthModule });
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const mockToolApi = () => {
		const toolApiMock = {
			toolContextControllerCreateContextExternalTool: jest.fn(),
			toolContextControllerDeleteContextExternalTool: jest.fn(),
			toolContextControllerGetContextExternalToolsForContext: jest.fn(),
		};
		jest
			.spyOn(serverApi, "ToolApiFactory")
			.mockReturnValue(toolApiMock as unknown as ToolApiInterface);

		return {
			toolApiMock,
		};
	};

	const setup = () => {
		const contextExternalTool: ExternalToolDisplayData =
			externalToolDisplayDataFactory.build({
				name: "Test",
				id: "id",
				logoUrl: "logoUrl",
				openInNewTab: true,
			});
		const contextExternalTools: ExternalToolDisplayData[] = [
			contextExternalTool,
			externalToolDisplayDataFactory.build({
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
		describe("getExternalToolDisplayDataList is called", () => {
			describe("when no tool is found", () => {
				it("should initialized as empty array", () => {
					module = new ContextExternalToolsModule({});

					const tools: ExternalToolDisplayData[] =
						module.getExternalToolDisplayDataList;

					expect(tools.length).toEqual(0);
				});
			});

			describe("when tools are found", () => {
				const setup = () => {
					const contextExternalTool: ExternalToolDisplayData =
						externalToolDisplayDataFactory.build({
							name: "Test",
							id: "id",
							logoUrl: "logoUrl",
							openInNewTab: true,
						});
					const contextExternalTools: ExternalToolDisplayData[] = [
						contextExternalTool,
						externalToolDisplayDataFactory.build({
							name: "Test2",
							id: "id2",
							logoUrl: "logoUrl2",
							openInNewTab: true,
						}),
					];
					module.setContextExternalTools(contextExternalTools);

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

		describe("setContextExternalTools is called", () => {
			describe("when configurations change", () => {
				const setup = () => {
					const expectedName = "NewTool";
					const contextExternalTools: ExternalToolDisplayData[] = [
						externalToolDisplayDataFactory.build({
							name: expectedName,
							id: "id",
							logoUrl: "logoUrl",
							openInNewTab: true,
						}),
					];
					module.setContextExternalTools(contextExternalTools);

					return {
						contextExternalTools,
					};
				};
				it("should set the new state", () => {
					const { contextExternalTools } = setup();

					module.setContextExternalTools(contextExternalTools);

					const tools: ExternalToolDisplayData[] =
						module.getExternalToolDisplayDataList;
					expect(tools.length).toEqual(1);
					expect(tools[0].name).toEqual("NewTool");
				});
			});
		});

		describe("removeContextExternalTool is called", () => {
			describe("when it is called", () => {
				const setup = () => {
					const contextExternalTool: ExternalToolDisplayData =
						externalToolDisplayDataFactory.build({
							name: "Test",
							id: "id",
							logoUrl: "logoUrl",
							openInNewTab: true,
						});
					const contextExternalTools: ExternalToolDisplayData[] = [
						contextExternalTool,
						externalToolDisplayDataFactory.build({
							name: "Test2",
							id: "id2",
							logoUrl: "logoUrl2",
							openInNewTab: true,
						}),
					];
					module.setContextExternalTools(contextExternalTools);

					return {
						contextExternalTool,
					};
				};
				it("should remove the given tool from the state", () => {
					const { contextExternalTool } = setup();

					let tools: ExternalToolDisplayData[] =
						module.getExternalToolDisplayDataList;
					expect(tools.length).toEqual(2);

					module.removeContextExternalTool(contextExternalTool.id);

					tools = module.getExternalToolDisplayDataList;
					expect(tools.length).toEqual(1);
				});
			});
		});

		describe("setBusinessError is called", () => {
			describe("when businessError can be set", () => {
				const setup = () => {
					const expectedBusinessError: BusinessError =
						businessErrorFactory.build({
							message: "expectedMessage",
						});
					module.setBusinessError(expectedBusinessError);

					return {
						expectedBusinessError,
					};
				};
				it("should set the given businessError to the state", () => {
					const { expectedBusinessError } = setup();

					expect(module.getBusinessError).toEqual(
						expect.objectContaining<BusinessError>(expectedBusinessError)
					);
				});
			});
		});

		describe("resetBusinessError is called", () => {
			describe("when it is called", () => {
				const setup = () => {
					module.setBusinessError(businessErrorFactory.build());
				};

				it("should reset the business error state", () => {
					setup();

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
			describe("when an error occurs", () => {
				const setup = () => {
					const { axiosError, axiosErrorResponse } = setupWithAuth();
					const { toolApiMock } = mockToolApi();

					const payload = {
						toolTemplate: toolConfigurationTemplateFactory.build(),
						schoolToolId: "schoolToolId",
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					};

					toolApiMock.toolContextControllerCreateContextExternalTool.mockResolvedValue(
						axiosError
					);

					return {
						toolApiMock,
						axiosError,
						axiosErrorResponse,
						payload,
					};
				};

				it("should set the businessError", async () => {
					const { toolApiMock, axiosError, axiosErrorResponse, payload } =
						setup();

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
				const setup = () => {
					setupWithAuth();
					const { toolApiMock } = mockToolApi();

					const payload = {
						toolTemplate: toolConfigurationTemplateFactory.build(),
						schoolToolId: "schoolToolId",
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					};
					const contextExternalToolPostParams: ContextExternalToolPostParams =
						useExternalToolMappings().mapToolConfigurationTemplateToContextExternalToolPostParams(
							payload.toolTemplate,
							payload.schoolToolId,
							payload.contextId,
							payload.contextType
						);

					toolApiMock.toolContextControllerCreateContextExternalTool.mockResolvedValue(
						{}
					);

					return {
						toolApiMock,
						contextExternalToolPostParams,
						payload,
					};
				};

				it("should call the toolApi.toolContextControllerCreateContextExternalTool", async () => {
					const { toolApiMock, contextExternalToolPostParams, payload } =
						setup();

					await module.createContextExternalTool(payload);

					expect(
						toolApiMock.toolContextControllerCreateContextExternalTool
					).toHaveBeenCalledWith(contextExternalToolPostParams);
				});
			});
		});

		describe("loadExternalToolDisplayData is called", () => {
			describe("when loading", () => {
				it("should set loading to true and after operation to false", async () => {
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					await module.loadExternalToolDisplayData({
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					});
					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const { axiosError, axiosErrorResponse } = setupWithAuth();
					const { toolApiMock } = mockToolApi();

					const setLoadingSpy = jest.spyOn(module, "setLoading");
					const setBusinessSpy = jest.spyOn(module, "setBusinessError");

					toolApiMock.toolContextControllerGetContextExternalToolsForContext.mockRejectedValue(
						axiosError
					);

					return {
						setLoadingSpy,
						toolApiMock,
						axiosError,
						axiosErrorResponse,
						setBusinessSpy,
					};
				};

				it("should set loading to false", async () => {
					const { setLoadingSpy } = setup();

					await module.loadExternalToolDisplayData({
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					});

					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				it("should set the businessError", async () => {
					const { axiosError, axiosErrorResponse, setBusinessSpy } = setup();

					await module.loadExternalToolDisplayData({
						contextId: "contextId2",
						contextType: ToolContextType.COURSE,
					});

					expect(setBusinessSpy).toHaveBeenCalledWith({
						...axiosError,
						statusCode: axiosErrorResponse.data.code,
						message: axiosErrorResponse.data.message,
					});
				});
			});

			describe("when contextId and ContextType exist", () => {
				const setup = () => {
					setupWithAuth();
					const { toolApiMock } = mockToolApi();

					const contextExternalTool: ContextExternalTool =
						contextExternalToolFactory.build({ id: "toolId" });
					const externalToolDisplayData: ExternalToolDisplayData =
						externalToolDisplayDataFactory.build({
							id: "toolId",
							openInNewTab: true,
							logoUrl: undefined,
							name: "Toolname",
						});

					const searchListResponse: ContextExternalToolSearchListResponse = {
						data: [contextExternalTool],
					};

					toolApiMock.toolContextControllerGetContextExternalToolsForContext.mockResolvedValue(
						{
							data: searchListResponse,
						}
					);

					const setContextExternalToolsSpy = jest.spyOn(
						module,
						"setContextExternalTools"
					);

					return {
						toolApiMock,
						searchListResponse,
						setContextExternalToolsSpy,
						externalToolDisplayData,
					};
				};
				it("should call the toolApi.toolContextControllerGetContextExternalToolsForContext", async () => {
					const { toolApiMock } = setup();

					await module.loadExternalToolDisplayData({
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					});

					expect(
						toolApiMock.toolContextControllerGetContextExternalToolsForContext
					).toHaveBeenCalledWith("contextId", ToolContextType.COURSE);
				});

				it("should call setContextExternalTools", async () => {
					const { setContextExternalToolsSpy, externalToolDisplayData } =
						setup();

					await module.loadExternalToolDisplayData({
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					});

					expect(setContextExternalToolsSpy).toHaveBeenCalledWith([
						externalToolDisplayData,
					]);
				});
			});
		});

		describe("deleteContextExternalTool is called", () => {
			describe("when loading", () => {
				const setup = () => {
					const { toolApiMock } = mockToolApi();
					const contextExternalTool: ExternalToolDisplayData =
						externalToolDisplayDataFactory.build({
							name: "Test",
							id: "id",
							logoUrl: "logoUrl",
							openInNewTab: true,
						});
					return {
						toolApiMock,
						contextExternalTool,
					};
				};
				it("should set loading to true and after operation to false", async () => {
					const { contextExternalTool } = setup();
					const setLoadingSpy = jest.spyOn(module, "setLoading");

					await module.deleteContextExternalTool(contextExternalTool.id);

					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				describe("when an error occurs", () => {
					const setup = () => {
						const { axiosError, axiosErrorResponse } = setupWithAuth();
						const { toolApiMock } = mockToolApi();

						const setLoadingSpy = jest.spyOn(module, "setLoading");
						const setBusinessSpy = jest.spyOn(module, "setBusinessError");

						const contextExternalTool: ExternalToolDisplayData =
							externalToolDisplayDataFactory.build({
								name: "Test",
								id: "id",
								logoUrl: "logoUrl",
								openInNewTab: true,
							});

						toolApiMock.toolContextControllerDeleteContextExternalTool.mockRejectedValue(
							axiosError
						);

						return {
							setLoadingSpy,
							toolApiMock,
							axiosError,
							axiosErrorResponse,
							setBusinessSpy,
							contextExternalTool,
						};
					};

					it("should set loading to false", async () => {
						const { contextExternalTool, setLoadingSpy } = setup();

						await module.deleteContextExternalTool(contextExternalTool.id);

						expect(setLoadingSpy).toHaveBeenCalledWith(false);
						expect(module.getLoading).toBeFalsy();
					});

					it("should set the businessError", async () => {
						const {
							contextExternalTool,
							axiosError,
							axiosErrorResponse,
							setBusinessSpy,
						} = setup();

						await module.deleteContextExternalTool(contextExternalTool.id);

						expect(setBusinessSpy).toHaveBeenCalledWith({
							...axiosError,
							statusCode: axiosErrorResponse.data.code,
							message: axiosErrorResponse.data.message,
						});
					});
				});
			});

			describe("when toolToDelete is given", () => {
				const setup = () => {
					const { toolApiMock } = mockToolApi();
					const contextExternalTool: ExternalToolDisplayData =
						externalToolDisplayDataFactory.build({
							name: "Test",
							id: "id",
							logoUrl: "logoUrl",
							openInNewTab: true,
						});
					const removeContextExternalToolSpy = jest.spyOn(
						module,
						"removeContextExternalTool"
					);
					return {
						toolApiMock,
						contextExternalTool,
						removeContextExternalToolSpy,
					};
				};
				it("should call the api with id of given tool", async () => {
					const { contextExternalTool, toolApiMock } = setup();

					await module.deleteContextExternalTool(contextExternalTool.id);

					expect(
						toolApiMock.toolContextControllerDeleteContextExternalTool
					).toHaveBeenCalledWith(contextExternalTool.id);
				});

				it("should call the mutation removeSchoolExternalTool", async () => {
					const { contextExternalTool, removeContextExternalToolSpy } = setup();
					mockToolApi();

					await module.deleteContextExternalTool(contextExternalTool.id);

					expect(removeContextExternalToolSpy).toHaveBeenCalledWith(
						contextExternalTool.id
					);
				});
			});
		});
	});
});
