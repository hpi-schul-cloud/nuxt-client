import {
	ContextExternalToolBodyParams,
	LaunchType,
	ToolContextType,
} from "@/serverApi/v3";
import {
	ToolLaunchRequest,
	ToolLaunchRequestMethodEnum,
} from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { axiosErrorFactory } from "@@/tests/test-utils";
import { toolLaunchRequestFactory } from "@@/tests/test-utils/factory/toolLaunchRequestFactory";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useExternalToolApi } from "./ExternalToolApi.composable";
import { useExternalToolLaunchState } from "./ExternalToolLaunchState.composable";
import { nextTick } from "vue";

vi.mock("@data-external-tool/ExternalToolApi.composable");

describe("ExternalToolLaunchState.composable", () => {
	let useExternalToolApiMock: DeepMocked<ReturnType<typeof useExternalToolApi>>;

	beforeEach(() => {
		useExternalToolApiMock =
			createMock<ReturnType<typeof useExternalToolApi>>();

		vi.mocked(useExternalToolApi).mockReturnValue(useExternalToolApiMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchContextLaunchRequest", () => {
		describe("when fetching a tool", () => {
			const setup = () => {
				const response = toolLaunchRequestFactory.build();

				useExternalToolApiMock.fetchContextLaunchDataCall.mockResolvedValue(
					response
				);

				return {
					...useExternalToolLaunchState(),
					response,
				};
			};

			it("should load the launch data from the store", async () => {
				const { fetchContextLaunchRequest } = setup();

				await fetchContextLaunchRequest("contextExternalToolId");

				expect(
					useExternalToolApiMock.fetchContextLaunchDataCall
				).toHaveBeenCalledWith("contextExternalToolId");
			});

			it("should save the loaded request in a state", async () => {
				const { fetchContextLaunchRequest, toolLaunchRequest, response } =
					setup();

				await fetchContextLaunchRequest("contextExternalToolId");

				expect(toolLaunchRequest.value).toEqual<ToolLaunchRequest>({
					method: ToolLaunchRequestMethodEnum.Get,
					url: response.url,
					payload: response.payload,
					openNewTab: response.openNewTab,
					launchType: LaunchType.Basic,
				});
			});

			it("should not have an error", async () => {
				const { fetchContextLaunchRequest, error } = setup();

				await fetchContextLaunchRequest("contextExternalToolId");

				expect(error.value).toBeUndefined();
			});
		});

		describe("when an error occurs", () => {
			const setup = () => {
				const axiosError = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(axiosError);

				useExternalToolApiMock.fetchContextLaunchDataCall.mockRejectedValue(
					axiosError
				);

				return {
					...useExternalToolLaunchState(),
					apiError,
				};
			};

			it("should load the launch data from the store", async () => {
				const { fetchContextLaunchRequest, error, apiError } = setup();

				await fetchContextLaunchRequest("contextExternalToolId");

				expect(error.value).toEqual<BusinessError>({
					message: apiError.message,
					statusCode: apiError.code,
					error: apiError,
				});
			});
		});
	});

	describe("fetchSchoolLaunchRequest", () => {
		describe("when fetching a tool", () => {
			const setup = () => {
				const response = toolLaunchRequestFactory.build();

				const bodyParams: ContextExternalToolBodyParams = {
					contextId: "contextId",
					contextType: ToolContextType.MediaBoard,
				};

				useExternalToolApiMock.fetchSchoolLaunchDataCall.mockResolvedValue(
					response
				);

				return {
					...useExternalToolLaunchState(),
					response,
					bodyParams,
				};
			};

			it("should load the launch data from the store", async () => {
				const { fetchSchoolLaunchRequest, bodyParams } = setup();

				await fetchSchoolLaunchRequest("schoolExternalToolId", bodyParams);

				expect(
					useExternalToolApiMock.fetchSchoolLaunchDataCall
				).toHaveBeenCalledWith("schoolExternalToolId", bodyParams);
			});

			it("should save the loaded request in a state", async () => {
				const {
					fetchSchoolLaunchRequest,
					toolLaunchRequest,
					response,
					bodyParams,
				} = setup();

				await fetchSchoolLaunchRequest("schoolExternalToolId", bodyParams);

				expect(toolLaunchRequest.value).toEqual<ToolLaunchRequest>({
					method: ToolLaunchRequestMethodEnum.Get,
					url: response.url,
					payload: response.payload,
					openNewTab: response.openNewTab,
					launchType: response.launchType,
				});
			});

			it("should not have an error", async () => {
				const { fetchSchoolLaunchRequest, error, bodyParams } = setup();

				await fetchSchoolLaunchRequest("schoolExternalToolId", bodyParams);

				expect(error.value).toBeUndefined();
			});
		});

		describe("when an error occurs", () => {
			const setup = () => {
				const axiosError = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(axiosError);

				const bodyParams: ContextExternalToolBodyParams = {
					contextId: "contextId",
					contextType: ToolContextType.MediaBoard,
				};

				useExternalToolApiMock.fetchSchoolLaunchDataCall.mockRejectedValue(
					axiosError
				);

				return {
					...useExternalToolLaunchState(),
					apiError,
					bodyParams,
				};
			};

			it("should load the launch data from the store", async () => {
				const { fetchSchoolLaunchRequest, error, apiError, bodyParams } =
					setup();

				await fetchSchoolLaunchRequest("schoolExternalToolId", bodyParams);

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
			const setup = () => {
				const composable = useExternalToolLaunchState();

				vi.spyOn(window, "open");

				return {
					...composable,
				};
			};

			it("should do nothing", () => {
				const { launchTool } = setup();

				launchTool();

				expect(window.open).not.toHaveBeenCalled();
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

					vi.spyOn(window, "open");

					return {
						...composable,
						launchRequest,
					};
				};

				it("should set the location", () => {
					const { launchRequest, launchTool } = setup();

					launchTool();

					expect(window.open).toHaveBeenCalledWith(launchRequest.url, "_self");
				});
			});

			describe("when opening in a new tab", () => {
				const setup = () => {
					const launchRequest = toolLaunchRequestFactory.build({
						method: ToolLaunchRequestMethodEnum.Get,
						openNewTab: true,
					});

					const composable = useExternalToolLaunchState();
					composable.toolLaunchRequest.value = launchRequest;

					vi.spyOn(window, "open");

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

				it("should create a launch form with a number as the target ", () => {
					const { launchRequest, launchTool } = setup();

					launchTool();

					const form = document.getElementById("launch-form");

					expect(form?.outerHTML).toEqual(
						`<form method="POST" action="${launchRequest.url}" id="launch-form" target="1"></form>`
					);
				});
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
						`<form method="POST" action="${launchRequest.url}" id="launch-form" target="_self"><input type="hidden" name="key" value="value"></form>`
					);
				});
			});

			describe("when opening a tool multiple times", () => {
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

				it("should only leave one form in the DOM", () => {
					const { launchTool } = setup();

					launchTool();
					launchTool();

					const formList = document.querySelectorAll("#launch-form");

					expect(formList).toHaveLength(1);
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

				vi.spyOn(window, "open");

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

				expect(window.open).not.toHaveBeenCalled();
			});
		});

		describe("when the launch is with launchType Lti11ContentItemSelection", () => {
			const setup = () => {
				const refreshCallback = vi.fn();
				const launchRequest = toolLaunchRequestFactory.build({
					method: ToolLaunchRequestMethodEnum.Post,
					openNewTab: true,
					launchType: LaunchType.Lti11ContentItemSelection,
				});

				const composable = useExternalToolLaunchState(refreshCallback);
				composable.toolLaunchRequest.value = launchRequest;

				const mockWindow = {
					closed: false,
				};

				vi.spyOn(window, "open").mockReturnValue(
					mockWindow as unknown as Window
				);

				const setInterval = vi.spyOn(window, "setInterval");
				const clearInterval = vi.spyOn(window, "clearInterval");

				return {
					...composable,
					refreshCallback,
					setInterval,
					clearInterval,
					mockWindow,
				};
			};

			afterEach(() => {
				vi.useRealTimers();
				vi.restoreAllMocks();
			});

			it("should call refreshCallback", async () => {
				vi.useFakeTimers();
				const {
					launchTool,
					refreshCallback,
					mockWindow,
					setInterval,
					clearInterval,
				} = setup();

				launchTool();

				expect(setInterval).toHaveBeenCalled();
				expect(mockWindow.closed).toBe(false);

				mockWindow.closed = true;

				vi.advanceTimersByTime(1000);
				await nextTick();

				expect(refreshCallback).toHaveBeenCalled();
				expect(clearInterval).toHaveBeenCalled();
			});

			it("should not call refreshCallback", async () => {
				vi.useFakeTimers();
				const { launchTool, refreshCallback, mockWindow } = setup();

				launchTool();

				expect(setInterval).toHaveBeenCalled();

				mockWindow.closed = false;

				vi.advanceTimersByTime(1000);
				await nextTick();

				expect(refreshCallback).not.toHaveBeenCalled();
				expect(clearInterval).not.toHaveBeenCalled();
			});
		});
	});
});
