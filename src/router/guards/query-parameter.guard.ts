import { useApplicationError } from "@/composables/application-error.composable";
import { NavigationGuard } from "vue-router";
import { Route } from "vue-router/types/router";
import { applicationErrorModule } from "@/store";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

const { createApplicationError } = useApplicationError();

type ParameterValidationFunction = (value: unknown, to: Route) => boolean;

export function createQueryParameterValidationGuard(
	parameters: Record<string, ParameterValidationFunction>
): NavigationGuard {
	return (to: Route, from: Route, next) => {
		const isValid = Object.entries(parameters).every(([key, func]) => {
			return func(to.query[key], to);
		});

		if (!isValid) {
			applicationErrorModule.setError(
				createApplicationError(HttpStatusCode.BadRequest)
			);
			return;
		}

		next();
	};
}
