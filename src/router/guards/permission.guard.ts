import { NavigationGuardNext, Route } from "vue-router/types/router";
import { authModule } from "@utils/store-accessor";
import { NavigationGuard } from "vue-router";

export function createPermissionGuard(
	permission: string,
	fallbackRoute: string
): NavigationGuard {
	return (to: Route, from: Route, next: NavigationGuardNext) => {
		if (authModule.getUserPermissions.includes(permission)) {
			next();
		} else {
			next(fallbackRoute);
		}
	};
}
