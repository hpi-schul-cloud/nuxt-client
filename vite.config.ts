import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import Vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import tsconfigPaths from "vite-tsconfig-paths";
import { DevServerProxy } from "./config/vite/dev-server-proxy-plugin";
import { CspNoncePlaceholder } from "./config/vite/nonce-placeholder-plugin";
import { generateAliases } from "./config/vite/theme-aliases";
import { ThemeResolver } from "./config/vite/theme-resolver-plugin";
// import Checker from "vite-plugin-checker";

export default defineConfig(
	(async () => {
		const replacements = await generateAliases(__dirname);

		return {
			plugins: [
				tsconfigPaths({ loose: true }),
				Vue({
					template: { transformAssetUrls },
				}),
				VueDevTools(),
				Vuetify({
					autoImport: true,
					styles: {
						configFile: "src/styles/settings.scss",
					},
				}),
				VueI18nPlugin({
					//options
				}),
				DevServerProxy(),
				ThemeResolver(replacements),
				CspNoncePlaceholder("**CSP_NONCE**"),
				// TODO disable for test builds
				// Checker({
				// 	vueTsc: true,
				// 	eslint: {
				// 		lintCommand: "lint",
				// 		useFlatConfig: true,
				// 	},
				// }),
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
