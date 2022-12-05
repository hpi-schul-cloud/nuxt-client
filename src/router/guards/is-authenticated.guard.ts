import { NavigationGuardNext, Route } from "vue-router";
import { authModule } from "@/store";

export const isAuthenticatedGuard = (
	to: Route,
	_: Route,
	next: NavigationGuardNext
) => {
	const userIsLoggedIn = authModule.isLoggedIn;

	if (userIsLoggedIn || isRoutePublic(to)) {
		next();
	} else {
		window.location.assign(`/login?redirect=${to.fullPath}`);
	}
};

const isRoutePublic = (route: Route) => {
	if (typeof route.meta?.isPublic === "boolean") {
		return route.meta.isPublic;
	} else {
		return false;
	}
};
