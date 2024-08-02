module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"plugin:prettier/recommended",
		"plugin:@intlify/vue-i18n/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		"@typescript-eslint/no-explicit-any": "warn",
		"no-console": process.env.NODE_ENV === "production" ? "off" : "warn",
		"no-debugger": process.env.NODE_ENV === "production" ? "off" : "warn",
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
		// TODO - make a final decision about this rule
		"vue/multi-word-component-names": "off",
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
						group: ["@/modules/data/*", "*/../data/*", "../**/data/*"],
						message:
							"Data-Modules have to be imported using the pattern '@data-<name>'",
					},
					{
						group: ["@/modules/feature/*", "*/../feature/*", "../**/feature/*"],
						message:
							"Feature-Modules have to be imported using the pattern '@feature-<name>'",
					},
					{
						group: ["@/modules/page/*", "*/../page/*", "../**/page/*/*"],
						message:
							"Page-Modules have to be imported using the pattern '@page-<name>'",
					},
					{
						group: ["@/modules/ui/*", "*/../ui/*", "../**/ui/*/*"],
						message:
							"Ui-Modules have to be imported using the pattern '@ui-<name>'",
					},
					{
						group: ["@/modules/util/*", "*/../util/*", "../**/util/*/*"],
						message:
							"Util-Modules have to be imported using the pattern '@util-<name>'",
					},
				],
			},
		],
	},
	overrides: [
		{
			files: ["**/*.unit.{j,t}s?(x)"],
			env: {
				jest: true,
			},
			globals: {
				mount: false,
				shallowMount: false,
			},
		},
	],
	settings: {
		"vue-i18n": {
			localeDir: "./src/locales/*.{json,json5,yaml,yml,ts}", // extension is glob formatting!
			messageSyntaxVersion: "^9.0.0",
		},
	},
};
