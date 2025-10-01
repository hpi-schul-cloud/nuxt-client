import { useApplicationError } from "@/composables/application-error.composable";
import { applicationErrorModule } from "@/store";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { NavigationGuard, NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const { createApplicationError } = useApplicationError();

type ParameterValidationFunction = (value: unknown, to: RouteLocationNormalized) => boolean;

export function validateQueryParameters(parameters: Record<string, ParameterValidationFunction>): NavigationGuard {
	return (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
		const isValid = Object.entries(parameters).every(([key, func]) => func(to.query[key], to));

		if (!isValid) {
			applicationErrorModule.setError(createApplicationError(HttpStatusCode.BadRequest));
			return;
		}

		next();
	};
}
