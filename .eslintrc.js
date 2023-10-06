module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		// ----
		"no-useless-escape": "error",
		"no-irregular-whitespace": "error",
		"no-undef": "warn",
		"no-prototype-builtins": "error",
		"no-empty": "error",
		"no-var": "error",
		"prefer-const": "error",
		"prettier/prettier": "error",
		"@typescript-eslint/no-empty-function": "error",
		"@typescript-eslint/ban-ts-comment": "error",
		"@typescript-eslint/no-inferrable-types": "error",
		"@typescript-eslint/ban-types": "error",
		"vue/no-v-text-v-html-on-component": "error",
		"vue/no-v-html": "error",
		"vue/html-self-closing": [
			"error",
			{
				html: {
					void: "always",
				},
			},
		],
		"vue/no-setup-props-reactivity-loss": "error",
		"vue/no-useless-template-attributes": "error",
		"vue/no-mutating-props": "error",
		"vue/multi-word-component-names": "warn",
		"@typescript-eslint/no-restricted-imports": [
			"warn",
			{
				patterns: [
					{
						group: [
							"@data-*/*",
							"@feature-*/*",
							"@page-*/*",
							"@ui-*/*",
							"@util-*/*",
						],
						message: "Do not deep import into a module",
					},
					{
						group: ["@/components/data-*", "*/../data-*", "../**/data-*"],
						message:
							"Data-Modules have to be imported using the pattern '@data-<name>'",
					},
					{
						group: [
							"@/components/feature-*",
							"*/../feature-*",
							"../**/feature-*",
						],
						message:
							"Feature-Modules have to be imported using the pattern '@feature-<name>'",
					},
					{
						group: ["@components/page-*", "*/../page-*", "../**/page-*/*"],
						message:
							"page-Modules have to be imported using the pattern '@page-<name>'",
					},
					{
						group: ["@components/ui-*", "*/../ui-*", "../**/ui-*/*"],
						message:
							"Ui-Modules have to be imported using the pattern '@ui-<name>'",
					},
					{
						group: ["@components/util-*", "*/../util-*", "../**/util-*/*"],
						message:
							"Util-Modules have to be imported using the pattern '@util-<name>'",
					},
				],
			},
		],
		// "import/no-restricted-paths": [
		// 	"warn",
		// 	{
		// 		zones: [
		// 			{
		// 				from: "@ui-*",
		// 				target: "@feature-*",
		// 			},
		// 			{
		// 				from: "@util-*",
		// 				target: "@feature-*",
		// 			},
		// 		],
		// 	},
		// ],
	},
	// settings: {
	// 	"import/parsers": {
	// 		"@typescript-eslint/parser": [".ts", ".tsx"],
	// 	},
	// },
	overrides: [
		{
			files: ["**/*.unit.{j,t}s?(x)"],
			env: {
				jest: true,
			},
			globals: {
				mount: false,
				shallowMount: false,
				createComponentMocks: false,
				rendersSlotContent: false,
				wait: false,
			},
		},
	],
};
