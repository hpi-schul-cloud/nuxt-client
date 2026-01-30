import { useAppStore } from "@data-app";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const clearApplicationErrorGuard = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	const appStore = useAppStore();

	if (appStore.applicationError !== undefined) {
		appStore.clearApplicationError();
	}

	next();
};
