module.exports = {
	root: true,
	parserOptions: {
		parser: "babel-eslint",
		sourceType: "module",
		allowImportExportEverywhere: true,
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
			"error",
			{ max: 250, skipBlankLines: true, skipComments: true },
		],
		// vue specific stuff
		"vue/component-name-in-template-casing": ["error", "kebab-case"],
		"vue/eqeqeq": ["error", "always"],
		"vue/key-spacing": ["error", { beforeColon: false, afterColon: true }],
		"keyword-spacing": ["error", { before: true, after: true }],
		"vue/match-component-file-name": [
			"error",
			{
				shouldMatchCase: true,
			},
		],
		"vue/no-boolean-default": ["error", "no-default"],
		//"vue/no-deprecated-scope-attribute": ["error"],
		"no-empty-pattern": ["error"],
		"vue/no-restricted-syntax": ["error"],
		"object-curly-spacing": [
			"error",
			"always",
			{
				arraysInObjects: true,
				objectsInObjects: true, //false, // FIX: we wan't to use false but: conflict with prettier
			},
		],
		"vue/require-direct-export": ["error"],
		// TODO "vue/script-indent" script & css ist bisher base:0, template aber 1
		"vue/space-infix-ops": ["error"],
		"vue/space-unary-ops": ["error"],
		"vue/v-on-function-call": ["error", "never"],
		/*
		"vue/v-slot-style": [
			"error",
			{
				atComponent: "v-slot",
				default: "v-slot",
				named: "longform",
			},
		],
		*/
		//"vue/valid-v-slot": ["error"],
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
