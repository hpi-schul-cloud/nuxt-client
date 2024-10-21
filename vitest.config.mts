// .mts extension to avoid CJS deprecation warning

// https://github.com/vuejs/core/blob/main/vitest.config.ts
// https://vitest.dev/config/
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
				"<rootDir>/tests/test-utils/mediaFileMock.js",
			"^@data-(.*)$": "<rootDir>/src/modules/data/$1",
			"^@feature-(.*)$": "<rootDir>/src/modules/feature/$1",
			"^@page-(.*)$": "<rootDir>/src/modules/page/$1",
			"^@ui-(.*)$": "<rootDir>/src/modules/ui/$1",
			"^@util-(.*)$": "<rootDir>/src/modules/util/$1",
			"^@icons(.*)$": "<rootDir>/src/components/icons/$1",
			"^@/(.*)$": "<rootDir>/src/$1",
			"^@@/(.*)$": "<rootDir>/$1",
		},
	},
	test: {
		// include *.unit.[js|ts] files
		include: ["**/*.{test,spec,unit}.?(c|m)[jt]s?(x)"],
		// avoid having to import basic functions
		globals: true,
		// Use jsdom for browser-like tests
		environment: "jsdom",
		// run lifecycle hooks sequentially
		sequence: {
			hooks: "list",
		},
		setupFiles: ["./tests/setup.js"],
	},
});
