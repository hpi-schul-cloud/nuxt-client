const { createProxyMiddleware } = require("http-proxy-middleware");
const { isVueClient } = require("../../src/router/vue-client-route");
const {
	isEduSharing,
	isEduSharingRepo,
	isFileStorage,
	isH5pEditor,
	isServer,
} = require("../../src/router/server-route");
const url = require("url");
const path = require("path");

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

			// Copy assets before the dev server starts
			const __base = path.resolve(__dirname, "../..");

			const fs = require("fs-extra");
			const source = path.resolve(
				__base,
				"node_modules/ngx-edu-sharing-app-as-web-component"
			);
			const destination = path.resolve(
				__base,
				"public/content/vendor/edu-sharing"
			);
			fs.copySync(source, destination);

			return middlewares;
		},
		allowedHosts: "all",
		client: {
			overlay: false,
		},
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
