import { useContextExternalToolApi } from "./contextExternalToolApi.composable";
import { useContextExternalToolConfigurationState } from "./contextExternalToolConfigurationState.composable";
import { ContextExternalToolConfigurationTemplate } from "./types";
import { ToolContextType } from "@api-server";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import {
	axiosErrorFactory,
	contextExternalToolConfigurationTemplateFactory,
	mockComposable,
} from "@@/tests/test-utils";
import { Mocked } from "vitest";

vi.mock("@data-external-tool/contextExternalToolApi.composable");

describe("contextExternalToolConfigurationState.composable", () => {
	let useContextExternalToolApiMock: Mocked<ReturnType<typeof useContextExternalToolApi>>;

	beforeEach(() => {
		useContextExternalToolApiMock = mockComposable(useContextExternalToolApi);

		vi.mocked(useContextExternalToolApi).mockReturnValue(useContextExternalToolApiMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when no data is loaded", () => {
		it("should not have data", async () => {
			const { availableTools } = useContextExternalToolConfigurationState();

			expect(availableTools.value).toEqual([]);
		});
	});

	describe("fetchAvailableToolConfigurationsForContext", () => {
		describe("when data is loaded", () => {
			const setup = () => {
				const toolConfigurationTemplate: ContextExternalToolConfigurationTemplate =
					contextExternalToolConfigurationTemplateFactory.build();

				useContextExternalToolApiMock.fetchAvailableToolsForContextCall.mockResolvedValue([toolConfigurationTemplate]);

				const composable = useContextExternalToolConfigurationState();

				composable.error.value = {
					statusCode: 418,
					message: "error",
				};

				return {
					toolConfigurationTemplate,
					composable,
				};
			};

			it("should reset the error", async () => {
				const { composable } = setup();

				await composable.fetchAvailableToolConfigurationsForContext("contextId", ToolContextType.COURSE);

				expect(composable.error.value).toBeUndefined();
			});

			it("should call the api for available tools", async () => {
				const { composable } = setup();

				await composable.fetchAvailableToolConfigurationsForContext("contextId", ToolContextType.COURSE);

				expect(useContextExternalToolApiMock.fetchAvailableToolsForContextCall).toHaveBeenCalledWith(
					"contextId",
					ToolContextType.COURSE
				);
			});

			it("should set the available tools in the state", async () => {
				const { composable, toolConfigurationTemplate } = setup();

				await composable.fetchAvailableToolConfigurationsForContext("contextId", ToolContextType.COURSE);

				expect(composable.availableTools.value).toEqual([toolConfigurationTemplate]);
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useContextExternalToolApiMock.fetchAvailableToolsForContextCall.mockRejectedValueOnce(errorResponse);

				const composable = useContextExternalToolConfigurationState();

				return {
					errorResponse,
					apiError,
					composable,
				};
			};

			it("should set the error", async () => {
				const { composable, apiError } = setup();

				await composable.fetchAvailableToolConfigurationsForContext("contextId", ToolContextType.COURSE);

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});
		});
	});

	describe("fetchConfigurationForContextExternalTool", () => {
		describe("when data is loaded", () => {
			const setup = () => {
				const toolConfigurationTemplate: ContextExternalToolConfigurationTemplate =
					contextExternalToolConfigurationTemplateFactory.build();

				useContextExternalToolApiMock.fetchConfigurationTemplateForContextExternalToolCall.mockResolvedValue(
					toolConfigurationTemplate
				);

				const composable = useContextExternalToolConfigurationState();

				composable.error.value = {
					statusCode: 418,
					message: "error",
				};

				return {
					toolConfigurationTemplate,
					composable,
				};
			};

			it("should reset the error", async () => {
				const { composable } = setup();

				await composable.fetchConfigurationForContextExternalTool("contextExternalToolId");

				expect(composable.error.value).toBeUndefined();
			});

			it("should call the api for available tools", async () => {
				const { composable } = setup();

				await composable.fetchConfigurationForContextExternalTool("contextExternalToolId");

				expect(useContextExternalToolApiMock.fetchConfigurationTemplateForContextExternalToolCall).toHaveBeenCalledWith(
					"contextExternalToolId"
				);
			});

			it("should set the available tools in the state", async () => {
				const { composable, toolConfigurationTemplate } = setup();

				await composable.fetchConfigurationForContextExternalTool("contextExternalToolId");

				expect(composable.availableTools.value).toEqual([toolConfigurationTemplate]);
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useContextExternalToolApiMock.fetchConfigurationTemplateForContextExternalToolCall.mockRejectedValueOnce(
					errorResponse
				);

				const composable = useContextExternalToolConfigurationState();

				return {
					errorResponse,
					apiError,
					composable,
				};
			};

			it("should set the error", async () => {
				const { composable, apiError } = setup();

				await composable.fetchConfigurationForContextExternalTool("contextExternalToolId");

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});
		});
	});
});
