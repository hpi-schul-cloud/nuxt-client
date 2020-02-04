import { storiesOf } from "@storybook/vue";
import { select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import TableHeadRow from "./TableHeadRow";

import { tableColumns } from "@@/stories/mockData/DataTable";

storiesOf("Organisms/DataTable/SubComponents", module).add(
	"TableHeadRow",
	() => {
		const sortableColoumns = tableColumns
			.filter((e) => e.sortable)
			.reduce((obj, e) => {
				obj[e.field] = e.field;
				return obj;
			}, {});
		return {
			components: { TableHeadRow },
			template: `<table width="100%">
				<TableHeadRow
					:allRowsSelectable="allRowsSelectable"
					@update:allRowsSelected="onUpdateAllRowsSelected"
					:allRowsSelected.sync="allRowsSelected"
					:columns="columns"
					:sortBy.sync="sortBy"
					:sortOrder.sync="sortOrder"
					@update:sort="onUpdateSort"
					@update:sortBy="onUpdateSortBy"
					@update:sortOrder="onUpdateSortOrder"
				/>
			</table>`,
			data: () => ({
				allRowsSelectable: boolean("allRowsSelectable", true),
				allRowsSelected: boolean("allRowsSelected", false),
				columns: tableColumns,
				sortBy: select(
					"sortBy",
					sortableColoumns,
					Object.keys(sortableColoumns)[0]
				),
				sortOrder: select("sortOrder", { asc: "asc", desc: "desc" }, "asc"),
			}),
			methods: {
				onUpdateAllRowsSelected: action("@update:allRowsSelected"),
				onUpdateSort: action("@update:sort"),
				onUpdateSortBy: action("@update:sortBy"),
				onUpdateSortOrder: action("@update:sortOrder"),
			},
		};
	}
);
