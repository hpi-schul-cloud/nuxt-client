import { storiesOf } from "@storybook/vue";
import notes from "@docs/components/misc.md";

import PulsatingDot from "@components/PulsatingDot.vue";

storiesOf("Misc", module)
	.addParameters({
		notes,
	})
	.add("Pulsing Dot", () => ({
		components: { PulsatingDot },
		template: "<PulsatingDot/>",
	}));
