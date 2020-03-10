import * as faker from "faker";
import dayjs from "dayjs";
import { inputs, layouts } from "vue-filter-ui";

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
		title: "Items per page",
		chipTemplate: "Items per page: %1",
		required: true,
		layout: layouts.Default,
		filter: [
			{
				attribute: "$limit",
				operator: "<",
				input: inputs.Radio,
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
		layout: layouts.Default,
		filter: [
			{
				attribute: "age",
				applyNegated: true,
				operator: "<=",
				input: inputs.InputNumber,
			},
		],
	},
	{
		title: "Alter = ",
		chipTemplate: "Person ist %1 Jahre alt",
		layout: layouts.Default,
		filter: [
			{
				attribute: "age",
				operator: "=",
				input: inputs.InputNumber,
			},
		],
	},
	{
		title: "Geburtstag",
		chipTemplate: "Person hat am %1 Geburtstag",
		filter: [
			{
				attribute: "birthday",
				operator: "=",
				input: inputs.InputText,
			},
		],
	},
	{
		title: "Zustimmung",
		chipTemplate: "Zustimmung: %1",
		filter: [
			{
				attribute: "agreed",
				operator: "=",
				input: inputs.Radio,
				options: [
					{ value: true, label: "Zustimmung vorhanden" },
					{ value: false, label: "Keine Zustimmung" },
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
				operator: "íncludes",
				input: inputs.InputText,
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
