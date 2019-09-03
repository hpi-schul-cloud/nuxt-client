module.exports = {
	setupFiles: ["<rootDir>/tests/unit/setup", "jest-canvas-mock"],
	setupFilesAfterEnv: ["<rootDir>/tests/unit/matchers"],
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
		"<rootDir>/src/serverMiddleware/**/*.{js}",
		"<rootDir>/src/components/**/*.{js,vue}",
		"!<rootDir>/src/components/ui/_globals.js",
	],
};
