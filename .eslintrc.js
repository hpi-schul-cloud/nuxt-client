module.exports = {
	root: true,
	extends: ["@schul-cloud/eslint-config/javascriptVue"],
	overrides: [
		{
			files: ["**/*.vue"],
			rules: {
				"max-lines": [
					"warn",
					{ max: 500, skipBlankLines: true, skipComments: true },
				],
			},
		},
		{
			files: ["**/*.stories.js"],
			rules: {
				"max-lines": [
					"warn",
					{ max: 500, skipBlankLines: true, skipComments: true },
				],
			},
		},
		{
			files: ["**/*.unit.js"],
			extends: ["@schul-cloud/eslint-config/javascriptJest"],
			globals: {
				mount: false,
				shallowMount: false,
				createComponentMocks: false,
			},
			rules: {
				// you should be allowed to write as much tests as needed
				"max-lines": 0,
				// the following rules do not understand spreading - https://github.com/jest-community/eslint-plugin-jest/issues/518
				"jest/expect-expect": "off",
				"jest/no-disabled-tests": "off",
				"jest/valid-title": "off",
			},
		},
	],
};
