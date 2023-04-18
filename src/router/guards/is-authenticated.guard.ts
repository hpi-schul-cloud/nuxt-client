import { NavigationGuardNext, RouteLocation } from "vue-router";
import { authModule } from "@/store";
import { getLoginUrlWithRedirect } from "../login-redirect-url";

export const isAuthenticatedGuard = (
	to: RouteLocation,
	from: RouteLocation,
	next: NavigationGuardNext
) => {
	const userIsLoggedIn = authModule.isLoggedIn;

	if (userIsLoggedIn || isRoutePublic(to)) {
		next();
	} else {
		const loginUrl = getLoginUrlWithRedirect(to.fullPath);
		window.location.assign(loginUrl);
	}
};

const isRoutePublic = (route: RouteLocation) => {
	if (typeof route.meta?.isPublic === "boolean") {
		return route.meta.isPublic;
	} else {
		return false;
	}
};
