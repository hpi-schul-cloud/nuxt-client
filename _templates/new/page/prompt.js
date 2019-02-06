module.exports = [
	{
		type: "input",
		name: "route",
		message:
			"Route to page (e.g. '/news/_id', prefix variables with underscore):",
		validate(value) {
			if (!value.length) {
				return "Pages must have a route.";
			}
			if (value.toLowerCase() !== value) {
				return "Page routes must be lowercase.";
			}
			return true;
		},
	},
];
