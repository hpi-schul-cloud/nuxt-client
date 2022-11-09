import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import { UserConfig } from "vite";

import generateAliases from "./build-plugins/generateAliases";
import proxy from "./build-plugins/proxy";
import replaceFiles from "./build-plugins/rollup/replaceFiles";
import vuetify from "vite-plugin-vuetify";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

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
			// https://vue-i18n.intlify.dev/guide/advanced/optimization.html#how-to-configure
			VueI18nPlugin({
				include: resolve(__dirname, "./src/locales/**"),
			}),
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
