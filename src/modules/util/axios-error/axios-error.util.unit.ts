import { createAxiosError } from "./axios-error.factory";
import { extractErrorData } from "./axios-error.util";

describe("extractErrorData", () => {
	it("should extract the error message", () => {
		const error = createAxiosError({ statusCode: 401, message: "Test error" });

		const { message } = extractErrorData(error);

		expect(message).toBe("Test error");
	});

	it("should extract the http status code", () => {
		const error = createAxiosError({ statusCode: 401, message: "Test error" });

		const { statusCode } = extractErrorData(error);

		expect(statusCode).toBe(401);
	});
});
