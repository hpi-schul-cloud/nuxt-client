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
		"no-useless-escape": NUXT_REMOVAL ? "warn" : "error",
		"no-irregular-whitespace": NUXT_REMOVAL ? "warn" : "error",
		"vue/no-useless-template-attributes": NUXT_REMOVAL ? "warn" : "error",
		"@typescript-eslint/no-empty-function": NUXT_REMOVAL ? "warn" : "error",
		"vue/multi-word-component-names": NUXT_REMOVAL ? "warn" : "error",
		"@typescript-eslint/ban-ts-comment": NUXT_REMOVAL ? "warn" : "error",
		"vue/no-mutating-props": NUXT_REMOVAL ? "warn" : "error",
		"no-undef": NUXT_REMOVAL ? "warn" : "error",
		"prefer-const": NUXT_REMOVAL ? "warn" : "error",
		"@typescript-eslint/no-inferrable-types": NUXT_REMOVAL ? "warn" : "error",
		"@typescript-eslint/ban-types": NUXT_REMOVAL ? "warn" : "error",
		"prettier/prettier": NUXT_REMOVAL ? "warn" : "error",
		"no-var": NUXT_REMOVAL ? "warn" : "error",
	},
	overrides: [
		{
			files: [
				"src/**/*.unit.{j,t}s?(x)",
				"**/__tests__/*.{j,t}s?(x)",
				"tests/unit/**/*.unit.{j,t}s?(x)",
			],
			env: {
				jest: true,
			},
		},
	],
};
