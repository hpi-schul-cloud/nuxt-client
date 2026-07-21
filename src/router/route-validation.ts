import { isIncompletePrefixedRoute } from "@/router/prefix-route-rules";
import { HttpStatusCode } from "@/types/enum/http-status-code.enum";
import { useAppStore } from "@data-app";
import { NavigationGuard } from "vue-router";

export const isIncompleteRoute = isIncompletePrefixedRoute;

export const isRouteValidGuard: NavigationGuard = (to) => {
	if (to.matched.length > 0) {
		return true;
	}

	if (isIncompleteRoute(to.path)) {
		useAppStore().handleApplicationError(HttpStatusCode.NotFound);
		return { path: "/error" };
	}

	return true;
};
