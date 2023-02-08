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
} = require("./webpack-config/dev-server-config");
const { isServer, isFileStorage } = require("./src/router/server-route");
const { isVueClient } = require("./src/router/vue-client-route");

const vueClientProxy = createProxyMiddleware({
	target: "http://localhost:4000",
	changeOrigin: true,
});

const legacyClientProxy = createLegacyClientProxy();
const serverProxy = createServerProxy();
const fileStorageProxy = createFileStorageProxy();

const app = express();

app.use((req, res, next) => {
	const path = url.parse(req.originalUrl).pathname;

	if (isFileStorage(path)) {
		// console.log("--- serverPath: ", path);
		fileStorageProxy(req, res, next);
	} else if (isServer(path)) {
		// console.log("--- serverUrl: ", path);
		serverProxy(req, res, next);
	} else if (isVueClient(path)) {
		// console.log("--- vueUrl: ", path);
		vueClientProxy(req, res, next);
	} else {
		// console.log("--- legacyUrl: ", path);
		legacyClientProxy(req, res, next);
	}
});
app.listen(4242);
