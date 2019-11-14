import { storiesOf } from "@storybook/vue";

import notes from "@docs/storybook/molecules/FloatingFab.md";
import FloatingFab from "./FloatingFab";
import { text } from "@storybook/addon-knobs";

storiesOf("Molecules|FloatingFab", module)
	.addParameters({
		notes,
	})
	.add("default", () => ({
		components: { FloatingFab },
		data: () => ({
			position: text("Position", "bottom-right"),
		}),
		template: `<FloatingFab :position="position" />`,
		methods: {},
	}))
	.add("top-right", () => ({
		components: { FloatingFab },
		template: `<FloatingFab position="top-right"/>`,
		methods: {},
	}));
