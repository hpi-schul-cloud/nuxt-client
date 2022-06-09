module.exports = {
	root: true,
	extends: ["@hpi-schul-cloud/eslint-config/javascriptVue"],
	rules: {
		"vue/require-direct-export": "off",
	},
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
			files: ["**/*.unit.js"],
			extends: ["@hpi-schul-cloud/eslint-config/javascriptJest"],
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
				"jest/no-focused-tests": 2,
			},
		},
	],
};
