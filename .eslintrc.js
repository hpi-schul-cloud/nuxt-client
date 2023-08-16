const NUXT_REMOVAL = true;

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
		"vue/no-useless-template-attributes": "error",
		"@typescript-eslint/no-empty-function": "error",
		"vue/multi-word-component-names": NUXT_REMOVAL ? "warn" : "error",
		"@typescript-eslint/ban-ts-comment": "error",
		"vue/no-mutating-props": "error",
		"no-undef": NUXT_REMOVAL ? "warn" : "error",
		"prefer-const": "error",
		"@typescript-eslint/no-inferrable-types": "error",
		"@typescript-eslint/ban-types": "error",
		"prettier/prettier": "error",
		"no-var": "error",
		"vue/no-v-text-v-html-on-component": "error",
		"vue/no-v-html": "error",
		"no-prototype-builtins": "error",
		"no-empty": "error",
		"vue/no-setup-props-destructure": "warn",
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
				createComponentMocks: false,
				rendersSlotContent: false,
				wait: false,
			},
		},
	],
};
