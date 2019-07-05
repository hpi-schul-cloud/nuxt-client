const routes = require("../server/routes");

export default async function(ctx, cb) {
	const { route } = ctx;

	const segments = route.path.split("/");
	const controllerName = segments[1];
	const legacyRouteConfig =
		routes.find((r) => {
			return typeof r === "object"
				? r.route.includes(controllerName)
				: r.includes(controllerName);
		}) || {};

	// current url doesn't match any excluded url
	const isLegacy = (legacyRouteConfig.routesExcluded || []).every(
		(excludedRoute) => {
			const fullPath = "/" + legacyRouteConfig.route + excludedRoute;
			return !fullPath.match(route.matched[0].regex);
		}
	);

	if (isLegacy) {
		window.location = route.path;
	} else {
		cb();
	}
}
