module.exports = {
	root: true,
	extends: ["@schul-cloud/eslint-config/javascriptVue"],
	overrides: [
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
			parserOptions: {
				parser: "babel-eslint",
				sourceType: "module",
			},
			env: {
				jest: true,
			},
			globals: {
				mount: false,
				shallowMount: false,
				//shallowMountView: false,
				createComponentMocks: false,
				//createModuleStore: false,
			},
		},
	],
};
