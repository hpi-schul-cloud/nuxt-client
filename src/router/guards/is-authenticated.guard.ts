import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { getLoginUrlWithRedirect } from "../login-redirect-url";
import { useAuthStore } from "@data-auth";

export const isAuthenticatedGuard = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	const userIsLoggedIn = useAuthStore().loggedIn;

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
