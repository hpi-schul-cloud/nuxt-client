import { REGEX_ID } from "../utils/validation/validationUtil";

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
	{
		prefix: "/collabora",
		valid: new RegExp(`^/collabora/${REGEX_ID}/?$`, "i"),
	},
	{
		prefix: "/h5p/player",
		valid: new RegExp(`^/h5p/player/${REGEX_ID}/?$`, "i"),
	},
	{
		prefix: "/rooms/invitation-link",
		valid: new RegExp(`^/rooms/invitation-link/${REGEX_ID}/?$`, "i"),
	},
];

const normalizeRoutePath = (route: string): string => route.split("?")[0].toLowerCase();

const checkRouteRules = (route: string, rule: PrefixRouteRule): boolean => {
	const normalizedRoute = normalizeRoutePath(route);

	if (!normalizedRoute.startsWith(rule.prefix)) {
		return false;
	}

	return rule.valid.test(normalizedRoute);
};

export const isCompletePrefixedRoute = (route: string): boolean =>
	PREFIX_ROUTE_RULES.some((rule) => checkRouteRules(route, rule));

export const isIncompletePrefixedRoute = (route: string): boolean => {
	const normalizedRoute = normalizeRoutePath(route);

	return PREFIX_ROUTE_RULES.some((rule) => normalizedRoute.startsWith(rule.prefix) && !checkRouteRules(route, rule));
};
