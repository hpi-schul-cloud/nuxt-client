import * as serverApi from "@/serverApi/v3/api";
import { ToolContextType, ToolReferenceResponse } from "@/serverApi/v3/api";
import {
	ContextExternalToolConfigurationStatusFactory,
	mockApiResponse,
	toolReferenceResponseFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useExternalToolReferenceApi } from "./externalToolReferenceApi.composable";
import { ExternalToolDisplayData } from "./types";

describe("externalToolReferenceApi.composable", () => {
	let toolApi: DeepMocked<serverApi.ToolApiInterface>;

	beforeEach(() => {
		toolApi = createMock<serverApi.ToolApiInterface>();

		jest.spyOn(serverApi, "ToolApiFactory").mockReturnValue(toolApi);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("fetchDisplayDataCall", () => {
		const setup = () => {
			const displayData: ToolReferenceResponse =
				toolReferenceResponseFactory.build({ logoUrl: "mockLogoUrl" });

			toolApi.toolReferenceControllerGetToolReference.mockResolvedValue(
				mockApiResponse({ data: displayData })
			);

			return {
				displayData,
			};
		};

		it("should call the api for tool references", async () => {
			setup();

			await useExternalToolReferenceApi().fetchDisplayDataCall(
				"contextExternalToolId"
			);

			expect(
				toolApi.toolReferenceControllerGetToolReference
			).toHaveBeenCalledWith("contextExternalToolId");
		});

		it("should return an display data", async () => {
			const { displayData } = setup();

			const result: ExternalToolDisplayData =
				await useExternalToolReferenceApi().fetchDisplayDataCall(
					"contextExternalToolId"
				);

			expect(result).toEqual<ExternalToolDisplayData>({
				contextExternalToolId: displayData.contextToolId,
				name: displayData.displayName,
				logoUrl: displayData.logoUrl,
				status: ContextExternalToolConfigurationStatusFactory.build(),
				openInNewTab: displayData.openInNewTab,
			});
		});
	});

	describe("fetchDisplayDataForContext", () => {
		const setup = () => {
			const displayData: ToolReferenceResponse =
				toolReferenceResponseFactory.build({ logoUrl: "mockLogoUrl" });

			toolApi.toolReferenceControllerGetToolReferencesForContext.mockResolvedValue(
				mockApiResponse({ data: { data: [displayData] } })
			);

			return {
				displayData,
			};
		};

		it("should call the api for tool references", async () => {
			setup();

			await useExternalToolReferenceApi().fetchDisplayDataForContext(
				"contextId",
				ToolContextType.Course
			);

			expect(
				toolApi.toolReferenceControllerGetToolReferencesForContext
			).toHaveBeenCalledWith("contextId", ToolContextType.Course);
		});

		it("should return an array of display data", async () => {
			const { displayData } = setup();

			const result: ExternalToolDisplayData[] =
				await useExternalToolReferenceApi().fetchDisplayDataForContext(
					"contextId",
					ToolContextType.Course
				);

			expect(result).toEqual<ExternalToolDisplayData[]>([
				{
					contextExternalToolId: displayData.contextToolId,
					name: displayData.displayName,
					logoUrl: displayData.logoUrl,
					status: ContextExternalToolConfigurationStatusFactory.build(),
					openInNewTab: displayData.openInNewTab,
				},
			]);
		});
	});
});
