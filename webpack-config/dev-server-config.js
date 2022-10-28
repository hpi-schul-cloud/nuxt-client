const { createProxyMiddleware } = require("http-proxy-middleware");

const legacyRoutes = [
	"^/login",
	"^/logout",
	"^/styles",
	"^/fonts/ptsans",
	"^/scripts",
	"^/images",
	"^/vendor-optimized",
	"^/alerts",
	"^/dashboard",
	"^/homework",
	"^/teams",
	"^/courses",
	"^/files",
	"^/news",
	"^/calendar",
	"^/help",
	"^/addons",
	"^/administration/?$",
];

const isLegacyClient = (path) => {
	return legacyRoutes.some((regex) => new RegExp(regex).exec(path));
};

const isServer = (path) => {
	return path.startsWith("/api/v");
};

const legacyClientProxy = createProxyMiddleware({
	target: "http://localhost:3100",
	changeOrigin: true,
});

const serverProxy = createProxyMiddleware({
	target: "http://localhost:3030",
	changeOrigin: true,
});

const devServerConfig = {
	port: 4000,
	setupMiddlewares: (middlewares, devServer) => {
		if (!devServer) {
			throw new Error("webpack-dev-server is not defined");
		}

		middlewares.unshift({
			name: "dev-server-proxy",
			middleware: (req, res, next) => {
				const path = req.originalUrl;

				if (path && isServer(path)) {
					// console.log("--- serverUrl: ", path);
					serverProxy(req, res, next);
				} else if (path && isLegacyClient(path)) {
					// console.log("--- legacyUrl: ", path);
					legacyClientProxy(req, res, next);
				} else {
					next();
				}
			},
		});

		return middlewares;
	},
};

module.exports = {
	devServer: devServerConfig,
};
