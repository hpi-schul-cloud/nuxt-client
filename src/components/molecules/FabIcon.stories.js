import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { boolean, select, text } from "@storybook/addon-knobs";

import FabIcon from "./FabIcon";

storiesOf("5 Molecules/FabIcon", module)
	.addParameters({ layout: "centered" })
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
			:actions="actions"
			:color="color"
			:expandDirection="expandDirection"
			:labelPosition="labelPosition"
			:primaryAction="primaryAction"
			:showLabel="showLabel"
			@event="onEvent"
		/>`,
		methods: {
			onEvent: action("@event"),
		},
		data: () => ({
			showLabel: boolean("showLabel", true),
			color: text("color", "var(--color-primary)"),
			expandDirection: select(
				"expandDirection",
				{
					top: "top",
					bottom: "bottom",
				},
				"top"
			),
			labelPosition: select(
				"labelPosition",
				{
					left: "left",
					right: "right",
				},
				"left"
			),
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
					label: "Flash",
					icon: "flash_on",
					"icon-source": "material",
					event: "event",
					arguments: "flash",
				},
				{
					label: "Locate",
					icon: "add_location",
					"icon-source": "material",
					href: "https://schul-cloud.org",
					arguments: "locate",
				},
			],
		}),
	}));
