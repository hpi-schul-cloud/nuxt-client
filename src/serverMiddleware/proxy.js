/* Legacy Client Proxy */
const glob = require("glob");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const nuxtConfig = require("../../nuxt.config.js");

const proxyOptions = {
	changeOrigin: true,
	target: process.env.LEGACY_CLIENT_URL || "http://localhost:3100",
	logLevel: process.env.PROXY_LOG_LEVEL || "silent",
	onError: (err, req, res) => {
		console.error("Error occurred while trying to proxy request");
		res.writeHead(302, {
			Location: `/error/proxy?redirect=${encodeURIComponent(req.url)}`,
		});
		res.end();
	},
};
const proxyInstance = createProxyMiddleware(proxyOptions);

// eslint-disable-next-line no-console
console.log(
	process.env.LEGACY_CLIENT_URL
		? "LEGACY_CLIENT_URL ENV found. Routing all fallback requests to: " +
				process.env.LEGACY_CLIENT_URL
		: "LEGACY_CLIENT_URL ENV not found. Routing fallback to default url (http://localhost:3100)."
);
// eslint-disable-next-line no-console
console.log("PROXY TARGET:", proxyOptions.target);

const vueRoutes = require("./routes.js");
const isNuxtRoute = (url) =>
	vueRoutes.some((regexString) => !!new RegExp(regexString).exec(url));

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
