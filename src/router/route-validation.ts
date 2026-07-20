import { HttpStatusCode } from "@/types/enum/http-status-code.enum";
import { REGEX_ID } from "@/utils/validation";
import { useAppStore } from "@data-app";
import { NavigationGuard } from "vue-router";

type RouteRule = {
	route: string;
	valid: RegExp;
};

const inCompleteRouteRules: RouteRule[] = [
	{
		route: "/boards",
		valid: new RegExp(`^/boards/${REGEX_ID}(?:/cards/${REGEX_ID})?/?$`, "i"),
	},
];

export const isRouteValid = (route: string): boolean => {
	const normalizedRoute = route.split("?")[0].toLowerCase();

	return inCompleteRouteRules.some((rule) => {
		if (!normalizedRoute.startsWith(rule.route)) {
			return false;
		}

		return rule.valid.test(normalizedRoute);
	});
};

export const isRouteValidGuard: NavigationGuard = (to) => {
	if (to.matched.length > 0) {
		return true;
	}

	if (isRouteValid(to.path)) {
		useAppStore().handleApplicationError(HttpStatusCode.NotFound);
		return false;
	}

	return true;
};
