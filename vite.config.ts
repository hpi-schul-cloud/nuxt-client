/* eslint-disable no-console */
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import Vue from "@vitejs/plugin-vue";
import { defineConfig, type UserConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { DevServerProxy } from "./config/vite/dev-server-proxy-plugin";
import { CspNoncePlaceholder } from "./config/vite/nonce-placeholder-plugin";
import { generateAliases } from "./config/vite/theme-aliases";
import { ThemeResolver } from "./config/vite/theme-resolver-plugin";
import { getTsconfigAliases } from "./config/vite/tsconfig-aliases";
import Checker from "vite-plugin-checker";
import path from "node:path";

export default defineConfig(async ({ mode }): Promise<UserConfig> => {
	console.log(`Vite mode: ${mode}`);
	const replacements = await generateAliases(path.resolve(__dirname));
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
			mode === "development"
				? Checker({
						vueTsc: true,
						eslint: {
							lintCommand: "eslint 'src/**/*.{ts,js,vue}'",
							useFlatConfig: true,
						},
					})
				: undefined,
		],
		optimizeDeps: {
			include: [
				"axios",
				"dayjs",
				"object-hash",
				"sortablejs",
				"socket.io-client",
				"focus-trap",
				"maska",
				"vuedraggable",
				"@vueuse/core",
				"@vueuse/integrations",
				"@vueuse/components",
				"@vuelidate/core",
				"@vuelidate/validators",
			],
			exclude: ["vuetify"],
		},
		define: { "process.env": {} },
		resolve: {
			alias: [
				...tsconfigAliases,
				// any additional aliases
			],
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
					// Add Sass options here if needed
				},
				scss: {
					// Add SCSS options here if needed
				},
			},
		},
	};
});
