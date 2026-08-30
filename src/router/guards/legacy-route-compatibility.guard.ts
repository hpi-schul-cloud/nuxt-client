import { isLegacyClient } from "../legacy-client-route.js";
import { useEnvConfig } from "@data-env";
import { NavigationGuard, RouteLocationNormalized } from "vue-router";

export const legacyCompatibilityGuard: NavigationGuard = (to: RouteLocationNormalized) => {
	const isTaskSubRoute = /^\/tasks\//.test(to.path);
	if (isTaskSubRoute && !useEnvConfig().value.FEATURE_TASKS_V3_ENABLED) {
		const legacyTaskUrl = new URL(to.fullPath, window.location.origin);
		legacyTaskUrl.pathname = legacyTaskUrl.pathname.replace(/^\/tasks\//, "/homework/");
		if (to.path === "/tasks/new" && !legacyTaskUrl.searchParams.has("returnUrl")) {
			legacyTaskUrl.searchParams.set("returnUrl", "tasks");
		}
		window.location.assign(`${legacyTaskUrl.pathname}${legacyTaskUrl.search}${legacyTaskUrl.hash}`);
		return false;
	}

	if (!isLegacyClient(to.path)) {
		return true;
	}

	if (window.location.pathname === to.path) {
		return true;
	}

	window.location.assign(to.fullPath);
	return false;
};
