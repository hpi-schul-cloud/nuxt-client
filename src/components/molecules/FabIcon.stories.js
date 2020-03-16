import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import centered from "@storybook/addon-centered/vue";

import FabIcon from "./FabIcon";

storiesOf("5 Molecules/FabIcon", module)
	.addDecorator(centered)
	.add("single action", () => ({
		components: { FabIcon },
		template: `<FabIcon
			@event="onEvent"
			:primary-action="action"
		/>`,
		methods: {
			onEvent: action("@event"),
		},
		data: () => ({
			action: {
				icon: "edit",
				"icon-source": "material",
				event: "event",
				arguments: ["all", "datatypes", "supported"],
			},
		}),
	}))
	.add("multiple actions", () => ({
		components: { FabIcon },
		template: `<FabIcon
			:primaryAction="primaryAction"
			:actions="actions"
			@event="onEvent"
			:showLabel="true"
		/>`,
		methods: {
			onEvent: action("@event"),
		},
		data: () => ({
			primaryAction: {
				icon: "more_vert",
				"icon-source": "material",
			},
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
