import { getLoginUrlWithRedirect } from "../login-redirect-url";
import { useAppStore } from "@data-app";
import { RouteLocationNormalized } from "vue-router";

export const isAuthenticatedGuard = (to: RouteLocationNormalized) => {
	const userIsLoggedIn = useAppStore().isLoggedIn;

	if (userIsLoggedIn || isRoutePublic(to)) {
		return true;
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
