import users from "./testUserData";

const tableData = (n) => users.slice(0, n);

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

const tableActions = (allRows) => [
	{
		label: "Löschen",
		icon: "delete",
		"icon-source": "material",
		action: (rowIds, selectionType = "inclusive") => {
			let selections;
			if (selectionType === "inclusive") {
				selections = allRows.filter((row) => rowIds.includes(row.id)).map((selection) => selection.firstName);
			} else {
				selections = allRows.filter((row) => !rowIds.includes(row.id)).map((selection) => selection.firstName);
			}
			alert(`${selections.join(", ")} (${selections.length}) wurde(n) zum Löschen ausgewählt`);
		},
	},
];

const tableFilters = [
	{
		title: "Einträge pro Seite",
		chipTemplate: "Items per page: %1",
		required: true,
		filter: [
			{
				attribute: "$limit",
				operator: "<",
				options: [
					{ value: 25, label: "25" },
					{ value: 50, label: "50" },
					{ value: 100, label: "100" },
				],
			},
		],
	},
	{
		title: "Alter <=",
		chipTemplate: "Person ist älter als %1 Jahre",
		filter: [
			{
				attribute: "age",
				applyNegated: true,
				operator: "<=",
				label: "Alter",
				attributes: {
					type: "number",
					placeholder: "Nach Alter filtern...",
				},
			},
		],
	},
	{
		title: "Geburtstag",
		chipTemplate: "Geburtstag am %1",
		filter: [
			{
				attribute: "birthday",
				operator: "=",
				label: "Geburtstag",
				attributes: {
					type: "date",
					placeholder: "29.3.2004",
				},
			},
		],
	},
	{
		title: "Einverständniserklärung",
		chipTemplate: "Zustimmung: %1",
		filter: [
			{
				attribute: "agreed",
				operator: "=",
				options: [
					{ value: "true", label: "Einverständniserklärung vorhanden" },
					{ value: "false", label: "Keine Einverständniserklärung" },
				],
			},
		],
	},
	{
		title: "Vorname",
		chipTemplate: "Vorname enthält %1",
		filter: [
			{
				attribute: "firstName",
				operator: "includes",
				label: "Vorname",
				attributes: {
					type: "text",
					placeholder: "Nach Name filtern...",
				},
			},
		],
	},
];

const tableQuery = {
	age: {
		$gt: 10,
	},
};

const tableActiveFilters = [
	{
		attribute: "age",
		operator: "<=",
		applyNegated: true,
		value: 10,
	},
];

export { tableActions, tableActiveFilters, tableColumns, tableData, tableFilters, tableQuery };
