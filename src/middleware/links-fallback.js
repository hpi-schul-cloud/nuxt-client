const routes = require("../server/routes");

export default async function(ctx) {
	const { route } = ctx;

	const segments = route.path.split("/");
	const controllerName = segments[1];
	const legacyRouteConfig = routes.find((r) => {
		return typeof r === "object"
			? r.route.includes(controllerName)
			: r.includes(controllerName);
	});

	// no matching route => use (default) erro handler
	if (!route.matched.length) {
		return;
	}
	// no legacy route, but vue route found => use vue version
	if (!legacyRouteConfig) {
		return;
	}

	// route defined in vue and legacy client
	// use legacy if not excluded
	const useLegacy =
		// no routes excluded
		!(legacyRouteConfig || {}).routesExcluded ||
		// or current url doesn't match any excluded url
		(legacyRouteConfig.routesExcluded || []).every((excludedRoute) => {
			const fullPath = "/" + legacyRouteConfig.route + excludedRoute;
			return !fullPath.match(route.matched[0].regex);
		});
	if (useLegacy) {
		window.location = route.path;
	}
	// use vue
}
