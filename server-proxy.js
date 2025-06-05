const url = require("url");

/*
  Note: This app is for testing purposes only,
  e.g. in order to run the vue client in a docker container on localhost
*/
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {
	createLegacyClientProxy,
	createServerProxy,
	createFileStorageProxy,
	createH5pEditorProxy,
	createH5pStaticFilesProxy,
	createCommonCartridgeProxy,
} = require("./config/webpack/dev-server-config");
const {
	isServer,
	isFileStorage,
	isH5pEditor,
	isH5pStaticFiles,
	isCommonCartridge,
} = require("./src/router/server-route");
const { isVueClient } = require("./src/router/vue-client-route");

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

const app = express();

app.use((req, res, next) => {
	const path = url.parse(req.originalUrl).pathname;

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
		vueClientProxy(req, res, next);
	} else {
		legacyClientProxy(req, res, next);
	}
});
app.listen(4242);
