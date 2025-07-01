import { applicationErrorModule, authModule, envConfigModule } from "@/store";
import {
	NavigationGuard,
	NavigationGuardNext,
	RouteLocationNormalized,
} from "vue-router";
import { useApplicationError } from "@/composables/application-error.composable";

const { createApplicationError } = useApplicationError();
export function roomPermissionGuard(permissions: string[]): NavigationGuard {
	return (
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		const checkPermission = permissions.every((p) =>
			authModule.getUserPermissions.includes(p)
		);

		if (
			checkPermission ||
			envConfigModule.getEnv.FEATURE_ROOM_ADD_STUDENTS_ENABLED
		) {
			return next();
		}

		applicationErrorModule.setError(createApplicationError(401));
	};
}
