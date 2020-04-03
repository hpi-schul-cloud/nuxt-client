import { storiesOf } from "@storybook/vue";

import FabFloating from "./FabFloating";
import { boolean, select } from "@storybook/addon-knobs";

storiesOf("5 Molecules/FabFloating", module)
	.addParameters({
		notes: `# FabFloating
This is basically an FabIcon that get's positioned. So read the FabIcon documentation for more information.`,
	})
	.add("default", () => ({
		components: { FabFloating },
		data: () => ({
			position: select(
				"Position",
				{
					"top-left": "top-left",
					"top-right": "top-right",
					"bottom-right": "bottom-right",
					"bottom-left": "bottom-left",
				},
				"bottom-right"
			),
			showLabel: boolean("showLabel", true),
		}),
		template: `<FabFloating
			:position="position"
			:showLabel="showLabel"
			:actions="[
				{
					label: 'Cast',
					icon: 'cast',
					'icon-source': 'material',
					event: 'event',
					arguments: 'cast',
				},
				{
					label: 'Locate',
					icon: 'add_location',
					'icon-source': 'material',
					event: 'event',
					arguments: 'locate',
				},
			]"
		/>`,
		methods: {},
	}));
