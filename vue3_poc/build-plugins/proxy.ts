import { Plugin } from "vite";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "http-proxy-middleware/dist/types";

const isLegacyClient = (path: string): boolean => {
	return path.startsWith("/login") || path.startsWith("/logout");
};

const isServer = (path: string): boolean => {
	return path.startsWith("/api/v");
};

const legacyClientProxy = createProxyMiddleware({
	target: "http://localhost:3100",
	changeOrigin: true,
});

const serverProxy = createProxyMiddleware({
	target: "http://localhost:3030",
	changeOrigin: true,
});

const proxyPlugin = (): Plugin => ({
	name: "dev-server-proxy",
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			const path = req.originalUrl;

			if (path && isServer(path)) {
				// console.log("--- serverUrl: ", path);
				serverProxy(req as Request, res as Response, next);
			} else if (path && isLegacyClient(path)) {
				// console.log("--- legacyUrl: ", path);
				legacyClientProxy(req as Request, res as Response, next);
			} else {
				next();
			}
		});
	},
});

export default proxyPlugin;
