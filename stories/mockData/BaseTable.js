const tableData = [
	{
		id: "1",
		firstName: "Hulk",
		lastName: "Hogan",
		address: {
			city: "LA",
		},
		age: 54,
	},
	{
		id: "2",
		firstName: "Mario",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		id: "3",
		firstName: "Luigi",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		id: "4",
		firstName: "Wario",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		id: "5",
		firstName: "Honkey",
		lastName: "Kong",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		id: "6",
		firstName: "LoLo",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		id: "7",
		firstName: "LoLo",
		lastName: "Nee",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		id: "8",
		firstName: "anna",
		lastName: "test",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
	{
		id: "9",
		firstName: "felix",
		lastName: "test",
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
		sortable: true,
	},
	{
		field: "lastName",
		label: "Nachname",
	},
	{
		field: "address.city",
		label: "Stadt",
		sortable: true,
	},
	{
		field: "age",
		label: "Alter",
	},
];

const tableFilters = [
	{
		label: "Vorname",
		type: "string",
		property: "firstName",
		matchingType: {
			value: "contains",
			label: "enthält",
		},
		value: "",
	},
	{
		label: "Alter",
		type: "string",
		property: "age",
		matchingType: {
			value: "equals",
			label: "ist gleich",
		},
		value: "",
	},
];

const tableActions = [
	{
		label: "Löschen",
		action: (rows) => {
			let names = "";
			rows.map((r) =>
				names === "" ? (names = r.firstName) : (names += `, ${r.firstName}`)
			);
			alert(names + " wurde(n) zum Löschen ausgewählt");
		},
	},
];

export { tableData, tableColumns, tableFilters, tableActions };
