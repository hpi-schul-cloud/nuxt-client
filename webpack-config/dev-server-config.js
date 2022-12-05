const { createProxyMiddleware } = require("http-proxy-middleware");
const { isLegacyClient } = require("@/router/legacy-client-route");
const { isServer } = require("@/router/server-route");

let legacyClientProxy;
let serverProxy;

const createDevServerConfig = () => {
	legacyClientProxy = createProxyMiddleware({
		target: "http://localhost:3100",
		changeOrigin: true,
	});

	serverProxy = createProxyMiddleware({
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
						// console.log("--- vueUrl: ", path);
						next();
					}
				},
			});

			return middlewares;
		},
	};

	return devServerConfig;
};

module.exports = {
	isServer,
	legacyClientProxy,
	serverProxy,
	devServer:
		process.env.NODE_ENV === "development" ? createDevServerConfig() : {},
};
