import schulcloud from "./lib/eslint-plugin-schulcloud/index.js";
import js from "@eslint/js";
import { configureVueProject, defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

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

export default defineConfigWithVueTs([
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
			"simple-import-sort": simpleImportSort,
			"unused-imports": unusedImports,
		},
		rules: {
			// "require-await": "warn", // Turn it on demand
			"arrow-body-style": ["warn", "as-needed", { requireReturnForObjectLiteral: false }],
			"simple-import-sort/imports": [
				"warn",
				{
					groups: [[]],
				},
			],
			"simple-import-sort/exports": "warn",
			"@typescript-eslint/ban-ts-comment": "error",
			"@typescript-eslint/no-empty-function": "error",
			"@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-inferrable-types": "error",
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-restricted-imports": [
				"error",
				{
					patterns: [
						{
							group: ["@data-*/*", "@feature-*/*", "@page-*/*", "@ui-*/*", "@util-*/*"],
							message: "Do not deep import into a module",
						},
						{
							group: ["@/modules/data/*", "*/../data/*", "../**/data/*"],
							message: "Data-Modules have to be imported using the pattern '@data-<name>'",
						},
						{
							group: ["@/modules/feature/*", "*/../feature/*", "../**/feature/*"],
							message: "Feature-Modules have to be imported using the pattern '@feature-<name>'",
						},
						{
							group: ["@/modules/page/*", "*/../page/*", "../**/page/*/*"],
							message: "Page-Modules have to be imported using the pattern '@page-<name>'",
						},
						{
							group: ["@/modules/ui/*", "*/../ui/*", "../**/ui/*/*"],
							message: "Ui-Modules have to be imported using the pattern '@ui-<name>'",
						},
						{
							group: ["@/modules/util/*", "*/../util/*", "../**/util/*/*"],
							message: "Util-Modules have to be imported using the pattern '@util-<name>'",
						},
					],
				},
			],
			"no-console": "error",
			"no-debugger": "warn",
			"no-empty": "error",
			"no-irregular-whitespace": "error",
			"no-prototype-builtins": "error",
			"no-undef": "warn",
			"no-unused-vars": "off",
			"eqeqeq": ["error", "always"],
			"@typescript-eslint/no-unused-vars": "off",
			"unused-imports/no-unused-imports": "warn",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					args: "after-used",
				},
			],
			"no-useless-escape": "error",
			"no-var": "error",
			"prefer-const": "error",
			"prettier/prettier": [
				"error",
				{
					printWidth: 120,
					useTabs: true,
					trailingComma: "es5",
					bracketSpacing: true,
					jsxBracketSameLine: false,
					arrowParens: "always",
					proseWrap: "never",
					htmlWhitespaceSensitivity: "css",
					endOfLine: "lf",
					semi: true,
					singleQuote: false,
				},
			],
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
		files: ["**/*.unit.{j,t}s?(x)", "tests/**", "**/test-utils/**", "__mocks__/**"],
		languageOptions: {
			globals: {
				...globals.vitest,
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
