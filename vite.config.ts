// Plugins
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { DevServerProxy } from "./config/vite/dev-server-proxy-plugin";
import { ThemeResolver } from "./config/vite/theme-resolver-plugin";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { generateAliases } from "./config/vite/theme-aliases";

// https://vitejs.dev/config/
export default defineConfig(
	(async () => {
		const replacements = await generateAliases(__dirname);

		return {
			plugins: [
				tsconfigPaths({ loose: true }),

				Vue({
					template: { transformAssetUrls },
				}),
				// https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
				Vuetify({
					autoImport: true,
					styles: {
						configFile: "src/styles/settings.scss",
					},
				}),
				// https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
				VueI18nPlugin({
					//options
				}),
				DevServerProxy(),
				ThemeResolver(replacements),
			],
			optimizeDeps: {
				exclude: [
					"vuetify",
					"vue-router",
					"unplugin-vue-router/runtime",
					"unplugin-vue-router/data-loaders",
					"unplugin-vue-router/data-loaders/basic",
				],
			},
			define: { "process.env": {} },
			resolve: {
				alias: {
					"@": fileURLToPath(new URL("src", import.meta.url)),
				},
				extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
			},
			build: {
				assetsDir: "_nuxt",
			},
			server: {
				port: 4000,
			},
			css: {
				preprocessorOptions: {
					sass: {
						api: "modern-compiler",
					},
					scss: {
						api: "modern-compiler",
					},
				},
			},
		};
	})()
);
