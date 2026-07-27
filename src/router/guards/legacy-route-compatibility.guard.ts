import { isLegacyClient } from "../legacy-client-route.js";
import { NavigationGuard, RouteLocationNormalized } from "vue-router";

export const legacyCompatibilityGuard: NavigationGuard = (to: RouteLocationNormalized) => {
	if (!isLegacyClient(to.path)) {
		return true;
	}

	if (window.location.pathname === to.path) {
		return true;
	}

	window.location.assign(to.fullPath);
	return false;
};
