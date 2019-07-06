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

	// no matching vue route => use legacy router
	if (!route.matched.length) {
		window.location = route.path;
		return;
	}
	// no legacy route, but vue route found => use vue version
	if (!legacyRouteConfig) {
		return;
	}

	// route defined in vue and legacy client
	// use legacy if not excluded
	const useLegacy =
		!legacyRouteConfig.routesExcluded ||
		// current url doesn't match any excluded url
		(legacyRouteConfig.routesExcluded || []).every((excludedRoute) => {
			const fullPath = "/" + legacyRouteConfig.route + excludedRoute;
			return !fullPath.match(route.matched[0].regex);
		});
	if (useLegacy) {
		window.location = route.path;
		return;
	}
}
