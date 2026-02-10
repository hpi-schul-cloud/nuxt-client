import { $axios, initializeAxios, mapAxiosErrorToResponseError } from "./api";
import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { axiosErrorFactory } from "@@/tests/test-utils/factory/axiosErrorFactory";
import { mount } from "@vue/test-utils";
import axios, { isAxiosError } from "axios";

vi.mock("axios");
const mockedIsAxiosError = vi.mocked(isAxiosError);

vi.mock("@/modules/feature/auto-logout/autoLogout.composable", () => {
	const mockNotifyBeingLoggedOut = vi.fn();
	return {
		useAutoLogout: () => ({
			notifyBeingLoggedOut: mockNotifyBeingLoggedOut,
		}),
	};
});

const { useAutoLogout } = await import("@/modules/feature/auto-logout/autoLogout.composable");
const mockNotifyBeingLoggedOut = useAutoLogout().notifyBeingLoggedOut as ReturnType<typeof vi.fn>;

describe("AxiosInstance", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("initializeAxios", () => {
		it("should set $axios", () => {
			initializeAxios(axios);

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

		describe("unauthorized error handling", () => {
			it("should call notifyBeingLoggedOut when 401 error occurs and JWT timer returns expired token", async () => {
				mockAxios.get = vi.fn().mockResolvedValue({ data: { ttl: 0 } });
				await initializeAxios(mockAxios);
				const errorHandler = vi.mocked(mockAxios.interceptors.response.use).mock.calls[0][1];

				const unauthorizedError = axiosErrorFactory.withStatusCode(401).build();
				mockedIsAxiosError.mockReturnValue(true);

				if (errorHandler) {
					try {
						await errorHandler(unauthorizedError);
					} catch {
						// Expected to reject
					}
				}

				expect(mockAxios.get).toHaveBeenCalledWith("/v1/accounts/jwtTimer");
				expect(mockNotifyBeingLoggedOut).toHaveBeenCalled();
			});

			it("should call notifyBeingLoggedOut when 401 error occurs and JWT timer request fails", async () => {
				mockAxios.get = vi.fn().mockRejectedValue(new Error("Network error"));
				await initializeAxios(mockAxios);
				const errorHandler = vi.mocked(mockAxios.interceptors.response.use).mock.calls[0][1];

				const unauthorizedError = axiosErrorFactory.withStatusCode(401).build();
				mockedIsAxiosError.mockReturnValue(true);

				if (errorHandler) {
					try {
						await errorHandler(unauthorizedError);
					} catch {
						// Expected to reject
					}
				}

				expect(mockAxios.get).toHaveBeenCalledWith("/v1/accounts/jwtTimer");
				expect(mockNotifyBeingLoggedOut).toHaveBeenCalled();
			});

			it("should NOT call notifyBeingLoggedOut when 401 error occurs but JWT timer returns valid ttl", async () => {
				mockAxios.get = vi.fn().mockResolvedValue({ data: { ttl: 300 } }); // 5 minutes remaining
				await initializeAxios(mockAxios);
				const errorHandler = vi.mocked(mockAxios.interceptors.response.use).mock.calls[0][1];

				const unauthorizedError = axiosErrorFactory.withStatusCode(401).build();
				mockedIsAxiosError.mockReturnValue(true);

				if (errorHandler) {
					try {
						await errorHandler(unauthorizedError);
					} catch {
						// Expected to reject
					}
				}

				expect(mockAxios.get).toHaveBeenCalledWith("/v1/accounts/jwtTimer");
				expect(mockNotifyBeingLoggedOut).not.toHaveBeenCalled();
			});

			it("should NOT handle non-401 errors", async () => {
				await initializeAxios(mockAxios);
				const errorHandler = vi.mocked(mockAxios.interceptors.response.use).mock.calls[0][1];

				const notFoundError = axiosErrorFactory.withStatusCode(404).build();
				mockedIsAxiosError.mockReturnValue(true);

				if (errorHandler) {
					try {
						await errorHandler(notFoundError);
					} catch {
						// Expected to reject
					}
				}

				expect(mockAxios.get).not.toHaveBeenCalled();
				expect(mockNotifyBeingLoggedOut).not.toHaveBeenCalled();
			});

			it("should NOT handle non-axios errors", async () => {
				await initializeAxios(mockAxios);
				const errorHandler = vi.mocked(mockAxios.interceptors.response.use).mock.calls[0][1];

				const regularError = new Error("Some error");
				mockedIsAxiosError.mockReturnValue(false);

				if (errorHandler) {
					try {
						await errorHandler(regularError);
					} catch {
						// Expected to reject
					}
				}

				expect(mockAxios.get).not.toHaveBeenCalled();
				expect(mockNotifyBeingLoggedOut).not.toHaveBeenCalled();
			});

			it("should always reject the original error", async () => {
				mockAxios.get = vi.fn().mockResolvedValue({ data: { ttl: 0 } });
				await initializeAxios(mockAxios);
				const errorHandler = vi.mocked(mockAxios.interceptors.response.use).mock.calls[0][1];

				const unauthorizedError = axiosErrorFactory.withStatusCode(401).build();
				mockedIsAxiosError.mockReturnValue(true);

				if (errorHandler) {
					await expect(errorHandler(unauthorizedError)).rejects.toEqual(unauthorizedError);
				}
			});

			it("should prevent race conditions by not checking JWT multiple times simultaneously", async () => {
				mockAxios.get = vi
					.fn()
					.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ data: { ttl: 0 } }), 100)));
				await initializeAxios(mockAxios);
				const errorHandler = vi.mocked(mockAxios.interceptors.response.use).mock.calls[0][1];

				const unauthorizedError1 = axiosErrorFactory.withStatusCode(401).build();
				const unauthorizedError2 = axiosErrorFactory.withStatusCode(401).build();
				mockedIsAxiosError.mockReturnValue(true);

				const promises: Promise<unknown>[] = [];
				if (errorHandler) {
					promises.push(
						errorHandler(unauthorizedError1).catch(() => {
							// Expected to reject
						}),
						errorHandler(unauthorizedError2).catch(() => {
							// Expected to reject
						})
					);
				}

				await Promise.all(promises);

				expect(mockAxios.get).toHaveBeenCalledTimes(1);
				expect(mockAxios.get).toHaveBeenCalledWith("/v1/accounts/jwtTimer");
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
