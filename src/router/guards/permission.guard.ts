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
		console.log("permissions", permissions);
		console.log("authModule.getUserPermissions", authModule.getUserPermissions);
		if (permissions.every((p) => authModule.getUserPermissions.includes(p))) {
			console.log("Permission granted");
			return next();
		}

		if (fallbackRoute) {
			console.log("fallbackRoute", fallbackRoute);
			return next(fallbackRoute);
		}

		applicationErrorModule.setError(createApplicationError(401));
	};
}
