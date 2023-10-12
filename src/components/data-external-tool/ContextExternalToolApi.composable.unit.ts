import * as serverApi from "@/serverApi/v3/api";
import { ToolContextType, ToolReferenceResponse } from "@/serverApi/v3/api";
import {
	ExternalToolDisplayData,
	ToolConfigurationStatus,
} from "@/store/external-tool";
import {
	mockApiResponse,
	toolReferenceResponseFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useContextExternalToolApi } from "./ContextExternalToolApi.composable";

describe("ContextExternalToolApi.composable", () => {
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

			toolApi.toolControllerGetToolReferences.mockResolvedValue(
				mockApiResponse({ data: { data: [displayData] } })
			);

			return {
				displayData,
			};
		};

		it("should call the api for tool references", async () => {
			setup();

			await useContextExternalToolApi().fetchDisplayDataCall(
				"cardId",
				ToolContextType.BoardCard
			);

			expect(toolApi.toolControllerGetToolReferences).toHaveBeenCalledWith(
				"cardId",
				ToolContextType.BoardCard
			);
		});

		it("should return an array of display data", async () => {
			const { displayData } = setup();

			const result: ExternalToolDisplayData[] =
				await useContextExternalToolApi().fetchDisplayDataCall(
					"courseId",
					ToolContextType.Course
				);

			expect(result).toEqual<ExternalToolDisplayData[]>([
				{
					contextExternalToolId: displayData.contextToolId,
					name: displayData.displayName,
					logoUrl: displayData.logoUrl,
					status: ToolConfigurationStatus.Latest,
					openInNewTab: displayData.openInNewTab,
				},
			]);
		});
	});
});
