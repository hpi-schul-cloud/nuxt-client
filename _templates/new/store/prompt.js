module.exports = [
	{
		type: "input",
		name: "storeName",
		message: "Name of the store file",
	},
	{
		type: "input",
		name: "backendRoute",
		message: "path to the backend route. (without leading & trailing slashes)",
		validate(value) {
			if (value.startsWith("/")) {
				return "Path must not start with a /";
			}
			if (value.endsWith("/")) {
				return "Path must not end with a /";
			}
			return true;
		},
	},
];
