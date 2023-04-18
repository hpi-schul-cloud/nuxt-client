import {
	NavigationGuard,
	NavigationGuardNext,
	RouteLocation,
} from "vue-router";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { isLegacyClient } = require("../legacy-client-route.js");

export const legacyCompatibilityGuard: NavigationGuard = (
	to: RouteLocation,
	from: RouteLocation,
	next: NavigationGuardNext
) => {
	if (isLegacyClient(to.path)) {
		window.location.assign(to.path);
	} else {
		next();
	}
};
