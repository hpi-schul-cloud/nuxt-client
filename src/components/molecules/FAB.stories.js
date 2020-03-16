import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import centered from "@storybook/addon-centered/vue";

import FAB from "./FAB";

storiesOf("5 Molecules/FAB", module)
	.addDecorator(centered)
	.add("single action", () => ({
		components: { FAB },
		template: `<FAB :actions="actions" />`,
		data: () => ({
			actions: [
				{
					icon: "plus",
					"icon-source": "material",
					event: "add",
				},
			],
		}),
	}))
	.add("multiple actions", () => ({
		components: { FAB },
		template: `<FAB
			:actions="actions"
			@event="onEvent"
		/>`,
		methods: {
			onEvent: action("@event"),
		},
		data: () => ({
			actions: [
				{
					label: "Cast",
					icon: "cast",
					"icon-source": "material",
					event: "event",
					arguments: "cast",
				},
				{
					label: "Locate",
					icon: "add_location",
					"icon-source": "material",
					event: "event",
					arguments: "locate",
				},
				{
					label: "Flash",
					icon: "flash_on",
					"icon-source": "material",
					event: "event",
					arguments: "flash",
				},
			],
		}),
	}));
