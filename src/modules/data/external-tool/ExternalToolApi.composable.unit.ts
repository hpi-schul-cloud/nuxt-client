import * as serverApi from "@/serverApi/v3/api";
import {
	ContextExternalToolBodyParams,
	LaunchType,
	ToolContextType,
	ToolLaunchRequestResponse,
} from "@/serverApi/v3/api";
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

		vi.spyOn(serverApi, "ToolApiFactory").mockReturnValue(toolApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
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
				launchType: LaunchType.Basic,
			});
		});
	});

	describe("fetchSchoolLaunchDataCall", () => {
		const setup = () => {
			const launchRequest: ToolLaunchRequestResponse =
				toolLaunchRequestResponseFactory.build();

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

			await useExternalToolApi().fetchSchoolLaunchDataCall(
				"schoolExternalToolId",
				bodyParams
			);

			expect(
				toolApi.toolLaunchControllerGetSchoolExternalToolLaunchRequest
			).toHaveBeenCalledWith("schoolExternalToolId", bodyParams);
		});

		it("should return launch request data", async () => {
			const { launchRequest, bodyParams } = setup();

			const result: ToolLaunchRequest =
				await useExternalToolApi().fetchSchoolLaunchDataCall(
					"contextExternalToolId",
					bodyParams
				);

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
