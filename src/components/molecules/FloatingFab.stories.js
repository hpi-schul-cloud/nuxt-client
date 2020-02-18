import { storiesOf } from "@storybook/vue";

import notes from "@docs/storybook/molecules/FloatingFab.md";
import FloatingFab from "./FloatingFab";
import { text } from "@storybook/addon-knobs";

storiesOf("5 Molecules/FloatingFab", module)
	.addParameters({
		notes,
	})
	// render something for correct screenshots
	.addDecorator(() => ({
		template:
			'<div style="width: 5px; height: 5px; background: #ccc;"><story/></div>',
	}))
	.add("default", () => ({
		components: { FloatingFab },
		data: () => ({
			position: text("Position", "bottom-right"),
			icon: text("Icon", "add"),
		}),
		template: `<FloatingFab :position="position" :icon="icon" aria-label="hurz"/>`,
		methods: {},
	}))
	.add("top-right", () => ({
		components: { FloatingFab },
		template: `<FloatingFab position="top-right" aria-label="bra"/>`,
		methods: {},
	}));
