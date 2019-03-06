module.exports = {
	root: true,
	parserOptions: {
		sourceType: "module",
	},
	extends: [
		// https://github.com/vuejs/eslint-plugin-vue#bulb-rules
		"plugin:vue/recommended",
		// https://github.com/prettier/eslint-config-prettier
		"prettier",
		"prettier/standard",
		"prettier/vue",
	],
	rules: {
		// Only allow debugger in development
		"no-debugger":
			process.env.NODE_ENV === "production" || process.env.PRE_COMMIT
				? "error"
				: "off",
		// Only allow `console.log` in development
		"no-console":
			process.env.NODE_ENV === "production" || process.env.PRE_COMMIT
				? [
						"error",
						{
							allow: ["warn", "error"],
						},
				  ]
				: "off",

		"max-lines": [
			"warn",
			{ max: 250, skipBlankLines: true, skipComments: true },
		],
		// vue specific stuff
		"vue/component-name-in-template-casing": [
			"error",
			"PascalCase",
			{
				ignores: [
					"component",
					"template",
					"transition",
					"transition-group",
					"keep-alive",
					"slot",
				],
			},
		],
		/*
		"vue/eqeqeq": ["error", "always"],
		"vue/key-spacing": ["error", { beforeColon: false, afterColon: false }],
		"vue/match-component-file-name": [
			"error",
			{
				shouldMatchCase: true,
			},
		],
		"vue/object-curly-spacing": ["error", "always"],
		"vue/require-direct-export": "error",
		*/
		//"vue/space-infix-ops": ["error", { int32Hint: true }],
	},
	overrides: [
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
