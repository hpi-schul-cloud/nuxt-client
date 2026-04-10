import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createApplicationError } from "@/utils/create-application-error.factory";

declare type HandledApplicationErrors =
	| HttpStatusCode.BadRequest
	| HttpStatusCode.Unauthorized
	| HttpStatusCode.Forbidden
	| HttpStatusCode.NotFound
	| HttpStatusCode.RequestTimeout
	| HttpStatusCode.InternalServerError;

describe("application-error composable", () => {
	it("should create an ApplicationError", async () => {
		const result = createApplicationError(500);
		expect(result).toBeInstanceOf(Error);
		expect(result.name).toBe("ApplicationError");
	});

	it.each([
		[HttpStatusCode.BadRequest, "error.400"],
		[HttpStatusCode.Unauthorized, "error.401"],
		[HttpStatusCode.Forbidden, "error.403"],
		[HttpStatusCode.NotFound, "error.404"],
		[HttpStatusCode.RequestTimeout, "error.408"],
		[HttpStatusCode.InternalServerError, "error.generic"],
	])("Code %p should create translationKey of %p", (code: HttpStatusCode, translationKey: string) => {
		const err = createApplicationError(code as HandledApplicationErrors);
		expect(err.statusCode).toBe(code);
		expect(err.translationKey).toBe(translationKey);
	});

	it.each([
		[HttpStatusCode.BadRequest],
		[HttpStatusCode.Unauthorized],
		[HttpStatusCode.Forbidden],
		[HttpStatusCode.NotFound],
		[HttpStatusCode.RequestTimeout],
		[HttpStatusCode.InternalServerError],
	])("Code %p should be overwritable with custom translation", (code: HttpStatusCode) => {
		const customTranslationKey = "custom.translation";
		const err = createApplicationError(code, customTranslationKey);
		expect(err.statusCode).toBe(code);
		expect(err.translationKey).toBe(customTranslationKey);
	});

	it("unhandled error codes should require a translationKey", () => {
		const customTranslationKey = "custom.translation";
		const unhandledErrorKey = HttpStatusCode.IAmATeapot;
		const err = createApplicationError(unhandledErrorKey, customTranslationKey);
		expect(err.statusCode).toBe(unhandledErrorKey);
		expect(err.translationKey).toBe(customTranslationKey);
	});

	it("should be possible to add an optional message", () => {
		const customTranslationKey = "custom.translation";
		const unhandledErrorKey = HttpStatusCode.IAmATeapot;
		const optionalMessage = "optionalMessage";
		const err = createApplicationError(unhandledErrorKey, customTranslationKey, optionalMessage);
		expect(err.statusCode).toBe(unhandledErrorKey);
		expect(err.translationKey).toBe(customTranslationKey);
		expect(err.message).toBe(optionalMessage);
	});
});
