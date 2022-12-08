/*
  Note: This app is for testing purposes only,
  e.g. in order to run the vue client in a docker container on localhost
*/
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {
	createLegacyClientProxy,
	createServerProxy,
} = require("./webpack-config/dev-server-config");
const { isLegacyClient } = require("./src/router/legacy-client-route");
const { isServer } = require("./src/router/server-route");

const vueClientProxy = createProxyMiddleware({
	target: "http://localhost:4000",
	changeOrigin: true,
});

const legacyClientProxy = createLegacyClientProxy();
const serverProxy = createServerProxy();

const app = express();

app.use((req, res, next) => {
	const path = req.originalUrl;

	if (path && isServer(path)) {
		// console.log("--- serverUrl: ", path);
		serverProxy(req, res, next);
	} else if (path && isLegacyClient(path)) {
		// console.log("--- legacyUrl: ", path);
		legacyClientProxy(req, res, next);
	} else {
		// console.log("--- vueUrl: ", path);
		vueClientProxy(req, res, next);
	}
});
app.listen(4242);
