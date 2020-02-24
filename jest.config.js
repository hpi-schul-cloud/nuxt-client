process.env.TZ = "Europe/Berlin";

module.exports = {
	setupFiles: ["<rootDir>/tests/unit/setup", "jest-canvas-mock"],
	setupFilesAfterEnv: [
		"<rootDir>/tests/unit/matchers",
		"<rootDir>/tests/unit/requireAssertions",
	],
	testMatch: ["**/(*.)unit.js"],
	moduleFileExtensions: ["js", "json", "vue"],
	transform: {
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
		// Nuxt extensions
		"<rootDir>/src/middleware/**/*.js",
		"<rootDir>/src/serverMiddleware/**/*.js",
		"!<rootDir>/src/serverMiddleware/routes.js",
		// Vue Component
		"<rootDir>/src/components/**/*.{js,vue}",
		"!<rootDir>/src/components/**/*.stories.js",
		"!<rootDir>/src/components/base/_globals.js",
	],
};
