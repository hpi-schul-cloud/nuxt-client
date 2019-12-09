import { storiesOf } from "@storybook/vue";


import LegacyFooter from "./LegacyFooter";

storiesOf("Legacy|LegacyFooter", module)
	.add("default", () => ({
		components: { LegacyFooter },
		template: `<LegacyFooter />`,
		data: () => ({}),
	}));
