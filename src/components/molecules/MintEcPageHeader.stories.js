import { storiesOf } from "@storybook/vue";


import MintEcPageHeader from "./MintEcPageHeader";

storiesOf("Molecules|MintEcPageHeader", module)
	.add("default", () => ({
		components: { MintEcPageHeader },
		template: `<MintEcPageHeader />`,
		data: () => ({}),
	}));
