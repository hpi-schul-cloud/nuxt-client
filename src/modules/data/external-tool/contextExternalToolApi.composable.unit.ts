import * as serverApi from "@/serverApi/v3/api";
import {
	ContextExternalToolConfigurationTemplateResponse,
	ContextExternalToolPostParams,
	ContextExternalToolResponse,
	ToolContextType,
} from "@/serverApi/v3/api";
import {
	contextExternalToolConfigurationTemplateResponseFactory,
	contextExternalToolFactory,
	contextExternalToolResponseFactory,
	mockApiResponse,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import {
	ContextExternalToolMapper,
	ToolContextMapping,
} from "./context-external-tool.mapper";
import { useContextExternalToolApi } from "./contextExternalToolApi.composable";
import {
	ContextExternalTool,
	ContextExternalToolConfigurationTemplate,
	ContextExternalToolSave,
} from "./types";

describe("contextExternalToolApi.composable", () => {
	let toolApi: DeepMocked<serverApi.ToolApiInterface>;

	beforeEach(() => {
		toolApi = createMock<serverApi.ToolApiInterface>();

		vi.spyOn(serverApi, "ToolApiFactory").mockReturnValue(toolApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchContextExternalToolCall", () => {
		const setup = () => {
			const contextExternalTool: ContextExternalToolResponse =
				contextExternalToolResponseFactory.build();

			toolApi.toolContextControllerGetContextExternalTool.mockResolvedValue(
				mockApiResponse({ data: contextExternalTool })
			);

			return {
				contextExternalTool,
			};
		};

		it("should call the api", async () => {
			setup();

			await useContextExternalToolApi().fetchContextExternalToolCall(
				"contextExternalToolId"
			);

			expect(
				toolApi.toolContextControllerGetContextExternalTool
			).toHaveBeenCalledWith("contextExternalToolId");
		});

		it("should return a context external tool", async () => {
			const { contextExternalTool } = setup();

			const result: ContextExternalTool =
				await useContextExternalToolApi().fetchContextExternalToolCall(
					"contextExternalToolId"
				);

			expect(result).toEqual<ContextExternalTool>({
				id: contextExternalTool.id,
				displayName: contextExternalTool.displayName,
				contextId: contextExternalTool.contextId,
				contextType: ToolContextMapping[contextExternalTool.contextType],
				parameters: contextExternalTool.parameters,
				schoolToolId: contextExternalTool.schoolToolId,
			});
		});
	});

	describe("createContextExternalToolCall", () => {
		const setup = () => {
			const contextExternalToolResponse: ContextExternalToolResponse =
				contextExternalToolResponseFactory.build();
			const contextExternalTool: ContextExternalToolSave =
				contextExternalToolFactory.build({ id: undefined });

			toolApi.toolContextControllerCreateContextExternalTool.mockResolvedValue(
				mockApiResponse({ data: contextExternalToolResponse })
			);

			return {
				contextExternalToolResponse,
				contextExternalTool,
			};
		};

		it("should call the api", async () => {
			const { contextExternalTool } = setup();

			await useContextExternalToolApi().createContextExternalToolCall(
				contextExternalTool
			);

			expect(
				toolApi.toolContextControllerCreateContextExternalTool
			).toHaveBeenCalledWith<[ContextExternalToolPostParams]>(
				contextExternalTool
			);
		});

		it("should return a context external tool", async () => {
			const { contextExternalTool, contextExternalToolResponse } = setup();

			const result: ContextExternalTool =
				await useContextExternalToolApi().createContextExternalToolCall(
					contextExternalTool
				);

			expect(result).toEqual<ContextExternalTool>({
				id: contextExternalToolResponse.id,
				displayName: contextExternalToolResponse.displayName,
				contextId: contextExternalToolResponse.contextId,
				contextType:
					ToolContextMapping[contextExternalToolResponse.contextType],
				parameters: contextExternalToolResponse.parameters,
				schoolToolId: contextExternalToolResponse.schoolToolId,
			});
		});
	});

	describe("updateContextExternalToolCall", () => {
		const setup = () => {
			const contextExternalToolResponse: ContextExternalToolResponse =
				contextExternalToolResponseFactory.build();
			const contextExternalTool: ContextExternalToolSave =
				contextExternalToolFactory.build({ id: undefined });

			toolApi.toolContextControllerUpdateContextExternalTool.mockResolvedValue(
				mockApiResponse({ data: contextExternalToolResponse })
			);

			return {
				contextExternalToolResponse,
				contextExternalTool,
			};
		};

		it("should call the api", async () => {
			const { contextExternalTool, contextExternalToolResponse } = setup();

			await useContextExternalToolApi().updateContextExternalToolCall(
				contextExternalToolResponse.id,
				contextExternalTool
			);

			expect(
				toolApi.toolContextControllerUpdateContextExternalTool
			).toHaveBeenCalledWith<[string, ContextExternalToolPostParams]>(
				contextExternalToolResponse.id,
				contextExternalTool
			);
		});

		it("should return a context external tool", async () => {
			const { contextExternalTool, contextExternalToolResponse } = setup();

			const result: ContextExternalTool =
				await useContextExternalToolApi().updateContextExternalToolCall(
					contextExternalToolResponse.id,
					contextExternalTool
				);

			expect(result).toEqual<ContextExternalTool>({
				id: contextExternalToolResponse.id,
				displayName: contextExternalToolResponse.displayName,
				contextId: contextExternalToolResponse.contextId,
				contextType:
					ToolContextMapping[contextExternalToolResponse.contextType],
				parameters: contextExternalToolResponse.parameters,
				schoolToolId: contextExternalToolResponse.schoolToolId,
			});
		});
	});

	describe("deleteContextExternalToolCall", () => {
		it("should call the api", async () => {
			await useContextExternalToolApi().deleteContextExternalToolCall(
				"contextExternalToolId"
			);

			expect(
				toolApi.toolContextControllerDeleteContextExternalTool
			).toHaveBeenCalledWith("contextExternalToolId");
		});
	});

	describe("fetchAvailableToolsForContextCall", () => {
		const setup = () => {
			const contextExternalToolTemplate: ContextExternalToolConfigurationTemplateResponse =
				contextExternalToolConfigurationTemplateResponseFactory.build();

			toolApi.toolConfigurationControllerGetAvailableToolsForContext.mockResolvedValue(
				mockApiResponse({ data: { data: [contextExternalToolTemplate] } })
			);

			return {
				contextExternalToolTemplate,
			};
		};

		it("should call the api", async () => {
			setup();

			await useContextExternalToolApi().fetchAvailableToolsForContextCall(
				"contextId",
				ToolContextType.Course
			);

			expect(
				toolApi.toolConfigurationControllerGetAvailableToolsForContext
			).toHaveBeenCalledWith(ToolContextType.Course, "contextId");
		});

		it("should return a list of context external tool configuration templates", async () => {
			const { contextExternalToolTemplate } = setup();

			const result: ContextExternalToolConfigurationTemplate[] =
				await useContextExternalToolApi().fetchAvailableToolsForContextCall(
					"contextId",
					ToolContextType.Course
				);

			expect(result).toEqual<ContextExternalToolConfigurationTemplate[]>(
				ContextExternalToolMapper.mapToContextExternalToolConfigurationTemplateList(
					{ data: [contextExternalToolTemplate] }
				)
			);
		});
	});

	describe("fetchConfigurationTemplateForContextExternalToolCall", () => {
		const setup = () => {
			const contextExternalToolTemplate: ContextExternalToolConfigurationTemplateResponse =
				contextExternalToolConfigurationTemplateResponseFactory.build();

			toolApi.toolConfigurationControllerGetConfigurationTemplateForContext.mockResolvedValue(
				mockApiResponse({ data: contextExternalToolTemplate })
			);

			return {
				contextExternalToolTemplate,
			};
		};

		it("should call the api", async () => {
			setup();

			await useContextExternalToolApi().fetchConfigurationTemplateForContextExternalToolCall(
				"contextExternalToolId"
			);

			expect(
				toolApi.toolConfigurationControllerGetConfigurationTemplateForContext
			).toHaveBeenCalledWith("contextExternalToolId");
		});

		it("should return a list of context external tool configuration templates", async () => {
			const { contextExternalToolTemplate } = setup();

			const result: ContextExternalToolConfigurationTemplate =
				await useContextExternalToolApi().fetchConfigurationTemplateForContextExternalToolCall(
					"contextExternalToolId"
				);

			expect(result).toEqual<ContextExternalToolConfigurationTemplate>(
				ContextExternalToolMapper.mapToContextExternalToolConfigurationTemplate(
					contextExternalToolTemplate
				)
			);
		});
	});

	describe("fetchPreferredTools", () => {
		it("should call the api", async () => {
			await useContextExternalToolApi().fetchPreferredTools(
				ToolContextType.BoardElement
			);

			expect(
				toolApi.toolConfigurationControllerGetPreferredToolsForContext
			).toHaveBeenCalledWith(ToolContextType.BoardElement);
		});
	});
});
