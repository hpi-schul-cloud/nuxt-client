import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import { UserConfig } from "vite";

import buildDefines from "./build-plugins/buildDefines";
import generateAliases from "./build-plugins/generateAliases";
import replaceFiles from "./build-plugins/rollup/replaceFiles";

import metadata from "./build-plugins/rollup/metadata";
import getThemeDefines from "./build-plugins/getThemeDefines";

// https://vitejs.dev/config/
// https://stackoverflow.com/questions/72350551/combination-of-vue-3-vuetify-3-vue-test-utils-results-in-could-not-find-in
export default defineConfig(async () => {
	const replacements = await generateAliases(__dirname);

	const configBase: UserConfig = {
		server: {
			port: 4000,
		},
		plugins: [vue(), metadata(), replaceFiles(replacements)],
		define: {
			...buildDefines(),
			...getThemeDefines(),
		},
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

	if (process.env.SC_THEME === "brb") {
		return {
			...configBase,
			...configBrb,
		};
	}

	if (process.env.SC_THEME === "n21") {
		return {
			...configBase,
			...configN21,
		};
	}

	return { ...configBase };
});

const configBrb: UserConfig = {
	server: {
		port: 4001,
	},
};

const configN21: UserConfig = {
	server: {
		port: 4002,
	},
};
