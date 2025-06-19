/*
  Note: This app is for testing purposes only,
  e.g. in order to run the vue client in a docker container on localhost
*/
import connect from "connect";
import http from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import {
	createLegacyClientProxy,
	createServerProxy,
	createFileStorageProxy,
	createH5pEditorProxy,
	createH5pStaticFilesProxy,
	createCommonCartridgeProxy,
} from "./config/vite/dev-server-config.mjs";
import {
	isServer,
	isFileStorage,
	isH5pEditor,
	isH5pStaticFiles,
	isCommonCartridge,
} from "./src/router/server-route.mjs";
import { isVueClient } from "./src/router/vue-client-route.mjs";

const vueClientProxy = createProxyMiddleware({
	target: "http://localhost:4000",
	changeOrigin: true,
});

const legacyClientProxy = createLegacyClientProxy();
const serverProxy = createServerProxy();
const fileStorageProxy = createFileStorageProxy();
const h5pEditorProxy = createH5pEditorProxy();
const h5pStaticFilesProxy = createH5pStaticFilesProxy();
const commonCartridgeProxy = createCommonCartridgeProxy();

const app = connect();

app.use((req, res, next) => {
	const url = req.originalUrl || req.url;
	if (!url) return next();

	const path = url.split("?")[0];
	console.log("--- Path:", path);

	if (isFileStorage(path)) {
		fileStorageProxy(req, res, next);
	} else if (isCommonCartridge(path)) {
		commonCartridgeProxy(req, res, next);
	} else if (isH5pStaticFiles(path)) {
		h5pStaticFilesProxy(req, res, next);
	} else if (isH5pEditor(path)) {
		h5pEditorProxy(req, res, next);
	} else if (isServer(path)) {
		serverProxy(req, res, next);
	} else if (isVueClient(path)) {
		vueClientProxy(req, res, next);
	} else {
		legacyClientProxy(req, res, next);
	}
});
http.createServer(app).listen(4242);
