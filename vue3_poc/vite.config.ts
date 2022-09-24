import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import { UserConfig } from "vite";

import generateAliases from "./build-plugins/generateAliases";
import replaceFiles from "./build-plugins/rollup/replaceFiles";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig(async () => {
	const replacements = await generateAliases(__dirname);

	const config: UserConfig = {
		server: {
			port: 4000,
			proxy: {
				"/login": {
					target: "http://localhost:3100",
					changeOrigin: true,
				},
				"/logout": {
					target: "http://localhost:3100",
					changeOrigin: true,
				},
			},
		},
		plugins: [vue(), vuetify({ styles: "expose" }), replaceFiles(replacements)],
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "vuetify.config.js",
			deps: {
				inline: ["vuetify"],
			},
		},
		css: {
			devSourcemap: true,
		},
		resolve: {
			alias: {
				"@": resolve(__dirname, "src"),
			},
		},
	};

	return config;
});
