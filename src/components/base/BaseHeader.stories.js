import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import BaseHeader from "./BaseHeader";

storiesOf("Base/BaseHeader", module)
	.add("Without context menu actions", () => ({
		components: { BaseHeader },
		template: `<BaseHeader :title=title :source=source :icon=icon />`,
		data: () => ({
			title: text("title", "Mathe"),
		}),
	}))
	.add("With some actions", () => ({
		components: { BaseHeader },
		template: `<BaseHeader :title=title :actions=actions :source=source :icon=icon anchor='top-right-bottom-placed' />`,
		data: () => ({
			title: text("title", "Mathe"),
			source: text("source", "material"),
			icon: text("icon", "more_vert"),
			actions: [
				{
					icon: "remove",
					text: "Remove",
					event: "delete",
				},
				{
					icon: "add",
					text: "Add",
					event: "add",
				},
			],
		}),
	}));
