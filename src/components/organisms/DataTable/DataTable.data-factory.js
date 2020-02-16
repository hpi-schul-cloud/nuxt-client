import * as faker from "faker";
import dayjs from "dayjs";

const tableData = (n, overwrite = () => ({})) =>
	new Array(n).fill(0).map((item, index) => ({
		id: faker.random.uuid(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		address: {
			city: faker.address.city(),
		},
		age: Math.round(Math.random() * 65),
		birthday: dayjs(faker.date.past()).format("DD-MM-YYYY"),
		agreed: faker.random.boolean(),
		...overwrite(index),
	}));

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
		action: (rowIds, selectionType = "inclusive") => {
			let selections;
			if (selectionType === "inclusive") {
				selections = allRows
					.filter((row) => rowIds.includes(row.id))
					.map((selection) => selection.firstName);
			} else {
				selections = allRows
					.filter((row) => !rowIds.includes(row.id))
					.map((selection) => selection.firstName);
			}
			alert(
				`${selections.join(", ")} (${
					selections.length
				}) wurde(n) zum Löschen ausgewählt`
			);
		},
	},
];

const tableFilters = [
	{
		label: "Geburtstag",
		type: "date",
		attribute: "birthday",
		matchingType: {
			value: "after",
			label: "ist nach dem",
		},
		value: "1990-01-02",
	},
	{
		label: "Alter",
		type: "number",
		attribute: "age",
		matchingType: {
			value: "equal",
			label: "ist gleich",
		},
		value: "",
	},
	{
		label: "Zustimmung",
		type: "select",
		attribute: "agreed",
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
		attribute: "firstName",
		matchingType: {
			value: "contains",
			label: "enthält",
		},
		value: "",
	},
];

export { tableData, tableColumns, tableActions, tableFilters };
