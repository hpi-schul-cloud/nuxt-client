const proxy = require("http-proxy-middleware");
const glob = require("glob");
const path = require("path");
const nuxtConfig = require("../../nuxt.config.js");

const proxyOptions = {
	changeOrigin: true,
	target: process.env.LEGACY_CLIENT_URL || "http://localhost:3100",
	logLevel: process.env.LOG_LEVEL || "warn",
};
const proxInstance = proxy(proxyOptions);

const vueRoutesWhitelist = require("./routes.js");

const staticFileDir = path
	.relative(__dirname, nuxtConfig.generate.dir)
	.replace(/\\/g, "/");
const staticFiles = glob
	.sync(staticFileDir + "/**", { cwd: __dirname })
	.map((m) => m.replace(staticFileDir, ""));

export default async function(req, res, next) {
	console.log(req.method, req.url);
	const isNuxtRoute = vueRoutesWhitelist.some(
		(regexString) => !!new RegExp(regexString).exec(req.url)
	);
	const isStaticFile = staticFiles.includes(req.url);
	if (req.method === "GET" && (isNuxtRoute || isStaticFile)) {
		return next();
	} else {
		return proxInstance(req, res, next);
	}
}
