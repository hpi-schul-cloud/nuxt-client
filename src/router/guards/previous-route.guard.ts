import { NavigationGuardNext, Route } from "vue-router/types/router";
import { NavigationGuard } from "vue-router";

export const previousRouteGuard: NavigationGuard = (
	to: Route,
	from: Route,
	next: NavigationGuardNext
) => {
	to.params.previousRoute = from.name as string;
	next();
};
