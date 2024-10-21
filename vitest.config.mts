import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// avoid having to import basic functions
		globals: true,
	},
});
