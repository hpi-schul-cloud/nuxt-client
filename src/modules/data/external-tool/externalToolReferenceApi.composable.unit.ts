import { useExternalToolReferenceApi } from "./externalToolReferenceApi.composable";
import { ExternalToolDisplayData } from "./types";
import {
	contextExternalToolConfigurationStatusFactory,
	mockApi,
	mockApiResponse,
	toolReferenceResponseFactory,
} from "@@/tests/test-utils";
import * as serverApi from "@api-server";
import { ToolContextType, ToolReferenceResponse } from "@api-server";
import { Mocked } from "vitest";

describe("externalToolReferenceApi.composable", () => {
	let toolApi: Mocked<serverApi.ToolApiInterface>;

	beforeEach(() => {
		toolApi = mockApi<serverApi.ToolApiInterface>();

		vi.spyOn(serverApi, "ToolApiFactory").mockReturnValue(toolApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchDisplayDataCall", () => {
		const setup = () => {
			const displayData: ToolReferenceResponse = toolReferenceResponseFactory.build({ logoUrl: "mockLogoUrl" });

			toolApi.toolReferenceControllerGetToolReference.mockResolvedValue(mockApiResponse({ data: displayData }));

			return {
				displayData,
			};
		};

		it("should call the api for tool references", async () => {
			setup();

			await useExternalToolReferenceApi().fetchDisplayDataCall("contextExternalToolId");

			expect(toolApi.toolReferenceControllerGetToolReference).toHaveBeenCalledWith("contextExternalToolId");
		});

		it("should return an display data", async () => {
			const { displayData } = setup();

			const result = await useExternalToolReferenceApi().fetchDisplayDataCall("contextExternalToolId");

			expect(result).toEqual<ExternalToolDisplayData>({
				contextExternalToolId: displayData.contextToolId,
				name: displayData.displayName,
				domain: displayData.domain,
				logoUrl: displayData.logoUrl,
				status: contextExternalToolConfigurationStatusFactory.build(),
				openInNewTab: displayData.openInNewTab,
				isLtiDeepLinkingTool: displayData.isLtiDeepLinkingTool,
			});
		});
	});

	describe("fetchDisplayDataForContext", () => {
		const setup = () => {
			const displayData: ToolReferenceResponse = toolReferenceResponseFactory.build({ logoUrl: "mockLogoUrl" });

			toolApi.toolReferenceControllerGetToolReferencesForContext.mockResolvedValue(
				mockApiResponse({ data: { data: [displayData] } })
			);

			return {
				displayData,
			};
		};

		it("should call the api for tool references", async () => {
			setup();

			await useExternalToolReferenceApi().fetchDisplayDataForContext("contextId", ToolContextType.COURSE);

			expect(toolApi.toolReferenceControllerGetToolReferencesForContext).toHaveBeenCalledWith(
				"contextId",
				ToolContextType.COURSE
			);
		});

		it("should return an array of display data", async () => {
			const { displayData } = setup();

			const result: ExternalToolDisplayData[] = await useExternalToolReferenceApi().fetchDisplayDataForContext(
				"contextId",
				ToolContextType.COURSE
			);

			expect(result).toEqual<ExternalToolDisplayData[]>([
				{
					contextExternalToolId: displayData.contextToolId,
					name: displayData.displayName,
					domain: displayData.domain,
					logoUrl: displayData.logoUrl,
					status: contextExternalToolConfigurationStatusFactory.build(),
					openInNewTab: displayData.openInNewTab,
					isLtiDeepLinkingTool: displayData.isLtiDeepLinkingTool,
				},
			]);
		});
	});
});
