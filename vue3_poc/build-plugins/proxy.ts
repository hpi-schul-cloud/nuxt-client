import { Plugin } from "vite";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "http-proxy-middleware/dist/types";

const isLegacyClient = (path: string): boolean => {
	return path.startsWith("/login") || path.startsWith("/logout");
};

const legacyClientProxy = createProxyMiddleware({
	target: "http://localhost:3100",
	changeOrigin: true,
});

const proxyPlugin = (): Plugin => ({
	name: "dev-server-proxy",
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			if (req.originalUrl && isLegacyClient(req.originalUrl)) {
				// console.log("--- legacyUrl: ", req.originalUrl);
				legacyClientProxy(req as Request, res as Response, next);
			} else {
				next();
			}
		});
	},
});

export default proxyPlugin;
