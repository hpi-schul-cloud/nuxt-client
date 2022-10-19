import { printDate } from "@/plugins/datetime";
import faker from "faker/locale/en";
faker.seed(512); // any static number will do the job

import InputCheckbox from "@/components/organisms/DataFilter/inputs/Checkbox";
import InputRadio from "@/components/organisms/DataFilter/inputs/Radio";
import InputDefault from "@/components/organisms/DataFilter/inputs/Default";

const tableData = (n, overwrite = () => ({})) =>
	new Array(n).fill(0).map((item, index) => ({
		_id: faker.datatype.uuid(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		address: {
			city: faker.address.city(),
		},
		age: faker.datatype.number(),
		birthday: printDate(faker.date.past()),
		agreed: faker.datatype.boolean(),
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
		icon: "delete",
		"icon-source": "material",
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
		title: "Einträge pro Seite",
		chipTemplate: "Items per page: %1",
		required: true,
		filter: [
			{
				attribute: "$limit",
				operator: "<",
				input: InputRadio,
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
				input: InputDefault,
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
				input: InputDefault,
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
				input: InputCheckbox,
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
				input: InputDefault,
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

export {
	tableData,
	tableColumns,
	tableActions,
	tableFilters,
	tableQuery,
	tableActiveFilters,
};
