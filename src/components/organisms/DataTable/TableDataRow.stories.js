import { storiesOf } from "@storybook/vue";
import { boolean, number, array, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import TableDataRow from "./TableDataRow";

// mock data:
import { printDate } from "@plugins/datetime";
import faker from "faker/locale/en";
// set a seed to have a consistent data
faker.seed(512); // any static number will do the job

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

storiesOf("6 Organisms/DataTable/SubComponents", module).add(
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
