import { applicationErrorModule, authModule } from "@/store";
import {
	NavigationGuard,
	NavigationGuardNext,
	RouteLocationNormalized,
} from "vue-router";
import { useApplicationError } from "@/composables/application-error.composable";

const { createApplicationError } = useApplicationError();
export function createPermissionGuard(
	permissions: string[],
	fallbackRoute?: string
): NavigationGuard {
	return (
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		if (permissions.every((p) => authModule.getPermissions.includes(p))) {
			return next();
		}

		if (fallbackRoute) {
			return next(fallbackRoute);
		}

		applicationErrorModule.setError(createApplicationError(401));
	};
}
