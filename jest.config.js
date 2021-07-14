process.env.TZ = "Europe/Berlin";

module.exports = {
	setupFiles: ["<rootDir>/tests/unit/setup", "jest-canvas-mock"],
	setupFilesAfterEnv: [
		"jest-extended",
		"<rootDir>/tests/unit/matchers",
		"<rootDir>/tests/unit/jestMatchers",
		"<rootDir>/tests/unit/requireAssertions",
	],
	snapshotResolver: "<rootDir>/tests/unit/snapshotResolver",
	testMatch: ["**/(*.)unit.(js|ts)"],
	moduleFileExtensions: ["ts", "js", "json", "vue"],
	transform: {
		"^.+\\.ts$": "ts-jest",
		".*\\.(vue)$": "vue-jest",
		"^.+\\.js$": "babel-jest",
	},
	transformIgnorePatterns: ["<roodDir>/node_modules/(?!vue-ripple-directive)"],
	moduleNameMapper: {
		// Transform any static assets to empty strings
		"\\.(jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf|css)$":
			"<rootDir>/tests/unit/fixtures/empty-string.js",
		...require("./aliases.config").jest,
	},
	snapshotSerializers: ["jest-serializer-vue"],
	coverageDirectory: "<rootDir>/dist/coverage",
	collectCoverageFrom: [
		// Include
		"<rootDir>/src/components/**/*.{js,vue}",
		"<rootDir>/src/middleware/**/*.js",
		"<rootDir>/src/mixins/**/*.js",
		"<rootDir>/src/plugins/**/*.js",
		"<rootDir>/src/serverMiddleware/**/*.js",
		"<rootDir>/src/store/**/*.(js|ts)",
		"<rootDir>/src/utils/**/*.js",
		// Exclude
		"!<rootDir>/src/components/**/*.stories.js",
		"!<rootDir>/src/components/base/_globals.js",
		"!<rootDir>/src/serverMiddleware/routes.js",
	],
};
