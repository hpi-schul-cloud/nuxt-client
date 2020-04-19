import { storiesOf } from "@storybook/vue";
import { text, select } from "@storybook/addon-knobs";

import ResponsiveIconButton from "./ResponsiveIconButton";

storiesOf("5 Molecules/ResponsiveButton", module)
	.addParameters({
		notes: "Resize the frame to see changes.",
	})
	.add("default", () => ({
		components: { ResponsiveIconButton },
		data: () => ({
			design: select(
				"design",
				{
					default: "",
					text: "text",
					primary: "primary",
					"primary text": "primary text",
					"hero-cta": "hero-cta",
					fancy: "fancy",
					secondary: "secondary",
					"secondary text": "secondary text",
					success: "success",
					"success text": "success text",
					danger: "danger",
					"danger text": "danger text",
				},
				"primary text"
			),
			icon: text("icon", "add"),
			source: select(
				"source",
				{ material: "material", fa: "fa", custom: "custom" },
				"material"
			),
			content: text("content", "My Responsive Button"),
		}),
		template: `
			<responsive-icon-button
				:design="design"
				:source="source"
				:icon="icon"
			>
				{{ content }}
			</responsive-icon-button>`,
	}));
