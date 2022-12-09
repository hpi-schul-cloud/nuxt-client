import { ApplicationError } from "@store/types/application-error";
import { applicationErrorModule } from "@/store";
import Vue from "vue";

export const handleApplicationError = (err: Error) => {
	/**
	 * Note: The Global-ErrorHandler wraps the error
	 * so we can't use instanceof ApplicationError here.
	 */
	const applicationError = err as ApplicationError;
	if (err.name === "ApplicationError") {
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

Vue.config.errorHandler = handleApplicationError;
