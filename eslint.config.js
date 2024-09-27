const pluginVue = require("eslint-plugin-vue");
const js = require("@eslint/js");
const vueTsEslintConfig = require("@vue/eslint-config-typescript");
const tseslint = require("typescript-eslint");
const schulcloud = require("./lib/eslint-plugin-schulcloud");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const globals = require("globals");

module.exports = [
	...pluginVue.configs["flat/essential"],
	js.configs.recommended,
	...vueTsEslintConfig({
		// not supported as of version 13, version 14 will introduce support for the flat config
		extends: [
			// By default, only the recommended rules are enabled.
			"recommended",
		],
		// Optional: specify the script langs in `.vue` files
		// Defaults to `{ ts: true, js: false, tsx: false, jsx: false }`
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
	eslintPluginPrettierRecommended, // needs to be the last item

	{
		languageOptions: {
			// parser: tseslint.parser, // TODO: Do we need this?
			ecmaVersion: 2020,
			globals: {
				...globals.node,
			},
		},
		plugins: {
			schulcloud,
			"@typescript-eslint": tseslint.plugin,
		},
		rules: {
			"schulcloud/material-icon-imports": "error",
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

// eslint jest plugin ?
