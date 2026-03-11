import { useExternalToolApi } from "./ExternalToolApi.composable";
import * as serverApi from "@/serverApi/v3/api";
import {
	ContextExternalToolBodyParams,
	LaunchType,
	ToolContextType,
	ToolLaunchRequestResponse,
} from "@/serverApi/v3/api";
import { ToolLaunchRequest, ToolLaunchRequestMethodEnum } from "@/store/external-tool";
import { mockApi, mockApiResponse, toolLaunchRequestResponseFactory } from "@@/tests/test-utils";
import { Mocked } from "vitest";

describe("ExternalToolApi.composable", () => {
	let toolApi: Mocked<serverApi.ToolApiInterface>;

	beforeEach(() => {
		toolApi = mockApi<serverApi.ToolApiInterface>();

		vi.spyOn(serverApi, "ToolApiFactory").mockReturnValue(toolApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchContextLaunchDataCall", () => {
		const setup = () => {
			const launchRequest: ToolLaunchRequestResponse = toolLaunchRequestResponseFactory.build();

			toolApi.toolLaunchControllerGetContextExternalToolLaunchRequest.mockResolvedValue(
				mockApiResponse({ data: launchRequest })
			);

			return {
				launchRequest,
			};
		};

		it("should call the api for a tool launch request", async () => {
			setup();

			await useExternalToolApi().fetchContextLaunchDataCall("contextExternalToolId");

			expect(toolApi.toolLaunchControllerGetContextExternalToolLaunchRequest).toHaveBeenCalledWith(
				"contextExternalToolId"
			);
		});

		it("should return launch request data", async () => {
			const { launchRequest } = setup();

			const result = await useExternalToolApi().fetchContextLaunchDataCall("contextExternalToolId");

			expect(result).toEqual<ToolLaunchRequest>({
				url: launchRequest.url,
				payload: launchRequest.payload,
				method: ToolLaunchRequestMethodEnum.Get,
				openNewTab: launchRequest.openNewTab,
				launchType: LaunchType.Basic,
			});
		});
	});

	describe("fetchSchoolLaunchDataCall", () => {
		const setup = () => {
			const launchRequest: ToolLaunchRequestResponse = toolLaunchRequestResponseFactory.build();

			const bodyParams: ContextExternalToolBodyParams = {
				contextId: "contextId",
				contextType: ToolContextType.MediaBoard,
			};

			toolApi.toolLaunchControllerGetSchoolExternalToolLaunchRequest.mockResolvedValue(
				mockApiResponse({ data: launchRequest })
			);

			return {
				launchRequest,
				bodyParams,
			};
		};

		it("should call the api for a tool launch request", async () => {
			const { bodyParams } = setup();

			await useExternalToolApi().fetchSchoolLaunchDataCall("schoolExternalToolId", bodyParams);

			expect(toolApi.toolLaunchControllerGetSchoolExternalToolLaunchRequest).toHaveBeenCalledWith(
				"schoolExternalToolId",
				bodyParams
			);
		});

		it("should return launch request data", async () => {
			const { launchRequest, bodyParams } = setup();

			const result = await useExternalToolApi().fetchSchoolLaunchDataCall("contextExternalToolId", bodyParams);

			expect(result).toEqual<ToolLaunchRequest>({
				url: launchRequest.url,
				payload: launchRequest.payload,
				method: ToolLaunchRequestMethodEnum.Get,
				openNewTab: launchRequest.openNewTab,
				launchType: LaunchType.Basic,
			});
		});
	});
});
