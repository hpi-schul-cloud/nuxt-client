// Plugins
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import tsconfigPaths from "vite-tsconfig-paths";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
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
});
