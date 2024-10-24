const js = require("@eslint/js");
const pluginVue = require("eslint-plugin-vue");
const vueTsEslintConfig = require("@vue/eslint-config-typescript");
const schulcloud = require("./lib/eslint-plugin-schulcloud");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const globals = require("globals");

module.exports = [
	...pluginVue.configs["flat/essential"],
	js.configs.recommended,
	...vueTsEslintConfig({
		extends: ["recommended"],
		supportedScriptLangs: {
			ts: true,

			// [!DISCOURAGED]
			// Set to `true` to allow plain `<script>` or `<script setup>` blocks.
			// This might result-in false positive or negatives in some rules for `.vue` files.
			// Note you also need to configure `allowJs: true` and `checkJs: true`
			// in corresponding `tsconfig.json` files.
			js: true,
		},
	}),
	eslintPluginPrettierRecommended,

	{
		ignores: [
			".vscode/**",
			"node_modules/**",
			"**/dist/**",
			"src/serverApi/**",
			"src/fileStorageApi/**",
			"src/h5pEditorApi/**",
		],
	},
	{
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.node,
			},
		},
		plugins: {
			schulcloud,
		},
		rules: {
			"@typescript-eslint/ban-ts-comment": "error",
			"@typescript-eslint/no-empty-function": "error",
			"@typescript-eslint/no-empty-object-type": [
				"error",
				{ allowInterfaces: "with-single-extends" },
			],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-inferrable-types": "error",
			"@typescript-eslint/no-require-imports": "off", // decide which option we want to use for this rule
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
							group: [
								"@/modules/feature/*",
								"*/../feature/*",
								"../**/feature/*",
							],
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
			// for now set this to warn because to much errors in catch blocks, need to decide if we want to us default option 'caughtErrors: all' for 'catch' blocks
			"@typescript-eslint/no-unused-vars": "warn",
			"no-console": process.env.NODE_ENV === "production" ? "off" : "warn",
			"no-debugger": process.env.NODE_ENV === "production" ? "off" : "warn",
			"no-empty": "error",
			"no-irregular-whitespace": "error",
			"no-prototype-builtins": "error",
			"no-undef": "warn",
			"no-unused-vars": "off", // disable the base rule for @typescript-eslint/no-unused-vars
			"no-useless-escape": "error",
			"no-var": "error",
			"prefer-const": "error",
			"prettier/prettier": "error",
			"schulcloud/material-icon-imports": "error",
			"vue/html-self-closing": [
				"error",
				{
					html: {
						void: "always",
					},
				},
			],
			"vue/multi-word-component-names": "off", // TODO - make a final decision about this rule
			"vue/no-mutating-props": "error",
			"vue/no-setup-props-reactivity-loss": "error",
			"vue/no-useless-template-attributes": "error",
			"vue/no-v-html": "error",
			"vue/no-v-text-v-html-on-component": "error",
		},
	},
	{
		files: ["**/*.unit.{j,t}s?(x)"],
		languageOptions: {
			globals: {
				...globals.jest,
				mount: false,
				shallowMount: false,
				fail: false,
			},
		},
	},
];