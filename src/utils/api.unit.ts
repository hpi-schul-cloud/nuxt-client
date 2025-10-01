import { $axios, initializeAxios, mapAxiosErrorToResponseError } from "./api";
import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { axiosErrorFactory } from "@@/tests/test-utils/factory/axiosErrorFactory";
import { mount } from "@vue/test-utils";
import axios, { isAxiosError } from "axios";

vi.mock("axios");
const mockedIsAxiosError = vi.mocked(isAxiosError);

describe("AxiosInstance", () => {
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
