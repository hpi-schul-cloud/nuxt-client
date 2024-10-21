import { SchoolExternalToolMetadataResponse } from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { SchoolExternalToolMetadata } from "@/store/external-tool";
import {
	mockApiResponse,
	schoolExternalToolMetadataResponseFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useSchoolExternalToolApi } from "./SchoolExternalToolApi.composable";

describe("SchoolExternalToolApi.composable", () => {
	let toolApi: DeepMocked<serverApi.ToolApiInterface>;

	beforeEach(() => {
		toolApi = createMock<serverApi.ToolApiInterface>();

		vi.spyOn(serverApi, "ToolApiFactory").mockReturnValue(toolApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchSchoolExternalToolMetadata", () => {
		const setup = () => {
			const request: SchoolExternalToolMetadataResponse =
				schoolExternalToolMetadataResponseFactory.build();

			toolApi.toolSchoolControllerGetMetaDataForExternalTool.mockResolvedValue(
				mockApiResponse({ data: request })
			);

			return {
				request,
			};
		};

		it("should call the api for metadata of schoolExternalTool", async () => {
			setup();

			await useSchoolExternalToolApi().fetchSchoolExternalToolMetadata(
				"schoolExternalToolId"
			);

			expect(
				toolApi.toolSchoolControllerGetMetaDataForExternalTool
			).toHaveBeenCalledWith("schoolExternalToolId");
		});

		it("should return metadata", async () => {
			setup();

			const result: SchoolExternalToolMetadata =
				await useSchoolExternalToolApi().fetchSchoolExternalToolMetadata(
					"schoolExternalToolId"
				);

			expect(result).toEqual<SchoolExternalToolMetadata>({
				course: 5,
				boardElement: 6,
				mediaBoard: 0,
			});
		});
	});
});
