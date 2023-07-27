import {
	ContextExternalToolPostParams,
	ToolApiInterface,
} from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import {
	axiosErrorFactory,
	businessErrorFactory,
	contextExternalToolSaveFactory,
	externalToolDisplayDataFactory,
	toolParameterEntryFactory,
} from "@@/tests/test-utils/factory";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { BusinessError } from "./types/commons";
import { ExternalToolDisplayData, ToolContextType } from "./external-tool";
import ContextExternalToolsModule from "./context-external-tools";

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

	describe("mutations", () => {
		describe("removeContextExternalTool is called", () => {
			describe("when it is called", () => {
				const setup = () => {
					const contextExternalTools: ExternalToolDisplayData[] =
						externalToolDisplayDataFactory.buildList(3);

					module.setExternalToolDisplayDataList(contextExternalTools);

					return {
						contextExternalTools,
					};
				};

				it("should remove the length of the list by one", () => {
					const { contextExternalTools } = setup();

					module.removeContextExternalTool(contextExternalTools[0].id);

					expect(module.getExternalToolDisplayDataList.length).toEqual(
						contextExternalTools.length - 1
					);
				});

				it("should remove the given tool from the state", () => {
					const { contextExternalTools } = setup();

					module.removeContextExternalTool(contextExternalTools[1].id);

					expect(module.getExternalToolDisplayDataList).not.toContain(
						contextExternalTools[1]
					);
				});
			});
		});

		describe("resetBusinessError is called", () => {
			describe("when it is called", () => {
				it("should reset the business error state", () => {
					module.setBusinessError(businessErrorFactory.build());

					module.resetBusinessError();

					expect(module.getBusinessError).toEqual<BusinessError>({
						statusCode: "",
						message: "",
						error: undefined,
					});
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

					return {
						contextId,
						contextType,
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
	});
});
