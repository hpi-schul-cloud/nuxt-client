import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { axiosErrorFactory } from "@@/tests/test-utils/factory/axiosErrorFactory";
import axios, { isAxiosError } from "axios";
import Vue from "vue";
import { $axios, initializeAxios, mapAxiosErrorToResponseError } from "./api";

jest.mock("axios");
const mockedIsAxiosError = jest.mocked(isAxiosError);

describe("AxiosInstance", () => {
	describe("initializeAxios", () => {
		it("should set $axios", () => {
			initializeAxios(axios);

			expect($axios).toBe(axios);
		});

		it("should set Vue.prototype.$axios", () => {
			initializeAxios(axios);

			expect(Vue.prototype.$axios).toBe(axios);
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
				const data = "NOT_FOUND";
				const responseError = axiosErrorFactory.build({
					response: { data },
				});
				const expectedPayload = {
					message: "NOT_FOUND",
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
