import { applicationErrorModule } from "@/store";
import { ApplicationError } from "@/store/types/application-error";

export const handleApplicationError = (err: unknown) => {
	const { log } = console;
	log("ApplicationErrorHandler", err);
	/**
	 * Note: The Global-ErrorHandler wraps the error
	 * so we can't use instanceof ApplicationError here.
	 */
	const applicationError = err as ApplicationError;
	if (applicationError.name === "ApplicationError") {
		applicationErrorModule.setError({
			statusCode: applicationError.statusCode,
			translationKey: applicationError.translationKey,
		});
		return;
	}
	applicationErrorModule.setError({
		statusCode: 500,
		translationKey: "error.generic",
	});
};
