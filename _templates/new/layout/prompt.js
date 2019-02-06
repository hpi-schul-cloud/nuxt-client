const _ = require("lodash");

module.exports = [
	{
		type: "input",
		name: "name",
		message: "Name (camelCase):",
		validate(value) {
			if (!value.length) {
				return "Layout components must have a name.";
			}
			if (value.toLowerCase().match(/\.vue$/)) {
				return "Please enter the name without .vue extension";
			}
			const fileName = _.camelCase(value);
			if (fileName !== value) {
				return "Layout names must be camelCase to distinguish them from Components.";
			}
			return true;
		},
	},
];
