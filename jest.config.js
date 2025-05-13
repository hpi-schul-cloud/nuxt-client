const config = {
	verbose: true,

	testEnvironment: "jsdom",
	testEnvironmentOptions: {
		customExportConditions: ["node", "node-addons"],
	},

	injectGlobals: true,
	moduleDirectories: ["node_modules"],
	moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx", "mjs"],

	moduleNameMapper: {
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

	testPathIgnorePatterns: ["/node_modules/"],
	testMatch: ["**/*.unit.{j,t}s?(x)"],
	preset: "ts-jest",
	setupFiles: ["./tests/setup.js"],

	transform: {
		"^.+\\.vue$": "@vue/vue3-jest",

		".+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$":
			"jest-transform-stub",

		"^.+\\.mjs$": "babel-jest",
		"^.+\\.jsx?$": "babel-jest",
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				babelConfig: true,
			},
		],
	},
	transformIgnorePatterns: ["/node_modules/(?!vuetify)/"],

	collectCoverageFrom: [
		// Include
		"<rootDir>/src/components/**/*.{js,ts,vue}",
		"<rootDir>/src/modules/**/*.{js,ts,vue}",
		"<rootDir>/src/pages/**/*.{js,ts,vue}",
		"<rootDir>/src/mixins/**/*.js",
		"<rootDir>/src/plugins/**/*.(js|ts)",
		"<rootDir>/src/store/**/*.(js|ts)",
		"<rootDir>/src/utils/**/*.(js|ts)",
		"<rootDir>/src/composables/**/*.(js|ts)",
		"<rootDir>/src/layouts/**/*.{js,ts,vue}",
		"<rootDir>/lib/eslint-plugin-schulcloud/**/*.{js,ts,vue}",
		// Exclude
		"!<rootDir>/src/components/base/**/*",
		"!<rootDir>/src/components/icons/**/*",
		"!<rootDir>/src/pages/ActivationCode.page.vue",
		"!<rootDir>/src/pages/Imprint.page.vue",
		"!<rootDir>/src/pages/LernStoreDetails.page.vue",
		"!<rootDir>/src/pages/LernStoreOverview.page.vue",
		"!<rootDir>/src/pages/NewsCreate.page.vue",
		"!<rootDir>/src/pages/NewsEdit.page.vue",
		"!<rootDir>/src/pages/ProxyError.page.vue",
		"!<rootDir>/src/components/organisms/administration/ImportUsers.vue",
		"!<rootDir>/src/pages/administration/Migration.page.vue",
	],

	globals: {
		"vue-jest": {
			compilerOptions: {
				isCustomElement: (tag) => tag.startsWith("h5p-"),
			},
		},
	},

	// maxWorkers: 2, // limited for not taking all workers within of a single github action
};

module.exports = config;
