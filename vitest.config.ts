import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { getTsconfigAliases } from "./config/vite/tsconfig-aliases";

export default defineConfig(() => {
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
			Vuetify({
				autoImport: true,
			}),
		],
		resolve: {
			alias: [
				...tsconfigAliases,
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
		},
	};
});
