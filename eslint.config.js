const js = require("@eslint/js");
const pluginVue = require("eslint-plugin-vue");
const {
	defineConfigWithVueTs,
	vueTsConfigs,
	configureVueProject,
} = require("@vue/eslint-config-typescript");
const schulcloud = require("./lib/eslint-plugin-schulcloud");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const globals = require("globals");

configureVueProject({
	scriptLangs: [
		"ts",

		// [!DISCOURAGED]
		// Include 'js' to allow plain `<script>` or `<script setup>` blocks.
		// This might result-in false positive or negatives in some rules for `.vue` files.
		// Note you also need to configure `allowJs: true` and `checkJs: true`
		// in corresponding `tsconfig.json` files.
		"js",
	],
});

module.exports = defineConfigWithVueTs([
	...pluginVue.configs["flat/recommended"],
	js.configs.recommended,
	vueTsConfigs.recommended,
	eslintPluginPrettierRecommended,

	{
		ignores: [
			".vscode/**",
			"node_modules/**",
			"**/dist/**",
			"src/serverApi/**",
			"src/fileStorageApi/**",
			"src/h5pEditorApi/**",
			"src/commonCartridgeApi/**",
		],
	},
	{
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				...globals.node,
				...globals.browser,
				NodeJS: true,
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
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-inferrable-types": "error",
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-restricted-imports": [
				"error",
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
			"@typescript-eslint/no-unused-vars": "warn",
			"no-console": process.env.NODE_ENV === "production" ? "off" : "error",
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
		files: [
			"**/*.unit.{j,t}s?(x)",
			"tests/**",
			"**/test-utils/**",
			"__mocks__/**",
		],
		languageOptions: {
			globals: {
				...globals.jest,
				mount: "readonly",
				shallowMount: "readonly",
				fail: "readonly",
			},
		},
	},
	{
		files: ["src/components/icons/material/index.ts"],
		rules: {
			"schulcloud/material-icon-imports": "off",
		},
	},
	{
		files: ["**/*.{ts,vue}"],
		rules: {
			"@typescript-eslint/no-require-imports": "error",
		},
	},
]);
