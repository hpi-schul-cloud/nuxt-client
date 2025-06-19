import type { Plugin } from "vite";
import {
	isCommonCartridge,
	isFileStorage,
	isH5pEditor,
	isH5pStaticFiles,
	isServer,
} from "../../src/router/server-route.mjs";
import {
	createCommonCartridgeProxy,
	createFileStorageProxy,
	createH5pEditorProxy,
	createH5pStaticFilesProxy,
	createLegacyClientProxy,
	createServerProxy,
} from "./dev-server-config.mjs";
import { isVueClient } from "../../src/router/vue-client-route.mjs";

const DevServerProxy = (): Plugin => {
	const legacyClientProxy = createLegacyClientProxy();
	const serverProxy = createServerProxy();
	const fileStorageProxy = createFileStorageProxy();
	const h5pEditorProxy = createH5pEditorProxy();
	const h5pStaticFilesProxy = createH5pStaticFilesProxy();
	const commonCartridgeProxy = createCommonCartridgeProxy();

	return {
		name: "dev-server-proxy-middleware",
		configureServer: (server) => {
			server.middlewares.use((req, res, next) => {
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
					next();
				} else {
					legacyClientProxy(req, res, next);
				}
			});
		},
	};
};

export { DevServerProxy };
