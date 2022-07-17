import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	moduleFileExtensions: ["js", "ts", "json", "vue"],
	transform: {
		"^.+\\.ts$": "ts-jest",
		"^.+\\.vue$": "vue-jest",
	},
	testPathIgnorePatterns: ["/node_modules/"],
};

export default config;
