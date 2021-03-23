import { storiesOf } from "@storybook/vue";
import { text, boolean, number, array, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import BackendDataTable from "./BackendDataTable";

import { printDate } from "@plugins/datetime";
import faker from "faker/locale/en";
// set a seed to have consistent data
faker.seed(512); // any static number will do the job

const tableData = (n, overwrite = () => ({})) =>
	new Array(n).fill(0).map((item, index) => ({
		_id: faker.random.uuid(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		address: {
			city: faker.address.city(),
		},
		age: faker.random.number(),
		birthday: printDate(faker.date.past()),
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

const total = 100;
const randomData = tableData(total);

storiesOf("6 Organisms/DataTable", module).add("BackendDataTable", () => {
	const sortableRows = tableColumns
		.filter((c) => c.sortable)
		.reduce((obj, c) => {
			obj[c.field] = c.field;
			return obj;
		}, {});
	return {
		data: () => ({
			columns: tableColumns,
			randomData,
			trackBy: text("trackBy", "id"),

			total: total,
			currentPage: number("currentPage", 1),
			paginated: boolean("paginated", true),
			rowsPerPage: number("rowsPerPage", 5),

			rowsSelectable: boolean("rowsSelectable", true),
			selectionType: select(
				"selectionType",
				{ inclusive: "inclusive", exclusive: "exclusive" },
				"inclusive"
			),
			selectedRowIds: array("selectedRowIds", [
				randomData[0].id,
				randomData[1].id,
			]),

			actions: tableActions(randomData),

			sortBy: select("sortBy", sortableRows, Object.keys(sortableRows)[0]),
			sortOrder: select("sortOrder", { asc: "asc", desc: "desc" }, "asc"),
		}),
		components: { BackendDataTable },
		methods: {
			onUpdateCurrentPage: action("@update:current-page"),
			onUpdateRowsPerPage: action("@update:rows-per-page"),
			onUpdateSelection: action("@update:selection"),
			onUpdateSelectionType: action("@update:selectionType"),
			onUpdateSelectedRowIds: action("@update:selectedRowIds"),
			onSort: action("@sort"),
			onSortBy: action("@update:sort-by"),
			onSortOrder: action("@update:sort-order"),
		},
		template: `
			<BackendDataTable
				:columns="columns"
				:data="randomData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)"

				:trackBy="trackBy"

				:total="total"
				:current-page.sync="currentPage"
				@update:current-page="onUpdateCurrentPage"
				:paginated="paginated"
				:rows-per-page.sync="rowsPerPage"
				@update:rows-per-page="onUpdateRowsPerPage"

				:rowsSelectable="rowsSelectable"
				:selectionType.sync="selectionType"
				:selectedRowIds.sync="selectedRowIds"
				@update:selection="onUpdateSelection"
				@update:selectionType="onUpdateSelectionType"
				@update:selectedRowIds="onUpdateSelectedRowIds"

				:actions="actions"

				:sortBy.sync="sortBy"
				:sortOrder.sync="sortOrder"
				@update:sort-by="onSortBy"
				@update:sort-order="onSortOrder"
			>
				<template v-slot:datacolumn-age="slotProps">
					<span style="text-decoration: underline">
					{{ slotProps.data }}
					</span>
				</template>
			</BackendDataTable>
		`,
	};
});
