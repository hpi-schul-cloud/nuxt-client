import * as serverApi from "@/serverApi/v3/api";
import { ToolLaunchRequestResponse } from "@/serverApi/v3/api";
import {
	ToolLaunchRequest,
	ToolLaunchRequestMethodEnum,
} from "@/store/external-tool";
import {
	mockApiResponse,
	toolLaunchRequestResponseFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useExternalToolApi } from "./ExternalToolApi.composable";

describe("ExternalToolApi.composable", () => {
	let toolApi: DeepMocked<serverApi.ToolApiInterface>;

	beforeEach(() => {
		toolApi = createMock<serverApi.ToolApiInterface>();

		jest.spyOn(serverApi, "ToolApiFactory").mockReturnValue(toolApi);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("fetchContextLaunchDataCall", () => {
		const setup = () => {
			const launchRequest: ToolLaunchRequestResponse =
				toolLaunchRequestResponseFactory.build();

			toolApi.toolLaunchControllerGetContextExternalToolLaunchRequest.mockResolvedValue(
				mockApiResponse({ data: launchRequest })
			);

			return {
				launchRequest,
			};
		};

		it("should call the api for a tool launch request", async () => {
			setup();

			await useExternalToolApi().fetchContextLaunchDataCall(
				"contextExternalToolId"
			);

			expect(
				toolApi.toolLaunchControllerGetContextExternalToolLaunchRequest
			).toHaveBeenCalledWith("contextExternalToolId");
		});

		it("should return launch request data", async () => {
			const { launchRequest } = setup();

			const result: ToolLaunchRequest =
				await useExternalToolApi().fetchContextLaunchDataCall(
					"contextExternalToolId"
				);

			expect(result).toEqual<ToolLaunchRequest>({
				url: launchRequest.url,
				payload: launchRequest.payload,
				method: ToolLaunchRequestMethodEnum.Get,
				openNewTab: launchRequest.openNewTab,
			});
		});
	});

	// TODO N21-1889 Create test for fetchSchoolLaunchDataCall
});
