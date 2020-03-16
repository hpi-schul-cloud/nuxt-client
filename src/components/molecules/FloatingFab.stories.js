import { storiesOf } from "@storybook/vue";

import FloatingFab from "./FloatingFab";
import { boolean, select } from "@storybook/addon-knobs";

storiesOf("5 Molecules/FloatingFab", module)
	.addParameters({
		notes: `# FloatingFab
This is basically an IconFab that get's positioned. So read the IconFab documentation for more information.`,
	})
	.add("default", () => ({
		components: { FloatingFab },
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
		template: `<FloatingFab
			:position="position"
			:icon="icon"
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
