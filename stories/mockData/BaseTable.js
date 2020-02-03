const tableData = [
	{
		id: "1",
		firstName: "Hulk",
		lastName: "Hogan",
		address: {
			city: "LA",
		},
		age: 54,
		birthday: "1990-01-02",
		agreed: true,
	},
	{
		id: "2",
		firstName: "Mario",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
		birthday: "1990-01-03",
		agreed: true,
	},
	{
		id: "3",
		firstName: "Luigi",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
		birthday: "2000-01-02",
		agreed: false,
	},
	{
		id: "4",
		firstName: "Wario",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
		birthday: "1990-01-02",
		agreed: true,
	},
	{
		id: "5",
		firstName: "Honkey",
		lastName: "Kong",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
		birthday: "1996-10-02",
		agreed: false,
	},
	{
		id: "6",
		firstName: "LoLo",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
		birthday: "1990-01-02",
		agreed: false,
	},
	{
		id: "7",
		firstName: "LoLo",
		lastName: "Nee",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
		birthday: "1999-05-03",
		agreed: true,
	},
	{
		id: "8",
		firstName: "anna",
		lastName: "test",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
		birthday: "1990-01-02",
		agreed: false,
	},
	{
		id: "9",
		firstName: "felix",
		lastName: "test",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
		birthday: "1990-01-02",
		agreed: false,
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
	{
		field: "birthday",
		label: "Geburtstag",
	},
	{
		field: "agreed",
		label: "Zustimmung",
	},
];

const tableFilters = [
	{
		label: "Geburtstag",
		type: "date",
		property: "birthday",
		matchingType: {
			value: "after",
			label: "ist nach dem",
		},
		value: "1990-01-02",
	},
	{
		label: "Alter",
		type: "number",
		property: "age",
		matchingType: {
			value: "equal",
			label: "ist gleich",
		},
		value: "",
	},
	{
		label: "Zustimmung",
		type: "select",
		property: "agreed",
		value: [
			{
				checked: false,
				value: true,
				label: "Zustimmung vorhanden",
			},
		],
	},
	{
		label: "Vorname",
		type: "text",
		property: "firstName",
		matchingType: {
			value: "contains",
			label: "enthält",
		},
		value: "",
	},
];

const tableActions = [
	{
		label: "Löschen",
		action: (rowIds, selectionType) => {
			let selections;
			if (selectionType === "inclusive") {
				selections = tableData
					.filter((row) => rowIds.includes(row.id))
					.map((selection) => selection.firstName);
			} else {
				selections = tableData
					.filter((row) => !rowIds.includes(row.id))
					.map((selection) => selection.firstName);
			}
			alert(selections.join(", ") + " wurde(n) zum Löschen ausgewählt");
		},
	},
];

export { tableData, tableColumns, tableFilters, tableActions };
