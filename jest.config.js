module.exports = {
	setupFiles: ["<rootDir>/tests/unit/setup"],
	setupFilesAfterEnv: ["<rootDir>/tests/unit/matchers"],
	testMatch: ["**/(*.)unit.js"],
	moduleFileExtensions: ["js", "json", "vue"],
	transform: {
		".*\\.(vue)$": "vue-jest",
		"^.+\\.js$": "babel-jest",
	},
	moduleNameMapper: {
		// Transform any static assets to empty strings
		"\\.(jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$":
			"<rootDir>/tests/unit/fixtures/empty-string.js",
		...require("./aliases.config").jest,
	},
	snapshotSerializers: ["jest-serializer-vue"],
	coverageDirectory: "<rootDir>/tests/unit/coverage",
	collectCoverageFrom: [
		"src/components/**/*.{js,vue}",
		"!src/components/ui/_globals.js",
	],
};
