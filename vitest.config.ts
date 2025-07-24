import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { fileURLToPath, URL } from "node:url";
import { getTsconfigAliases } from "./config/vite/tsconfig-aliases";
import { StripVueStyles } from "./config/vite/strip-vue-styles-plugin";

export default defineConfig({
	plugins: [
		Vue({
			template: {
				transformAssetUrls,
				compilerOptions: {
					isCustomElement: (tag) => tag.startsWith("h5p-"),
				},
			},
		}),
		Vuetify({
			autoImport: true,
		}),
		StripVueStyles(),
	],
	resolve: {
		alias: [
			...getTsconfigAliases(),
			{
				find: /\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
				replacement: fileURLToPath(
					new URL("tests/test-utils/mediaFileMock.js", import.meta.url)
				),
			},
			{
				find: /^@@\/(.*)$/,
				replacement: fileURLToPath(new URL("$1", import.meta.url)),
			},
		],
		extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
	},
	test: {
		globals: true,
		environment: "jsdom",
		include: ["**/*.unit.{j,t}s?(x)"],
		setupFiles: ["./tests/setup.js"],
		server: {
			deps: {
				inline: ["vuetify"],
			},
		},
		coverage: {
			provider: "v8",
			reportOnFailure: true,
			include: [
				"src/components/**/*.{js,ts,vue}",
				"src/modules/**/*.{js,ts,vue}",
				"src/pages/**/*.{js,ts,vue}",
				"src/mixins/**/*.js",
				"src/plugins/**/*.{js,ts}",
				"src/router/**/*.{js,ts}",
				"src/store/**/*.{js,ts}",
				"src/utils/**/*.{js,ts}",
				"src/composables/**/*.{js,ts}",
				"src/layouts/**/*.{js,ts,vue}",
				"lib/eslint-plugin-schulcloud/**/*.{js,ts,vue}",
			],
			exclude: [
				"src/components/base/**/*",
				"src/components/icons/**/*",
				"**/types/**",
				"**/*.types.{js,ts}",
				"**/types.ts",
				"**/index.{js,ts}",
				"src/utils/insights/**/*",
			],
		},
	},
});
