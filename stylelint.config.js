module.exports = {
	extends: [
		// Use the Schol-Cloud config as the base
		// https://github.com/schul-cloud/lint-configs/tree/master/packages/stylelint-config
		"@schul-cloud/stylelint-config",
	],
	plugins: ["stylelint-declaration-use-variable"],
	// Rule lists:
	// - https://stylelint.io/user-guide/rules/
	// - https://github.com/kristerkari/stylelint-scss#list-of-rules
	rules: {
		// enforce variable usage
		"sh-waqar/declaration-use-variable": [
			[
				"/color/",
				"font-family",
				"font-size",
				"font-weight",
				"line-height",
				"/padding/",
				"/margin/",
				"z-index",
				"border-radius",
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
		],
	},
};
