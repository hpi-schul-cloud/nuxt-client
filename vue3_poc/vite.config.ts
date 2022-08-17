import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
// https://stackoverflow.com/questions/72350551/combination-of-vue-3-vuetify-3-vue-test-utils-results-in-could-not-find-in
export default defineConfig({
	server: {
		port: 4000,
	},
	plugins: [vue()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "vuetify.config.js",
		deps: {
			inline: ["vuetify"],
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
});
