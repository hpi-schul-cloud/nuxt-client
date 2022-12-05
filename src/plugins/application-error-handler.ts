import { ApplicationError } from "@store/types/application-error";
import { applicationErrorModule } from "@/store";
import Vue from "vue";

export const handleApplicationError = (err: Error) => {
	/**
	 * Note: The Global-ErrorHandler wraps the error
	 * so we can't use instanceof ApplicationError here.
	 */
	if (err.name === "ApplicationError") {
		applicationErrorModule.setError({
			statusCode: asApplicationError(err).statusCode,
			translationKey: asApplicationError(err).translationKey,
		});
		return;
	}
	applicationErrorModule.setError({
		statusCode: 500,
		translationKey: "error.generic",
	});
};

const asApplicationError: (err: Error) => ApplicationError = (err) =>
	err as ApplicationError;

Vue.config.errorHandler = handleApplicationError;
