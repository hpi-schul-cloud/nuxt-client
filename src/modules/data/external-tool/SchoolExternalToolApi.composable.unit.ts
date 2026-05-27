import { useSchoolExternalToolApi } from "./SchoolExternalToolApi.composable";
import { SchoolExternalToolMetadata } from "./types";
import { mockApi, mockApiResponse, schoolExternalToolMetadataResponseFactory } from "@@/tests/test-utils";
import * as serverApi from "@api-server";
import { SchoolExternalToolMetadataResponse } from "@api-server";
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
