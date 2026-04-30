import {
	isArchiveDownload,
	isCommonCartridge,
	isFileStorage,
	isFWUEndpoint,
	isH5pEditor,
	isH5pStaticFiles,
	isServer,
} from "../../src/router/server-route.mjs";
import { isVueClient } from "../../src/router/vue-client-route.mjs";
import { createProxyMiddleware } from "http-proxy-middleware";

const createProxy = (port) => {
	const target = `http://localhost:${port}`;

	return createProxyMiddleware({ target, changeOrigin: true });
};

export const proxyMiddleware = (req, res, next) => {
	const url = req.originalUrl || req.url;
	if (!url) return next();

	const path = url.split("?")[0];

	if (isFileStorage(path)) {
		const fileStorageProxy = createProxy(4444);
		fileStorageProxy(req, res, next);
	} else if (isH5pStaticFiles(path)) {
		const h5pStaticFilesProxy = createProxy(8080);
		h5pStaticFilesProxy(req, res, next);
	} else if (isH5pEditor(path)) {
		const h5pEditorProxy = createProxy(4448);
		h5pEditorProxy(req, res, next);
	} else if (isArchiveDownload(path)) {
		const archiveDownloadProxy = createProxy(3351);
		archiveDownloadProxy(req, res, next);
	} else if (isFWUEndpoint(path)) {
		const fwuEditorProxy = createProxy(4446);
		fwuEditorProxy(req, res, next);
	} else if (isCommonCartridge(path)) {
		const commonCartridgeProxy = createProxy(3350);
		commonCartridgeProxy(req, res, next);
	} else if (isServer(path)) {
		const serverProxy = createProxy(3030);
		serverProxy(req, res, next);
	} else if (isVueClient(path)) {
		next();
	} else {
		const legacyClientProxy = createProxy(3100);
		legacyClientProxy(req, res, next);
	}
};
