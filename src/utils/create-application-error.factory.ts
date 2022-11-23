import {ApplicationError} from "@store/types/application-error";

declare type HandledApplicationErrors = 400 | 401 | 403 | 404 | 408 | 500;

export function createApplicationError(
	statusCode: HandledApplicationErrors
): ApplicationError;
export function createApplicationError(
	statusCode: number,
	translationKey: string
): ApplicationError;
/**
 *  Creates an ApplicationError which has to be thrown to trigger global ApplicationError-Handling.
 *
 *  Usage:
 *
 *  `throw createApplicationError(400)`
 */
export function createApplicationError(
	statusCode: number,
	translationKey?: string | undefined
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
		localTranslationKey || "error.generic"
	);
}
