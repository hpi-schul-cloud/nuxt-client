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
		console.log("legacy guard");
		console.log(to.fullPath);
		console.log(from.fullPath);

		window.location.assign(to.path);
	} else {
		next();
	}
};
