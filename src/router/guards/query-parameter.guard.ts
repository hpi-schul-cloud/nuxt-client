import { useApplicationError } from "@/composables/application-error.composable";
import { NavigationGuard } from "vue-router";
import { Route } from "vue-router/types/router";
import { applicationErrorModule } from "@/store";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { isDef } from "@vueuse/core";

const REGEX_ID = "[a-z0-9]{24}";
export const isMongoId: ParameterValidationFunction = (val, to) =>
	isDef(val) &&
	typeof val === "string" &&
	new RegExp(REGEX_ID).test(val) &&
	(val === to.query.sourceSystem || val === to.query.targetSystem);

const { createApplicationError } = useApplicationError();

type ParameterValidationFunction = (value: unknown, to: Route) => boolean;

export function createQueryParameterGuard(
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
