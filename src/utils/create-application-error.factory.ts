import {ApplicationError} from "@store/types/application-error";

declare type HandledApplicationErrors = 400 | 401 | 403 | 404 | 408 | 500;

export function createApplicationError(
	statusCode: HandledApplicationErrors
): ApplicationError;
export function createApplicationError(
	statusCode: number,
	translationKey: string,
	message?: string | undefined
): ApplicationError;
export function createApplicationError(
	statusCode: 400,
	translationKey: "error.400" | string,
	message?: string | undefined
): ApplicationError;
export function createApplicationError(
	statusCode: 401,
	translationKey: "error.401" | string,
	message?: string | undefined
): ApplicationError;
export function createApplicationError(
	statusCode: 403,
	translationKey: "error.403" | string,
	message?: string | undefined
): ApplicationError;
export function createApplicationError(
	statusCode: 404,
	translationKey: "error.404" | string,
	message?: string | undefined
): ApplicationError;
export function createApplicationError(
	statusCode: 408,
	translationKey: "error.408" | string,
	message?: string | undefined
): ApplicationError;
export function createApplicationError(
	statusCode: 500,
	translationKey: "error.generic" | string,
	message?: string | undefined
): ApplicationError;
/**
 *  Creates an ApplicationError which has to be thrown to trigger global ApplicationError-Handling.
 *
 *  @param statusCode: Describes the type of Error based on HTTP_StatusCodes
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
	statusCode: number,
	translationKey?: string | undefined,
	message?: string | undefined
): ApplicationError {
	let localTranslationKey = translationKey;

	if (statusCode === 400 && translationKey === undefined) {
		localTranslationKey = "error.400";
	}
	if (statusCode === 401 && translationKey === undefined) {
		localTranslationKey = "error.401";
	}
	if (statusCode === 403 && translationKey === undefined) {
		localTranslationKey = "error.403";
	}
	if (statusCode === 404 && translationKey === undefined) {
		localTranslationKey = "error.404";
	}
	if (statusCode === 408 && translationKey === undefined) {
		localTranslationKey = "error.408";
	}
	if (statusCode === 500 && translationKey === undefined) {
		localTranslationKey = "error.generic";
	}

	return new ApplicationError(
		statusCode,
		localTranslationKey || "error.generic",
		message
	);
}
