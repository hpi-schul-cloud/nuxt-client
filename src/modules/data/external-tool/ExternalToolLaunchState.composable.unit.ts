import {
	ToolLaunchRequest,
	ToolLaunchRequestMethodEnum,
} from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { toolLaunchRequestFactory } from "@@/tests/test-utils/factory/toolLaunchRequestFactory";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { axiosErrorFactory } from "../../../tests/test-utils";
import { mapAxiosErrorToResponseError } from "../../utils/api";
import { useExternalToolApi } from "./ExternalToolApi.composable";
import { useExternalToolLaunchState } from "./ExternalToolLaunchState.composable";

jest.mock("@data-external-tool/ExternalToolApi.composable");

Object.defineProperty(window, "location", {
	configurable: true,
	writable: false,
	value: {
		href: "",
	},
});

describe("ExternalToolLaunchState.composable", () => {
	let useExternalToolApiMock: DeepMocked<ReturnType<typeof useExternalToolApi>>;

	beforeEach(() => {
		useExternalToolApiMock =
			createMock<ReturnType<typeof useExternalToolApi>>();

		jest.mocked(useExternalToolApi).mockReturnValue(useExternalToolApiMock);
	});

	afterEach(() => {
		jest.clearAllMocks();

		window.location.href = "";
	});

	describe("fetchLaunchRequest", () => {
		describe("when fetching a tool", () => {
			const setup = () => {
				const response = toolLaunchRequestFactory.build();

				useExternalToolApiMock.fetchLaunchDataCall.mockResolvedValue(response);

				return {
					...useExternalToolLaunchState(),
					response,
				};
			};

			it("should load the launch data from the store", async () => {
				const { fetchLaunchRequest } = setup();

				await fetchLaunchRequest("contextExternalToolId");

				expect(useExternalToolApiMock.fetchLaunchDataCall).toHaveBeenCalledWith(
					"contextExternalToolId"
				);
			});

			it("should save the loaded request in a state", async () => {
				const { fetchLaunchRequest, toolLaunchRequest, response } = setup();

				await fetchLaunchRequest("contextExternalToolId");

				expect(toolLaunchRequest.value).toEqual<ToolLaunchRequest>({
					method: ToolLaunchRequestMethodEnum.Get,
					url: response.url,
					payload: response.payload,
					openNewTab: response.openNewTab,
				});
			});

			it("should not have an error", async () => {
				const { fetchLaunchRequest, error } = setup();

				await fetchLaunchRequest("contextExternalToolId");

				expect(error.value).toBeUndefined();
			});
		});

		describe("when an error occurs", () => {
			const setup = () => {
				const axiosError = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(axiosError);

				useExternalToolApiMock.fetchLaunchDataCall.mockRejectedValue(
					axiosError
				);

				return {
					...useExternalToolLaunchState(),
					apiError,
				};
			};

			it("should load the launch data from the store", async () => {
				const { fetchLaunchRequest, error, apiError } = setup();

				await fetchLaunchRequest("contextExternalToolId");

				expect(error.value).toEqual<BusinessError>({
					message: apiError.message,
					statusCode: apiError.code,
					error: apiError,
				});
			});
		});
	});

	describe("launchTool", () => {
		describe("when launching without loading", () => {
			it("should do nothing", () => {
				const { launchTool } = useExternalToolLaunchState();

				launchTool();

				expect(window.location.href).toEqual("");
			});
		});

		describe("when launching a tool with get method", () => {
			describe("when opening in the same tab", () => {
				const setup = () => {
					const launchRequest = toolLaunchRequestFactory.build({
						method: ToolLaunchRequestMethodEnum.Get,
						openNewTab: false,
					});

					const composable = useExternalToolLaunchState();
					composable.toolLaunchRequest.value = launchRequest;

					return {
						...composable,
						launchRequest,
					};
				};

				it("should set the location", () => {
					const { launchRequest, launchTool } = setup();

					launchTool();

					expect(window.location.href).toEqual(launchRequest.url);
				});
			});

			describe("when opening in a new tab", () => {
				const setup = () => {
					jest.spyOn(window, "open");
					const launchRequest = toolLaunchRequestFactory.build({
						method: ToolLaunchRequestMethodEnum.Get,
						openNewTab: true,
					});

					const composable = useExternalToolLaunchState();
					composable.toolLaunchRequest.value = launchRequest;

					return {
						...composable,
						launchRequest,
					};
				};

				it("should open in a new tab", () => {
					const { launchRequest, launchTool } = setup();

					launchTool();

					expect(window.open).toHaveBeenCalledWith(launchRequest.url, "_blank");
				});
			});
		});

		describe("when launching a tool with post method", () => {
			afterEach(() => {
				document.getElementById("launch-form")?.remove();
			});

			describe("when opening in the same tab", () => {
				const setup = () => {
					const launchRequest = toolLaunchRequestFactory.build({
						method: ToolLaunchRequestMethodEnum.Post,
						openNewTab: false,
					});

					const composable = useExternalToolLaunchState();
					composable.toolLaunchRequest.value = launchRequest;

					return {
						...composable,
						launchRequest,
					};
				};

				it("should create a launch form with target _self", () => {
					const { launchRequest, launchTool } = setup();

					launchTool();

					const form = document.getElementById("launch-form");

					expect(form?.outerHTML).toEqual(
						`<form method="POST" action="${launchRequest.url}" target="_self" id="launch-form"><input type="hidden" name="key" value="value"></form>`
					);
				});
			});

			describe("when opening in a new tab", () => {
				const setup = () => {
					const launchRequest = toolLaunchRequestFactory.build({
						method: ToolLaunchRequestMethodEnum.Post,
						openNewTab: true,
						payload: "",
					});

					const composable = useExternalToolLaunchState();
					composable.toolLaunchRequest.value = launchRequest;

					return {
						...composable,
						launchRequest,
					};
				};

				it("should create a launch form with target _blank", () => {
					const { launchRequest, launchTool } = setup();

					launchTool();

					const form = document.getElementById("launch-form");

					expect(form?.outerHTML).toEqual(
						`<form method="POST" action="${launchRequest.url}" target="_blank" id="launch-form"></form>`
					);
				});
			});
		});

		describe("when the launch method is unknown", () => {
			const setup = () => {
				const launchRequest = toolLaunchRequestFactory.build({
					method: "unknown" as unknown as ToolLaunchRequestMethodEnum,
				});

				const composable = useExternalToolLaunchState();
				composable.toolLaunchRequest.value = launchRequest;

				return {
					...composable,
					launchRequest,
				};
			};

			it("should set an error", () => {
				const { error, launchTool } = setup();

				launchTool();

				expect(error.value).toEqual<BusinessError>({
					message: "Unknown launch method",
					statusCode: HttpStatusCode.UnprocessableEntity,
				});
			});

			it("should not redirect", () => {
				const { launchTool } = setup();

				launchTool();

				expect(window.location.href).toEqual("");
			});
		});
	});
});
