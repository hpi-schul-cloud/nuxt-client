import { createApplicationError } from "@/utils/create-application-error.factory";

/**
 * Composable for creating ApplicationErrors.
 *
 * ApplicationError hides all content and displays a standardized error page.
 */
export const useApplicationError = () => ({
	createApplicationError,
});
