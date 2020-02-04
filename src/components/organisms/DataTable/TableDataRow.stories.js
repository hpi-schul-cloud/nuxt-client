import { storiesOf } from "@storybook/vue";
import { boolean, number, array, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import TableDataRow from "./TableDataRow";

import { tableData, tableColumns } from "./DataTable.data-factory.js";

storiesOf("Organisms/DataTable/SubComponents", module).add(
	"TableDataRow",
	() => ({
		components: { TableDataRow },
		template: `<table width="100%">
		<TableDataRow
			:selectable="selectable"
			:rowindex="rowindex"
			:selected.sync="selected"
			@update:selected="onUpdateSelected"
			:columnKeys="columnKeys"
			:data="data"
		/>
	</table>`,
		data: () => ({
			rowindex: number("rowindex", 0),
			selectable: boolean("selectable", true),
			selected: boolean("selected", false),
			columnKeys: array(
				"columnKeys",
				tableColumns.map((e) => e.field)
			),
			data: object("data", tableData(1)[0]),
		}),
		methods: {
			onUpdateSelected: action("@update:selected"),
		},
	})
);
