const routes = require("../server/routes");

export default async function(ctx, cb) {
	const { route } = ctx;

	const segments = route.path.split("/");
	const controllerName = segments[1];
	const legacyRoute = routes.find((r) => {
		if (typeof r === "object") {
			return r.route.includes(controllerName);
		} else {
			return r.includes(controllerName);
		}
	});

	if (legacyRoute) {
		if (!legacyRoute.routesExcluded) {
			window.location = route.path;
		} else {
			const isLegacy = legacyRoute.routesExcluded.some((excludedRoute) => {
				const fullPath = "/" + legacyRoute.route + excludedRoute;
				return !fullPath.match(route.matched[0].regex);
			});
			if (isLegacy) {
				window.location = route.path;
			} else {
				cb();
			}
		}
	}
}
