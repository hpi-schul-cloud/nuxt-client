import { REGEX_ID } from "@/utils/validation";

export type PrefixRouteRule = {
	prefix: string;
	valid: RegExp;
};

export const PREFIX_ROUTE_RULES: PrefixRouteRule[] = [
	{
		prefix: "/boards",
		valid: new RegExp(`^/boards/${REGEX_ID}(?:/cards/${REGEX_ID})?/?$`, "i"),
	},
	{
		prefix: "/folder",
		valid: new RegExp(`^/folder/${REGEX_ID}(?:/trash)?/?$`, "i"),
	},
];

const normalizeRoutePath = (route: string): string => route.split("?")[0].toLowerCase();

const matchesPrefixRouteRule = (route: string, rule: PrefixRouteRule): boolean => {
	const normalizedRoute = normalizeRoutePath(route);

	if (!normalizedRoute.startsWith(rule.prefix)) {
		return false;
	}

	return rule.valid.test(normalizedRoute);
};

export const isCompletePrefixedRoute = (route: string): boolean =>
	PREFIX_ROUTE_RULES.some((rule) => matchesPrefixRouteRule(route, rule));

export const isIncompletePrefixedRoute = (route: string): boolean =>
	PREFIX_ROUTE_RULES.some((rule) => {
		const normalizedRoute = normalizeRoutePath(route);

		if (!normalizedRoute.startsWith(rule.prefix)) {
			return false;
		}

		return !rule.valid.test(normalizedRoute);
	});
