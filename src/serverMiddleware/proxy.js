/* Legacy Client Proxy */

const proxy = require("http-proxy-middleware");

const proxyOptions = {
	changeOrigin: true,
	target: process.env.LEGACY_CLIENT_URL || "http://localhost:3100",
	logLevel: process.env.PROXY_LOG_LEVEL || "warn",
};
const proxyInstance = proxy(proxyOptions);

const vueRoutes = require("./routes.js");
const isNuxtRoute = (url) =>
	vueRoutes.some((regexString) => !!new RegExp(regexString).exec(url));

const glob = require("glob");
const path = require("path");
const nuxtConfig = require("../../nuxt.config.js");

const staticFileDir = path
	.relative(__dirname, nuxtConfig.generate.dir)
	.replace(/\\/g, "/");

const staticFiles = glob
	.sync(staticFileDir + "/**/*.*", {
		cwd: __dirname,
		ignore: "**/*.html", // exclude prerendered pages (covered by the whitelist)
	})
	.map((m) => m.replace(staticFileDir, ""));

const isStaticFile = (url) => staticFiles.includes(url);

export default async function(req, res, next) {
	if (process.env.FALLBACK_DISABLED === "true") {
		return next();
	}

	const useNuxt =
		req.method === "GET" && (isNuxtRoute(req.url) || isStaticFile(req.url));
	if (useNuxt) {
		return next();
	} else {
		return proxyInstance(req, res, next);
	}
}
