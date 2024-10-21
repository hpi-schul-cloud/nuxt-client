// .mts extension to avoid CJS deprecation warning

// https://github.com/vuejs/core/blob/main/vitest.config.ts
// https://vitest.dev/config/
import path from "path";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	// for aliases to work
	plugins: [tsconfigPaths()],
	resolve: {
		alias: {
			"\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
				path.resolve(__dirname, "./tests/test-utils/mediaFileMock.js"),
			"^@data-(.*)$": path.resolve(__dirname, "./src/modules/data/$1"),
			"^@feature-(.*)$": path.resolve(__dirname, "./src/modules/feature/$1"),
			"^@page-(.*)$": path.resolve(__dirname, "./src/modules/page/$1"),
			"^@ui-(.*)$": path.resolve(__dirname, "./src/modules/ui/$1"),
			"^@util-(.*)$": path.resolve(__dirname, "./src/modules/util/$1"),
			"^@icons(.*)$": path.resolve(__dirname, "./src/components/icons/$1"),
			"^@/(.*)$": path.resolve(__dirname, "./src/$1"),
			"^@@/(.*)$": path.resolve(__dirname, "./$1"),
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
