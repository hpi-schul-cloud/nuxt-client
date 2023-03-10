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
		"@typescript-eslint/no-empty-function": NUXT_REMOVAL ? "warn" : "error",
		"vue/multi-word-component-names": NUXT_REMOVAL ? "warn" : "error",
		"@typescript-eslint/ban-ts-comment": NUXT_REMOVAL ? "warn" : "error",
		"vue/no-mutating-props": NUXT_REMOVAL ? "warn" : "error",
		"no-undef": NUXT_REMOVAL ? "warn" : "error",
		"prefer-const": "error",
		"@typescript-eslint/no-inferrable-types": NUXT_REMOVAL ? "warn" : "error",
		"@typescript-eslint/ban-types": "warn",
		"prettier/prettier": "error",
		"no-var": "error",
		"vue/no-v-text-v-html-on-component": "warn",
		"vue/no-v-html": "warn",
		"no-prototype-builtins": NUXT_REMOVAL ? "warn" : "error",
		"no-empty": NUXT_REMOVAL ? "warn" : "error",
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
