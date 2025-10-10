import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { useAppStore } from "@data-app";
import { NavigationGuard, NavigationGuardNext, RouteLocationNormalized } from "vue-router";

type ParameterValidationFunction = (value: unknown, to: RouteLocationNormalized) => boolean;

export function validateQueryParameters(parameters: Record<string, ParameterValidationFunction>): NavigationGuard {
	return (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
		const isValid = Object.entries(parameters).every(([key, func]) => func(to.query[key], to));

		if (!isValid) {
			useAppStore().handleApplicationError(HttpStatusCode.BadRequest);
			return;
		}

		next();
	};
}
