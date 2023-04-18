import {
	NavigationGuard,
	NavigationGuardNext,
	RouteLocation,
} from "vue-router";
import { applicationErrorModule, authModule } from "@/store";
import { useApplicationError } from "@/composables/application-error.composable";

const { createApplicationError } = useApplicationError();
export function createPermissionGuard(
	permissions: string[],
	fallbackRoute?: string
): NavigationGuard {
	return (
		to: RouteLocation,
		from: RouteLocation,
		next: NavigationGuardNext
	) => {
		if (permissions.every((p) => authModule.getUserPermissions.includes(p))) {
			return next();
		}

		if (fallbackRoute) {
			return next(fallbackRoute);
		}

		applicationErrorModule.setError(createApplicationError(401));
	};
}
