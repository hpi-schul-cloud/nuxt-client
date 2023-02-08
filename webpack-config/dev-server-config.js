const { createProxyMiddleware } = require("http-proxy-middleware");
const { isVueClient } = require("../src/router/vue-client-route");
const { isServer, isFileStorage } = require("../src/router/server-route");
const url = require("url");

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

const createFileStorageProxy = () => {
	const fileStorageProxy = createProxyMiddleware({
		target: "http://localhost:4444",
		changeOrigin: true,
	});
	return fileStorageProxy;
};

const createDevServerConfig = () => {
	const legacyClientProxy = createLegacyClientProxy();
	const serverProxy = createServerProxy();
	const fileStorageProxy = createFileStorageProxy();

	const devServerConfig = {
		port: 4000,
		setupMiddlewares: (middlewares, devServer) => {
			if (!devServer) {
				throw new Error("webpack-dev-server is not defined");
			}

			middlewares.unshift({
				name: "dev-server-proxy",
				middleware: (req, res, next) => {
					const path = url.parse(req.originalUrl).pathname;

					if (isFileStorage(path)) {
						// console.log("--- serverPath: ", path);
						fileStorageProxy(req, res, next);
					} else if (isServer(path)) {
						// console.log("--- serverPath: ", path);
						serverProxy(req, res, next);
					} else if (isVueClient(path)) {
						// console.log("--- vuePath: ", path);
						next();
					} else {
						// console.log("--- legacyPath: ", path);
						legacyClientProxy(req, res, next);
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
	createFileStorageProxy,
};
