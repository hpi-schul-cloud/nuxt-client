import { createMock, DeepMocked } from "@golevelup/ts-jest";
import * as serverApi from "../../serverApi/v3/api";
import { SchoolExternalToolMetadataResponse } from "../../serverApi/v3/api";
import { mockApiResponse } from "../../../tests/test-utils";
import { useExternalToolApi } from "./ExternalToolApi.composable";
import {
	SchoolExternalToolMetadata,
} from "../../store/external-tool";
import { schoolExternalToolMetadataResponseFactory } from "../../../tests/test-utils/factory/schoolExternalToolMetadataResponseFactory";
import { useSchoolExternalToolApi } from "./SchoolExternalToolApi.composable";

describe("SchoolExternalToolApi.composable", () => {
	let toolApi: DeepMocked<serverApi.ToolApiInterface>;

	beforeEach(() => {
		toolApi = createMock<serverApi.ToolApiInterface>();

		jest.spyOn(serverApi, "ToolApiFactory").mockReturnValue(toolApi);
	});

	afterEach(() => {
		jest.clearAllMocks();
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

			await useExternalToolApi().fetchLaunchDataCall("contextExternalToolId");

			expect(
				toolApi.toolLaunchControllerGetToolLaunchRequest
			).toHaveBeenCalledWith("contextExternalToolId");
		});

		it("should return metadata", async () => {
			const { request } = setup();

			const result: SchoolExternalToolMetadata =
				await useSchoolExternalToolApi().fetchSchoolExternalToolMetadata(
					"schoolExternalToolId"
				);

			expect(result).toEqual<SchoolExternalToolMetadata>({
				course: 5,
				boardElement: 6,
			});
		});
	});
});
