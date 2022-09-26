import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import { UserConfig } from "vite";

import generateAliases from "./build-plugins/generateAliases";
import proxy from "./build-plugins/proxy";
import replaceFiles from "./build-plugins/rollup/replaceFiles";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig(async () => {
	const replacements = await generateAliases(__dirname);

	const config: UserConfig = {
		server: {
			port: 4000,
		},
		plugins: [
			vue(),
			vuetify({ styles: "expose" }),
			replaceFiles(replacements),
			proxy(),
		],
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
