import { storiesOf } from "@storybook/vue";
import { withMarkdownNotes } from "@storybook/addon-notes";
import miscDoc from "@docs/components/misc.md";

import PulsatingDot from "@components/PulsatingDot.vue";

storiesOf("Misc", module)
	.addDecorator(withMarkdownNotes(miscDoc))
	.add("Pulsing Dot", () => ({
		components: { PulsatingDot },
		template: "<PulsatingDot/>",
	}));
