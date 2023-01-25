import { NavigationGuardNext, Route } from "vue-router/types/router";
import { applicationErrorModule, authModule } from "@/store";
import { NavigationGuard } from "vue-router";
import { useApplicationError } from "@/composables/application-error.composable";

const { createApplicationError } = useApplicationError();
export function createPermissionGuard(
	permissions: string[],
	fallbackRoute?: string
): NavigationGuard {
	return (to: Route, from: Route, next: NavigationGuardNext) => {
		if (permissions.every((p) => authModule.getUserPermissions.includes(p))) {
			return next();
		}

		if (fallbackRoute) {
			return next(fallbackRoute);
		}

		applicationErrorModule.setError(createApplicationError(403));
	};
}
