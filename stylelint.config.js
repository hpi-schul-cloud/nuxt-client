module.exports = {
	extends: [
		// Use standard scss config as the base, includes stylelint-scss plugin
		// https://github.com/stylelint/stylelint-config-standard
		"stylelint-config-standard-scss",
		// Enforce a standard order for CSS properties
		// https://github.com/stormwarning/stylelint-config-recess-order
		"stylelint-config-recess-order",
		// Override rules that would interfere with Prettier
		// https://github.com/shannonmoeller/stylelint-config-prettier
		"stylelint-config-prettier",
		"stylelint-config-standard-vue/scss",
	],
	plugins: [
		// enforce variable usage
		"stylelint-declaration-strict-value",
	],
	// Rule lists:
	// - https://stylelint.io/user-guide/rules/
	// - https://github.com/kristerkari/stylelint-scss#list-of-rules
	rules: {
		"unicode-bom": "never",
		// Allow newlines inside class attribute values
		"string-no-newline": null,
		"selector-pseudo-element-no-unknown": [
			true,
			{ ignorePseudoElements: ["/^v-/", "pseudo-element"] },
		],
		"selector-class-pattern": /^[a-z][a-z0-9-_]+$/,
		"selector-id-pattern": /^[a-z][a-z0-9-_]+$/,
		// Limit the number of universal selectors in a selector,
		// to avoid very slow selectors
		"selector-max-universal": 1,
		"scale-unlimited/declaration-strict-value": [
			[
				"/color$/",
				"font-family",
				"font-size",
				"font-weight",
				"line-height",
				"/padding/",
				"/margin/",
				"z-index",
				"border-radius",
			],
			{
				ignoreValues: [
					"transparent",
					"inherit",
					"initial",
					"0",
					"100%",
					"/100v/",
					"auto",
					"0 auto",
					"none",
				],
			},
		],
		// PRETTIER
		// HACK: to compensate for https://github.com/shannonmoeller/stylelint-config-prettier/issues/4
		// Modifying setting from Standard: https://github.com/stylelint/stylelint-config-standard/blob/7b76d7d0060f2e13a331806a09c2096c7536b0a6/index.js#L6
		"at-rule-empty-line-before": [
			"always",
			{
				except: ["blockless-after-same-name-blockless", "first-nested"],
				ignore: ["after-comment"],
				ignoreAtRules: ["else"],
			},
		],
		// SCSS
		"scss/dollar-variable-colon-space-after": "always",
		"scss/dollar-variable-colon-space-before": "never",
		"scss/dollar-variable-no-missing-interpolation": true,
		"scss/dollar-variable-pattern": /^[a-z][a-z0-9-_]+$/,
		"scss/double-slash-comment-whitespace-inside": "always",
		"scss/operator-no-newline-before": true,
		"scss/operator-no-unspaced": true,
		"scss/selector-no-redundant-nesting-selector": true,
		// Allow SCSS and CSS module keywords beginning with `@`
		"at-rule-no-unknown": null,
		"scss/at-rule-no-unknown": true,
	},
};
