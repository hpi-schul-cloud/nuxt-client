import { proxyMiddleware } from "./dev-server-config.js";
import type { Plugin } from "vite";

export const DevServerProxy = (): Plugin => ({
	name: "dev-server-proxy-middleware",
	configureServer: (server) => {
		server.middlewares.use(proxyMiddleware);
	},
	configurePreviewServer: (server) => {
		server.middlewares.use(proxyMiddleware);
	},
});
