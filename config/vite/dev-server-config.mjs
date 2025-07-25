import { createProxyMiddleware } from "http-proxy-middleware";
import {
	isCommonCartridge,
	isFileStorage,
	isH5pEditor,
	isH5pStaticFiles,
	isServer,
} from "../../src/router/server-route.mjs";
import { isVueClient } from "../../src/router/vue-client-route.mjs";

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

const createVueClientProxy = () => {
	const vueClientProxy = createProxyMiddleware({
		target: "http://localhost:4000",
		changeOrigin: true,
	});
	return vueClientProxy;
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

const createH5pStaticFilesProxy = () => {
	const h5pStaticFilesProxy = createProxyMiddleware({
		target: "http://localhost:8080",
		changeOrigin: true,
		pathRewrite: { "^/api/v3/h5p-editor": "" },
	});
	return h5pStaticFilesProxy;
};

const createCommonCartridgeProxy = () => {
	const commonCartridgeProxy = createProxyMiddleware({
		target: "http://localhost:3350",
		changeOrigin: true,
	});
	return commonCartridgeProxy;
};

const proxyDispatcherMiddleware = ({ useVueClientProxy = false } = {}) => {
	const legacyClientProxy = createLegacyClientProxy();
	const serverProxy = createServerProxy();
	const vueClientProxy = createVueClientProxy();
	const fileStorageProxy = createFileStorageProxy();
	const h5pEditorProxy = createH5pEditorProxy();
	const h5pStaticFilesProxy = createH5pStaticFilesProxy();
	const commonCartridgeProxy = createCommonCartridgeProxy();

	return (req, res, next) => {
		const url = req.originalUrl || req.url;
		if (!url) return next();

		const path = url.split("?")[0];
		// console.log('--- Path:', path);

		if (isFileStorage(path)) {
			fileStorageProxy(req, res, next);
		} else if (isH5pStaticFiles(path)) {
			h5pStaticFilesProxy(req, res, next);
		} else if (isH5pEditor(path)) {
			h5pEditorProxy(req, res, next);
		} else if (isCommonCartridge(path)) {
			commonCartridgeProxy(req, res, next);
		} else if (isServer(path)) {
			serverProxy(req, res, next);
		} else if (isVueClient(path)) {
			if (useVueClientProxy) {
				vueClientProxy(req, res, next);
			} else {
				next();
			}
		} else {
			legacyClientProxy(req, res, next);
		}
	};
};

export { proxyDispatcherMiddleware as createProxyMiddleware };
