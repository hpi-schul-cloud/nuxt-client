import { useSchoolExternalToolApi } from "./SchoolExternalToolApi.composable";
import { SchoolExternalToolMetadataResponse } from "@/generated/serverApi/v3";
import * as serverApi from "@/generated/serverApi/v3";
import { SchoolExternalToolMetadata } from "@/store/external-tool";
import { mockApi, mockApiResponse, schoolExternalToolMetadataResponseFactory } from "@@/tests/test-utils";
import { Mocked } from "vitest";

describe("SchoolExternalToolApi.composable", () => {
	let toolApi: Mocked<serverApi.ToolApiInterface>;

	beforeEach(() => {
		toolApi = mockApi<serverApi.ToolApiInterface>();

		vi.spyOn(serverApi, "ToolApiFactory").mockReturnValue(toolApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchSchoolExternalToolMetadata", () => {
		const setup = () => {
			const request: SchoolExternalToolMetadataResponse = schoolExternalToolMetadataResponseFactory.build();

			toolApi.toolSchoolControllerGetMetaDataForExternalTool.mockResolvedValue(mockApiResponse({ data: request }));

			return {
				request,
			};
		};

		it("should call the api for metadata of schoolExternalTool", async () => {
			setup();

			await useSchoolExternalToolApi().fetchSchoolExternalToolMetadata("schoolExternalToolId");

			expect(toolApi.toolSchoolControllerGetMetaDataForExternalTool).toHaveBeenCalledWith("schoolExternalToolId");
		});

		it("should return metadata", async () => {
			setup();

			const result: SchoolExternalToolMetadata =
				await useSchoolExternalToolApi().fetchSchoolExternalToolMetadata("schoolExternalToolId");

			expect(result).toEqual<SchoolExternalToolMetadata>({
				course: 5,
				boardElement: 6,
				mediaBoard: 0,
			});
		});
	});
});
