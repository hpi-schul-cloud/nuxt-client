import { $axios, initializeAxios, mapAxiosErrorToResponseError } from "./api";
import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { axiosErrorFactory } from "@@/tests/test-utils/factory/axiosErrorFactory";
import { mount } from "@vue/test-utils";
import axios, { AxiosResponse, isAxiosError } from "axios";

vi.mock("axios");
const mockedIsAxiosError = vi.mocked(isAxiosError);

describe("AxiosInstance", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("initializeAxios", () => {
		it("should set $axios", () => {
			initializeAxios(axios);

			expect($axios).toBe(axios);
		});

		it("should set $axios with response interceptor when provided", async () => {
			const responseInterceptor = vi.fn();
			await initializeAxios(axios, responseInterceptor);

			expect($axios).toBe(axios);
		});

		it("should set Vue.prototype.$axios", () => {
			const wrapper = mount({
				setup() {
					initializeAxios(axios);
				},
				template: `<div></div>`,
			});

			expect(wrapper.vm.$axios).toBe(axios);
		});
	});

	describe("response interceptor", () => {
		let mockAxios: typeof axios;

		beforeEach(() => {
			mockAxios = {
				interceptors: {
					response: {
						use: vi.fn().mockReturnValue(1),
						eject: vi.fn(),
						clear: vi.fn(),
					},
				},
				get: vi.fn(),
			} as unknown as typeof axios;

			vi.clearAllMocks();
		});

		describe("when errorHandler is provided", () => {
			describe("when the response is successful", () => {
				it.each([
					{ status: 200, statusText: "OK" },
					{ status: 201, statusText: "Created" },
					{ status: 204, statusText: "No Content" },
				])("should return HTTP $status response without calling errorHandler", async ({ status, statusText }) => {
					const mockErrorHandler = vi.fn();
					await initializeAxios(mockAxios, mockErrorHandler);

					const successHandler = vi.mocked(mockAxios.interceptors.response.use).mock.calls[0][0];
					const testResponse = {
						data: "Test data",
						status,
						statusText,
						headers: {},
						config: {},
						request: {},
					} as AxiosResponse;

					if (successHandler) {
						const result = successHandler(testResponse);
						expect(result).toBe(testResponse);
						expect(mockErrorHandler).not.toHaveBeenCalled();
					}
				});
			});

			describe("when the response is not successful", () => {
				it.each([
					{ status: 401, statusText: "Unauthorized", errorCode: "UNAUTHORIZED" },
					{ status: 403, statusText: "Forbidden", errorCode: "FORBIDDEN" },
					{ status: 404, statusText: "Not Found", errorCode: "NOT_FOUND" },
					{ status: 500, statusText: "Internal Server Error", errorCode: "INTERNAL_SERVER_ERROR" },
				])("should call failureHandler for HTTP $status", async ({ status, statusText, errorCode }) => {
					const mockErrorHandler = vi.fn();
					await initializeAxios(mockAxios, mockErrorHandler);

					const errorHandler = vi.mocked(mockAxios.interceptors.response.use).mock.calls[0][1];
					const testError = Object.assign(new Error(`HTTP ${status}: ${statusText}`), {
						code: errorCode,
						response: { status, statusText },
					});

					expect(errorHandler).toBeTypeOf("function");

					if (errorHandler) {
						await expect(errorHandler(testError)).rejects.toEqual(testError);
						expect(mockErrorHandler).toHaveBeenCalledWith(testError);
					}
				});
			});
		});
	});

	describe("mapAxiosErrorToResponseError", () => {
		describe("when response payload is an object", () => {
			const setup = () => {
				const expectedPayload = apiResponseErrorFactory.build({
					message: "NOT_FOUND",
					code: 404,
				});
				const responseError = axiosErrorFactory.build({
					response: { data: expectedPayload },
				});

				return {
					responseError,
					expectedPayload,
				};
			};

			it("should return correctly payload", () => {
				mockedIsAxiosError.mockReturnValueOnce(true);
				const { responseError, expectedPayload } = setup();

				const result = mapAxiosErrorToResponseError(responseError);

				expect(result).toStrictEqual(expectedPayload);
			});
		});

		describe("when response payload is a string", () => {
			const setup = () => {
				const status = 555;
				const statusText = "Test status text";
				const data = "NOT_FOUND";
				const code = "BAD_REQUEST";
				const responseError = axiosErrorFactory.build({
					code,
					response: { data, status, statusText },
				});
				const expectedPayload = {
					message: data,
					code: status,
					title: statusText,
					type: code,
				};

				return {
					responseError,
					expectedPayload,
				};
			};

			it("should return correctly payload", () => {
				mockedIsAxiosError.mockReturnValueOnce(true);
				const { responseError, expectedPayload } = setup();

				const result = mapAxiosErrorToResponseError(responseError);

				expect(result).toStrictEqual(expectedPayload);
			});
		});

		describe("when response props not set correctly", () => {
			const setup = () => {
				mockedIsAxiosError.mockReturnValueOnce(true);

				const data = "NOT_FOUND";
				const responseError = axiosErrorFactory.build({
					response: { data },
				});

				return {
					responseError,
				};
			};

			it("should return correctly payload", () => {
				const { responseError } = setup();

				const result = mapAxiosErrorToResponseError(responseError);

				expect(result).toStrictEqual({
					message: "NOT_FOUND",
					code: 1,
					title: responseError.response?.statusText,
					type: "Unknown error",
				});
			});
		});

		describe("when response payload is not AxiosError", () => {
			const setup = () => {
				const responseError = new Error("Test error");
				const expectedPayload = {
					message: "UNKNOWN_ERROR",
					code: 1,
					title: "",
					type: "Unknown error",
				};

				return {
					responseError,
					expectedPayload,
				};
			};

			it("should return correctly payload", () => {
				mockedIsAxiosError.mockReturnValueOnce(true);
				const { responseError, expectedPayload } = setup();

				const result = mapAxiosErrorToResponseError(responseError);

				expect(result).toStrictEqual(expectedPayload);
			});
		});
	});
});
