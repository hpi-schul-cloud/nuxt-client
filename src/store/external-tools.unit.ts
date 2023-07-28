import { ToolApiInterface, ToolLaunchRequestResponse } from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import {
	axiosErrorFactory,
	toolLaunchRequestResponeFactory,
} from "@@/tests/test-utils/factory";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mockApiResponse } from "@@/tests/test-utils";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import ExternalToolsModule from "./external-tools";
import { BusinessError } from "./types/commons";

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

	describe("actions", () => {
		describe("loadToolLaunchData is called", () => {
			describe("when receiving an api response", () => {
				const setup = () => {
					const mockResponse: ToolLaunchRequestResponse =
						toolLaunchRequestResponeFactory.build();

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

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.toolLaunchControllerGetToolLaunchRequest.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await module.loadToolLaunchData("contextToolId");

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});
	});
});
