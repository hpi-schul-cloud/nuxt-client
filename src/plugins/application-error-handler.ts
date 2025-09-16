import { applicationErrorModule } from "@/store";
import { ApplicationError } from "@/store/types/application-error";

const { trace } = console;

export const handleApplicationError = (err: unknown) => {
	/**
	 * Note: The Global-ErrorHandler wraps the error
	 * so we can't use instanceof ApplicationError here.
	 */

	trace("Application error occurred:", err);
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
