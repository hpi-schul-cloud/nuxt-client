import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import Vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { DevServerProxy } from "./config/vite/dev-server-proxy-plugin";
import { CspNoncePlaceholder } from "./config/vite/nonce-placeholder-plugin";
import { generateAliases } from "./config/vite/theme-aliases";
import { ThemeResolver } from "./config/vite/theme-resolver-plugin";
import { getTsconfigAliases } from "./config/vite/tsconfig-aliases";
// import Checker from "vite-plugin-checker";

export default defineConfig(
	(async () => {
		const replacements = await generateAliases(__dirname);
		const tsconfigAliases = getTsconfigAliases();

		return {
			plugins: [
				Vue({
					template: {
						transformAssetUrls,
						compilerOptions: {
							isCustomElement: (tag) => tag.startsWith("h5p-"),
						},
					},
				}),
				VueDevTools(),
				Vuetify({
					autoImport: true,
					styles: {
						configFile: "src/styles/settings.scss",
					},
				}),
				VueI18nPlugin({
					include: "src/locales/!(schema).ts",
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
				include: [
					"axios",
					"dayjs",
					"lodash",
					"object-hash",
					"sortablejs",
					"socket.io-client",
					"focus-trap",
					"maska",
					"vue",
					"vue-i18n",
					"vue-router",
					"pinia",
					"vuedraggable",
					"@vueuse/core",
					"@vueuse/integrations",
					"@vueuse/components",
					"@vuelidate/core",
					"@vuelidate/validators",
				],
				exclude: ["vuetify"],
				entries: ["./src/main.ts"],
			},
			define: { "process.env": {} },
			resolve: {
				alias: {
					...tsconfigAliases,
					// any additional aliases
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
