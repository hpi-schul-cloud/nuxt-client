const { createProxyMiddleware } = require("http-proxy-middleware");
const { isLegacyClient } = require("../src/router/legacy-client-route");
const { isServer } = require("../src/router/server-route");

const createLegacyClientProxy = () => {
	const legacyClientProxy = createProxyMiddleware({
		target: "http://localhost:3100",
		changeOrigin: true,
	});
	return legacyClientProxy;
};

const createServerProxy = () => {
	const serverProxy = createProxyMiddleware({
		target: "http://localhost:3030",
		changeOrigin: true,
	});
	return serverProxy;
};

const createDevServerConfig = () => {
	const legacyClientProxy = createLegacyClientProxy();
	const serverProxy = createServerProxy();

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
	createLegacyClientProxy,
	createServerProxy,
	createDevServerConfig,
};
