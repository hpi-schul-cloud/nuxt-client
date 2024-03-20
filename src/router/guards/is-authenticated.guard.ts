import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { authModule } from "@/store";
import { getLoginUrlWithRedirect } from "../login-redirect-url";

export const isAuthenticatedGuard = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
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

const isRoutePublic = (route: RouteLocationNormalized) => {
	if (typeof route.meta?.isPublic === "boolean") {
		return route.meta.isPublic;
	} else {
		return false;
	}
};
