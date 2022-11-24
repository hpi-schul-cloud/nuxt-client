import {ApplicationError} from "@store/types/application-error";
import {applicationErrorModule} from "@/store";
import Vue from "vue";

export const handleApplicationError = (err: ApplicationError | Error) => {
	// WIP add logging based on env-var
	// err.message.length > 0 ? console.warn(err) : null;
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
