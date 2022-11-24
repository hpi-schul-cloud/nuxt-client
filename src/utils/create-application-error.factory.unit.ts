import {createApplicationError} from "@utils/create-application-error.factory";

declare type HandledApplicationErrors = 400 | 401 | 403 | 404 | 408 | 500;

describe("application-error composable", () => {
	it("should create an ApplicationError", async () => {
		const result = createApplicationError(500);
		expect(result).toBeInstanceOf(Error);
		expect(result.name).toBe("ApplicationError");
	});

	it.each([
		[400, "error.400"],
		[401, "error.401"],
		[403, "error.403"],
		[404, "error.404"],
		[408, "error.408"],
		[500, "error.generic"],
	])(
		"Code %p should create translationKey of %p",
		(code: number, translationKey: string) => {
			const err = createApplicationError(code as HandledApplicationErrors);
			expect(err.statusCode).toBe(code);
			expect(err.translationKey).toBe(translationKey);
		}
	);

	it.each([
		[400, "error.400"],
		[401, "error.401"],
		[403, "error.403"],
		[404, "error.404"],
		[408, "error.408"],
		[500, "error.generic"],
	])(
		"Code %p should be overwritable with custom translation",
		(code: number, translationKey: string) => {
			const customTranslationKey = "custom.translation";
			const err = createApplicationError(
				code as HandledApplicationErrors,
				customTranslationKey
			);
			expect(err.statusCode).toBe(code);
			expect(err.translationKey).toBe(customTranslationKey);
		}
	);

	it("unhandled error codes should require a translationKey", () => {
		const customTranslationKey = "custom.translation";
		const unhandledErrorKey = 418;
		const err = createApplicationError(unhandledErrorKey, customTranslationKey);
		expect(err.statusCode).toBe(unhandledErrorKey);
		expect(err.translationKey).toBe(customTranslationKey);
	});

	it("should be possible to add an optional message", () => {
		const customTranslationKey = "custom.translation";
		const unhandledErrorKey = 418;
		const optionalMessage = "optionalMessage";
		const err = createApplicationError(
			unhandledErrorKey,
			customTranslationKey,
			optionalMessage
		);
		expect(err.statusCode).toBe(unhandledErrorKey);
		expect(err.translationKey).toBe(customTranslationKey);
		expect(err.message).toBe(optionalMessage);
	});
});
