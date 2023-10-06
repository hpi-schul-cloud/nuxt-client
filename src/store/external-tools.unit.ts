import { ToolApiInterface, ToolLaunchRequestResponse } from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { toolLaunchRequestResponseFactory } from "@@/tests/test-utils/factory";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mockApiResponse } from "@@/tests/test-utils";
import ExternalToolsModule from "./external-tools";

describe("ExternalToolsModule", () => {
	let module: ExternalToolsModule;

	let apiMock: DeepMocked<ToolApiInterface>;

	beforeEach(() => {
		module = new ExternalToolsModule({});

		apiMock = createMock<ToolApiInterface>();

		jest.spyOn(serverApi, "ToolApiFactory").mockReturnValue(apiMock);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("mutations", () => {
		describe("setLoading", () => {
			it("should set the loading state", () => {
				module.setLoading(true);

				expect(module.getLoading).toBeTruthy();
			});
		});
	});

	describe("actions", () => {
		describe("loadToolLaunchData is called", () => {
			describe("when receiving an api response", () => {
				const setup = () => {
					const mockResponse: ToolLaunchRequestResponse =
						toolLaunchRequestResponseFactory.build();

					apiMock.toolLaunchControllerGetToolLaunchRequest.mockResolvedValue(
						mockApiResponse({
							data: mockResponse,
						})
					);

					return {
						mockResponse,
					};
				};

				it("should call the api", async () => {
					setup();

					await module.loadToolLaunchData("contextToolId");

					expect(
						apiMock.toolLaunchControllerGetToolLaunchRequest
					).toHaveBeenCalledWith("contextToolId");
				});

				it("should return a response", async () => {
					const { mockResponse } = setup();

					const response: ToolLaunchRequestResponse | undefined =
						await module.loadToolLaunchData("contextToolId");

					expect(response).toEqual(mockResponse);
				});
			});
		});
	});
});
