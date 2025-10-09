import { ApplicationError } from "@/store/types/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

declare type HandledApplicationErrors =
	| HttpStatusCode.BadRequest
	| HttpStatusCode.Unauthorized
	| HttpStatusCode.Forbidden
	| HttpStatusCode.NotFound
	| HttpStatusCode.RequestTimeout
	| HttpStatusCode.InternalServerError;

export function createApplicationError(statusCode: HandledApplicationErrors): ApplicationError;
export function createApplicationError(
	statusCode: HttpStatusCode,
	translationKey?: string,
	message?: string
): ApplicationError;
export function createApplicationError(
	statusCode: HttpStatusCode.BadRequest,
	translationKey: "error.400" | string,
	message?: string
): ApplicationError;
export function createApplicationError(
	statusCode: HttpStatusCode.Unauthorized,
	translationKey: "error.401" | string,
	message?: string
): ApplicationError;
export function createApplicationError(
	statusCode: HttpStatusCode.Forbidden,
	translationKey: "error.403" | string,
	message?: string
): ApplicationError;
export function createApplicationError(
	statusCode: HttpStatusCode.NotFound,
	translationKey: "error.404" | string,
	message?: string
): ApplicationError;
export function createApplicationError(
	statusCode: HttpStatusCode.RequestTimeout,
	translationKey: "error.408" | string,
	message?: string
): ApplicationError;
export function createApplicationError(
	statusCode: HttpStatusCode.InternalServerError,
	translationKey: "error.generic" | string,
	message?: string
): ApplicationError;
/**
 *  Creates an ApplicationError which has to be thrown to trigger global ApplicationError-Handling.
 *
 *  @param statusCode: Describes the type of Error based on HttpStatusCode
 *  @param translationKey: TranslationKey for the user-facing error message
 *  @param message: Technical Information - they are not shown to the user
 *
 *  ```
 *  // Basic Usage
 *  throw createApplicationError(400);
 *
 *  // Overwrite default user feedback texts
 *  throw createApplicationError(400, "my.specific.translation.key");
 *
 *  // Include technical Details for other developers
 *  throw createApplicationError(400, "error.403", "this should not happen!");
 *  ```
 */
export function createApplicationError(
	statusCode: HttpStatusCode,
	translationKey?: string,
	message?: string
): ApplicationError {
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
