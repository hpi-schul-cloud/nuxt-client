/* eslint-disable no-console */
import {
	NavigationGuard,
	NavigationGuardNext,
	RouteLocationNormalized,
} from "vue-router";
import { isLegacyClient } from "../legacy-client-route.js";

export const legacyCompatibilityGuard: NavigationGuard = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	if (isLegacyClient(to.path)) {
		console.log(window.location.pathname);
		if (from.fullPath === "/" && window.location.pathname === to.fullPath) {
			return;
		}
		console.log("legacyCompatibilityGuard is redirecting");
		console.log(to.fullPath);
		console.log(from.fullPath);
		window.location.assign(to.path);
	} else {
		next();
	}
};
