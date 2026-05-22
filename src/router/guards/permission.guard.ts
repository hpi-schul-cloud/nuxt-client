import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { Permission } from "@api-server";
import { useAppStore } from "@data-app";
import { NavigationGuard } from "vue-router";

export const createPermissionGuard =
	(permissions: Permission[], fallbackRoute?: string): NavigationGuard =>
	() => {
		const appStore = useAppStore();

		if (permissions.every((p) => appStore.userPermissions.includes(p))) {
			return true;
		}

		if (fallbackRoute) {
			return fallbackRoute;
		}

		appStore.handleApplicationError(HttpStatusCode.Unauthorized);
		return false;
	};
