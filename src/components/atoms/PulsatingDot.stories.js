import { storiesOf } from "@storybook/vue";

import PulsatingDot from "@components/atoms/PulsatingDot";

storiesOf("3 Atoms/PulsatingDot", module).add("Pulsing Dot", () => ({
	components: { PulsatingDot },
	template: `<PulsatingDot />`,
}));
