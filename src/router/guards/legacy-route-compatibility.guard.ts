import { NavigationGuard } from "vue-router";
import { NavigationGuardNext, Route } from "vue-router/types/router";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { isLegacyClientPage } = require("../legacy-client-route.js");

export const legacyCompatibilityGuard: NavigationGuard = (
	to: Route,
	from: Route,
	next: NavigationGuardNext
) => {
	if (isLegacyClientPage(to.path)) {
		window.location.replace(to.path);
	} else {
		next();
	}
};
