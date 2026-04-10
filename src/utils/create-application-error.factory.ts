import { ApplicationError } from "@/store/types/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { logger } from "@util-logger";

/**
 *  DEPRECATED: Use `useAppStore().handleApplicationError()` instead.
 *  Creates an ApplicationError which has to be thrown to trigger global ApplicationError-Handling.
 *
 *  @param statusCode: Describes the type of Error based on HttpStatusCode
 *  @param translationKey: TranslationKey for the user-facing error message
 *  @param message: Technical Information - they are not shown to the user
 */
export function createApplicationError(
	statusCode: HttpStatusCode,
	translationKey?: string,
	message?: string
): ApplicationError {
	logger.warn(
		`[DEPRECATED] createApplicationError() is deprecated.\n` +
			`Please use useAppStore().handleApplicationError() instead. Please do not throw new error objects in functions, but instead treat them properly.\n`
	);
	if (translationKey !== undefined) {
		return new ApplicationError(statusCode, translationKey, message);
	}

	switch (statusCode) {
		case HttpStatusCode.BadRequest:
			return new ApplicationError(statusCode, "error.400", message);
		case HttpStatusCode.Unauthorized:
			return new ApplicationError(statusCode, "error.401", message);
		case HttpStatusCode.Forbidden:
			return new ApplicationError(statusCode, "error.403", message);
		case HttpStatusCode.NotFound:
			return new ApplicationError(statusCode, "error.404", message);
		case HttpStatusCode.RequestTimeout:
			return new ApplicationError(statusCode, "error.408", message);
		case HttpStatusCode.InternalServerError:
			return new ApplicationError(statusCode, "error.generic", message);
		default:
			return new ApplicationError(statusCode, "error.generic", message);
	}
}
