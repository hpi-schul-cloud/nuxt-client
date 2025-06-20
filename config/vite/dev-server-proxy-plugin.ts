import type { Plugin } from "vite";
import { createProxyMiddleware } from "./dev-server-config.mjs";

const DevServerProxy = (): Plugin => {
	return {
		name: "dev-server-proxy-middleware",
		configureServer: (server) => {
			server.middlewares.use(createProxyMiddleware());
		},
	};
};

export { DevServerProxy };
