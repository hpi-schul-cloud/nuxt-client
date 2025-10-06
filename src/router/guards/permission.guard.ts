import { applicationErrorModule } from "@/store";
import {
	NavigationGuard,
	NavigationGuardNext,
	RouteLocationNormalized,
} from "vue-router";
import { useApplicationError } from "@/composables/application-error.composable";
import { Permission } from "@/serverApi/v3";
import { useAppStore } from "@data-app";

const { createApplicationError } = useApplicationError();
export function createPermissionGuard(
	permissions: Permission[],
	fallbackRoute?: string
): NavigationGuard {
	return (
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		if (permissions.every((p) => useAppStore().userPermissions.includes(p))) {
			return next();
		}

		if (fallbackRoute) {
			return next(fallbackRoute);
		}

		applicationErrorModule.setError(createApplicationError(401));
	};
}
