import { NavigationGuard } from "vue-router";
import { NavigationGuardNext, Route } from "vue-router/types/router";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { isLegacyClient } = require("../legacy-client-route.js");

export const legacyCompatibilityGuard: NavigationGuard = (
	to: Route,
	from: Route,
	next: NavigationGuardNext
) => {
	if (isLegacyClient(to.path)) {
		window.location.assign(to.path);
	} else {
		next();
	}
};
