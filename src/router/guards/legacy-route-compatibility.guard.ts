import { isLegacyClient } from "../legacy-client-route.js";
import { useEnvConfig } from "@data-env";
import { NavigationGuard, RouteLocationNormalized } from "vue-router";

export const legacyCompatibilityGuard: NavigationGuard = (to: RouteLocationNormalized) => {
	const isTaskRoute = /^\/tasks(?:\/|$)/.test(to.path);
	if (isTaskRoute && !useEnvConfig().value.FEATURE_TASKS_V3_ENABLED) {
		window.location.assign(to.fullPath);
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
