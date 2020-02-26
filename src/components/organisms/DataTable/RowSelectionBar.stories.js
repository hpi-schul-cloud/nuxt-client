import { storiesOf } from "@storybook/vue";
import { number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import RowSelectionBar from "./RowSelectionBar";

storiesOf("6 Organisms/DataTable/SubComponents", module).add(
	"RowSelectionBar",
	() => ({
		components: { RowSelectionBar },
		template: `
		<RowSelectionBar
			:actions="[]"
			:totalNumberOfItems="totalNumberOfItems"
			:numberOfSelectedItems="numberOfSelectedItems"
			:allRowsOfAllPagesSelected.sync="allRowsOfAllPagesSelected"
			@update:allRowsOfAllPagesSelected="onUpdateAllRowsOfAllPagesSelected"
		/>`,
		data: () => ({
			totalNumberOfItems: number("totalNumberOfItems", 50),
			numberOfSelectedItems: number("numberOfSelectedItems", 5),
			allRowsOfAllPagesSelected: false,
		}),
		methods: {
			onUpdateAllRowsOfAllPagesSelected: action(
				"@update:allRowsOfAllPagesSelected"
			),
		},
	})
);
