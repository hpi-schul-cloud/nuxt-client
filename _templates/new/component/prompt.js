const pascalCase = require("pascal-case");

module.exports = [
	{
		type: "input",
		name: "name",
		message: "Name (PascalCase):",
		validate(value) {
			if (!value.length) {
				return "Components must have a name.";
			}
			const fileName = pascalCase(value);
			if (fileName !== value) {
				return "Component names must be PascalCase for consistency.";
			}
			if (value.toLowerCase().match(/\.vue$/)) {
				return "Please enter the name without .vue extension";
			}
			if (fileName.split(/(?=[A-Z])/).length < 2) {
				return "Component names should contain at least two words to avoid conflicts with existing and future HTML elements.";
			}
			return true;
		},
	},
	{
		type: "multiselect",
		name: "blocks",
		message: "Blocks:",
		initial: ["template", "script", "style"],
		choices: [
			{
				name: "template",
				message: "<template>",
			},
			{
				name: "script",
				message: "<script>",
			},
			{
				name: "style",
				message: "<style>",
			},
		],
		validate(value) {
			if (value.indexOf("script") === -1 && value.indexOf("template") === -1) {
				return "Components require at least a <script> or <template> tag.";
			}
			return true;
		},
	},
];
