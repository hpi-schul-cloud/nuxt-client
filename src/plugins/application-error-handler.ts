import { applicationErrorModule } from "@/store";
import { ApplicationError } from "@/store/types/application-error";

export const handleApplicationError = (err: unknown) => {
	console.error(err); // TODO: remove error logging
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
