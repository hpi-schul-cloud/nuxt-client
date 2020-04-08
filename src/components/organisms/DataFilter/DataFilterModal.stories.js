import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import DataFilterModal from "./DataFilterModal";

storiesOf("6 Organisms/DataFilter", module).add("DataFilterModal", () => {
	return {
		components: { DataFilterModal },
		template: `
			<DataFilterModal
				:title="title"
				:labelApply="labelApply"
				:labelCancel="labelCancel"
				:labelRemove="labelRemove"
				@apply="onApply"
				@cancel="onCancel"
				@remove="onRemove"
			>
				Slot Content
			</DataFilterModal>`,
		data: () => ({
			title: text("title", "Title"),
			labelApply: text("labelApply", "Apply"),
			labelCancel: text("labelCancel", "Cancel"),
			labelRemove: text("labelRemove", "Remove"),
		}),
		methods: {
			onApply: action("@apply"),
			onCancel: action("@cancel"),
			onRemove: action("@remove"),
		},
	};
});
