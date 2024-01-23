import * as serverApi from "@/serverApi/v3/api";
import { ToolReferenceResponse } from "@/serverApi/v3/api";
import { ExternalToolDisplayData } from "@/store/external-tool";
import {
	ContextExternalToolConfigurationStatusFactory,
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

			toolApi.toolReferenceControllerGetToolReference.mockResolvedValue(
				mockApiResponse({ data: displayData })
			);

			return {
				displayData,
			};
		};

		it("should call the api for tool references", async () => {
			setup();

			await useContextExternalToolApi().fetchDisplayDataCall(
				"contextExternalToolId"
			);

			expect(
				toolApi.toolReferenceControllerGetToolReference
			).toHaveBeenCalledWith("contextExternalToolId");
		});

		it("should return an array of display data", async () => {
			const { displayData } = setup();

			const result: ExternalToolDisplayData =
				await useContextExternalToolApi().fetchDisplayDataCall(
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
});
