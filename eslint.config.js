const pluginVue = require("eslint-plugin-vue");
const js = require("@eslint/js");
const schulcloud = require("./lib/eslint-plugin-schulcloud");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const globals = require("globals");

// needed for packages that are not yet compatible with the flat config
const { FlatCompat } = require("@eslint/eslintrc");
const compat = new FlatCompat();

module.exports = [
	...pluginVue.configs["flat/essential"],
	js.configs.recommended,
	// ...vueTsEslintConfig({
	// 	// not supported as of version 13, version 14 will introduce support for the flat config
	// 	// for version 14 of this, we need to upgrade to eslint 9 because of the peer dependency
	// 	extends: [
	// 		// By default, only the recommended rules are enabled.
	// 		"recommended",
	// 	],
	// 	supportedScriptLangs: {
	// 		ts: true,

	// 		// [!DISCOURAGED]
	// 		// Set to `true` to allow plain `<script>` or `<script setup>` blocks.
	// 		// This might result-in false positive or negatives in some rules for `.vue` files.
	// 		// Note you also need to configure `allowJs: true` and `checkJs: true`
	// 		// in corresponding `tsconfig.json` files.
	// 		js: true,
	// 	},
	// }),
	...compat.extends("@vue/eslint-config-typescript/recommended"),
	eslintPluginPrettierRecommended, // need to be the last item

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
		ignores: [
			".vscode/*",
			"node_modules/*",
			"**/dist/*",
			"src/serverApi/*",
			"src/fileStorageApi/*",
			"src/h5pEditorApi/*",
		],
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
