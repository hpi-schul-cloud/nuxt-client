import dayjs from "dayjs";
import faker from "faker/locale/en";
// set a seed to have a consistent fake for the screenshot tests
faker.seed(512); // any static number will do the job
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
		title: "Geburtstag",
		chipTemplate: "Geburtstag am %1",
		layout: layouts.Default,
		filter: [
			{
				attribute: "birthday",
				operator: "=",
				input: inputs.InputNumber,
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
				input: inputs.Radio,
				options: [
					{ value: true, label: "Einverständniserklärung vorhanden" },
					{ value: false, label: "Keine Einverständniserklärung" },
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
