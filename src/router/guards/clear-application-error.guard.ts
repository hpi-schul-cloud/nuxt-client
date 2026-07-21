import { useAppStore } from "@data-app";
import { NavigationGuard } from "vue-router";

export const clearApplicationErrorGuard: NavigationGuard = (to) => {
	const appStore = useAppStore();

	if (to.path !== "/error" && appStore.applicationError !== undefined) {
		appStore.clearApplicationError();
	}

	return true;
};
