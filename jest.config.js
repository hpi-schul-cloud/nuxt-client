// process.env.TZ = "Europe/Berlin";
const deepmerge = require("deepmerge");
// NUXT_REMOVAL we have to remove babel later.
// we have to keep it for now as a migration path for compatibility with legacy js components / tests
// dependencies that can be removed later after fully moving to typescript:
// @vue/cli-plugin-babel, babel-jest
// (do not forget to remove babel.config.js as well)
const defaultPreset = require("@vue/cli-plugin-unit-jest/presets/typescript-and-babel/jest-preset.js");

const config = deepmerge(defaultPreset, {
	testMatch: ["**/*.unit.{j,t}s?(x)"],

	moduleFileExtensions: ["mjs"],
	transform: {
		"^.+\\.mjs$": "babel-jest",
	},

	moduleNameMapper: {
		"^axios$": require.resolve("axios"),
		"\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/tests/test-utils/mediaFileMock.js",
		"^@data-(.*)$": "<rootDir>/src/components/data-$1",
		"^@feature-(.*)$": "<rootDir>/src/components/feature-$1",
		"^@page-(.*)$": "<rootDir>/src/components/page-$1",
		"^@ui-(.*)$": "<rootDir>/src/components/ui-$1",
		"^@util-(.*)$": "<rootDir>/src/components/util-$1",
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@@/(.*)$": "<rootDir>/$1",
	},

	setupFiles: ["./tests/setup.js"],

	collectCoverageFrom: [
		// Include
		"<rootDir>/src/components/**/*.{js,ts,vue}",
		"<rootDir>/src/pages/**/*.{js,vue}",
		"<rootDir>/src/mixins/**/*.js",
		"<rootDir>/src/plugins/**/*.(js|ts)",
		"<rootDir>/src/store/**/*.(js|ts)",
		"<rootDir>/src/utils/**/*.(js|ts)",
		"<rootDir>/src/composables/**/*.(js|ts)",
		"<rootDir>/src/layouts/**/*.{js,ts,vue}",
		// Exclude
		"!<rootDir>/src/components/base/components.js",
		"!<rootDir>/src/components/icons/**/*",
		"!<rootDir>/src/pages/ActivationCode.page.vue",
		"!<rootDir>/src/pages/Imprint.page.vue",
		"!<rootDir>/src/pages/LernStoreDetails.page.vue",
		"!<rootDir>/src/pages/LernStoreOverview.page.vue",
		"!<rootDir>/src/pages/NewsCreate.page.vue",
		"!<rootDir>/src/pages/NewsEdit.page.vue",
		"!<rootDir>/src/pages/ProxyError.page.vue",
	],

	globals: {
		"vue-jest": {
			compilerOptions: {
				isCustomElement: (tag) => tag.startsWith("h5p-"),
			},
		},
	},

	// maxWorkers: 2, // limited for not taking all workers within of a single github action
});

// we have to overwrite(!) config.transformIgnorePatterns here
// otherwise the rule would be added and have no effect
config.transformIgnorePatterns = ["/node_modules/(?!vuetify)/"];

module.exports = config;
