import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	moduleFileExtensions: ["js", "ts", "json", "vue"],
	transform: {
		"^.+\\.ts$": "ts-jest",
		"^.+\\.vue$": "vue-jest",
	},
	moduleNameMapper: {
		"\\.(svg)$": "<rootDir>/src/mocks/file-mock.ts",
	},
	testPathIgnorePatterns: ["/node_modules/"],
};

export default config;
