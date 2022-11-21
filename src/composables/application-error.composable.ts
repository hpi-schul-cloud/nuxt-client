export class ApplicationError extends Error {
	constructor(public statusCode: number, public translationKey: string) {
		super("ApplicationError: " + translationKey + " " + statusCode);
	}
}

/**
 * Composable for creating ApplicationErrors.
 *
 * ApplicationError hides all content and displays a standardized error page.
 */
export const useApplicationError = () => {
	function createApplicationError(statusCode: 400): ApplicationError;
	function createApplicationError(statusCode: 401): ApplicationError;
	function createApplicationError(statusCode: 403): ApplicationError;
	function createApplicationError(statusCode: 404): ApplicationError;
	function createApplicationError(statusCode: 408): ApplicationError;
	function createApplicationError(statusCode: 500): ApplicationError;
	function createApplicationError(
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
	function createApplicationError(
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

		return new ApplicationError(statusCode, localTranslationKey!);
	}

	return {
		createApplicationError,
	};
};
