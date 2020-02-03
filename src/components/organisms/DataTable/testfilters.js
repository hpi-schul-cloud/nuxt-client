module.exports = [
	{
		label: "Geburstag",
		type: "date",
		property: "birthday",
		value: "1990-01-02",
		matchingType: {
			value: "after",
			label: "nach dem",
		},
	},
	{
		label: "Volltextsuche",
		type: "fulltextSearch",
		value: "Ma",
	},
	{
		label: "Alter",
		type: "number",
		property: "age",
		matchingType: {
			value: "equal",
			label: "=",
		},
		value: "999",
	},
	{
		label: "Vorname",
		type: "select",
		property: "firstName",
		value: [
			{
				checked: true,
				value: "Mario",
				label: "Mario",
			},
		],
	},
	{
		label: "Vorname",
		type: "text",
		property: "firstName",
		value: "Mario",
		matchingType: {
			value: "contains",
			label: "enthält",
		},
	},
];
