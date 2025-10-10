import { Permission } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { useAppStore } from "@data-app";
import { NavigationGuard } from "vue-router";

export function createPermissionGuard(permissions: Permission[], fallbackRoute?: string): NavigationGuard {
	return (to, from, next) => {
		if (permissions.every((p) => useAppStore().userPermissions.includes(p))) {
			return next();
		}

		if (fallbackRoute) {
			return next(fallbackRoute);
		}

		useAppStore().handleApplicationError(HttpStatusCode.Unauthorized);
	};
}
