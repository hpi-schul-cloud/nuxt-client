const { createProxyMiddleware } = require("http-proxy-middleware");
const { isVueClient } = require("../src/router/vue-client-route");
const {
	isEduSharing,
	isEduSharingRepo,
	isFileStorage,
	isH5pEditor,
	isServer,
} = require("../src/router/server-route");
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

const createEduSharingProxy = () => {
	const eduSharingProxy = createProxyMiddleware({
		target: "http://localhost:4450",
		changeOrigin: true,
	});
	return eduSharingProxy;
};

const createFileStorageProxy = () => {
	const fileStorageProxy = createProxyMiddleware({
		target: "http://localhost:4444",
		changeOrigin: true,
	});
	return fileStorageProxy;
};

const createH5pEditorProxy = () => {
	const h5pEditorProxy = createProxyMiddleware({
		target: "http://localhost:4448",
		changeOrigin: true,
	});
	return h5pEditorProxy;
};

const createEduSharingRepoProxy = () => {
	const eduSharingRepoProxy = createProxyMiddleware({
		target: "http://localhost:8100",
		changeOrigin: true,
	});
	return eduSharingRepoProxy;
};

const createDevServerConfig = () => {
	const legacyClientProxy = createLegacyClientProxy();
	const serverProxy = createServerProxy();
	const eduSharingProxy = createEduSharingProxy();
	const eduSharingRepoProxy = createEduSharingRepoProxy();
	const fileStorageProxy = createFileStorageProxy();
	const h5pEditorProxy = createH5pEditorProxy();

	const devServerConfig = {
		historyApiFallback: true,
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
						fileStorageProxy(req, res, next);
					} else if (isH5pEditor(path)) {
						h5pEditorProxy(req, res, next);
					} else if (isEduSharing(path)) {
						eduSharingProxy(req, res, next);
					} else if (isEduSharingRepo(path)) {
						eduSharingRepoProxy(req, res, next);
					} else if (isServer(path)) {
						serverProxy(req, res, next);
					} else if (isVueClient(path)) {
						next();
					} else {
						legacyClientProxy(req, res, next);
					}
				},
			});

			return middlewares;
		},
		allowedHosts: "all",
	};

	return devServerConfig;
};

module.exports = {
	createLegacyClientProxy,
	createServerProxy,
	createDevServerConfig,
	createFileStorageProxy,
	createH5pEditorProxy,
};
