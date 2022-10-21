// process.env.TZ = "Europe/Berlin";

module.exports = {
	// testEnvironment: "jsdom",
	// moduleFileExtensions: [
	// 	"js",
	// 	"jsx",
	// 	"json",
	// 	"ts",
	// 	"tsx",
	// 	// tell Jest to handle *.vue files
	// 	"vue",
	// ],
	// transform: {
	// 	// process *.vue files with vue-jest
	// 	"^.+\\.vue$": "@vue/vue2-jest",
	// 	".+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$":
	// 		"jest-transform-stub",
	// 	"^.+\\.jsx?$": "babel-jest",
	// 	"^.+\\.tsx?$": "ts-jest",
	// },
	// transformIgnorePatterns: ["/node_modules/"],
	// // support the same @ -> src alias mapping in source code
	// moduleNameMapper: {
	// 	"^@/(.*)$": "<rootDir>/src/$1",
	// },
	// snapshotSerializers: ["jest-serializer-vue"],
	preset: "@vue/cli-plugin-unit-jest/presets/typescript",
	testMatch: ["**/*.unit.{j,t}s?(x)"],
};
