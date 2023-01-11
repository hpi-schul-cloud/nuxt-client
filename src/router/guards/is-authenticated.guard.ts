import { NavigationGuardNext, Route } from "vue-router";
import { authModule } from "@/store";
import { getLoginUrlWithRedirect } from "../login-redirect-url";

export const isAuthenticatedGuard = (
	to: Route,
	_: Route,
	next: NavigationGuardNext
) => {
	const userIsLoggedIn = authModule.isLoggedIn;

	if (userIsLoggedIn || isRoutePublic(to)) {
		next();
	} else {
		const loginUrl = getLoginUrlWithRedirect(to);
		window.location.assign(loginUrl);
	}
};

const isRoutePublic = (route: Route) => {
	if (typeof route.meta?.isPublic === "boolean") {
		return route.meta.isPublic;
	} else {
		return false;
	}
};
