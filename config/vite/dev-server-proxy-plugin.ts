import { proxyMiddleware } from "./dev-server-config.mjs";
import type { Plugin } from "vite";

const DevServerProxy = (): Plugin => ({
	name: "dev-server-proxy-middleware",
	configureServer: (server) => {
		server.middlewares.use(proxyMiddleware);
	},
	configurePreviewServer: (server) => {
		server.middlewares.use(proxyMiddleware);
	},
});

export { DevServerProxy };
