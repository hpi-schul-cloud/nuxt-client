const tableData = [
	{
		firstName: "Hulk",
		lastName: "Hogan",
		address: {
			city: "LA",
		},
		age: 54,
	},
	{
		firstName: "Mario",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		firstName: "Luigi",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		firstName: "Wario",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		firstName: "Honkey",
		lastName: "Kong",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		firstName: "LoLo",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		firstName: "LoLo",
		lastName: "Nee",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
];

const tableColumns = [
	{
		field: "firstName",
		label: "Vorname",
	},
	{
		field: "lastName",
		label: "Nachname",
	},
	{
		field: "address.city",
		label: "Stadt",
	},
	{
		field: "age",
		label: "Alter",
	},
];

export { tableData, tableColumns };
