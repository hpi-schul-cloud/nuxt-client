import { isLegacyClient } from "../legacy-client-route.js";
import { NavigationGuard, RouteLocationNormalized } from "vue-router";

export const legacyCompatibilityGuard: NavigationGuard = (to: RouteLocationNormalized) => {
	if (isLegacyClient(to.path)) {
		window.location.assign(to.path);
		return false;
	} else {
		return true;
	}
};
