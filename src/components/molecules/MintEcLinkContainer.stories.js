import { storiesOf } from "@storybook/vue";


import MintEcLinkContainer from "./MintEcLinkContainer";

storiesOf("Molecules|MintEcLinkContainer", module)
	.add("default", () => ({
		components: { MintEcLinkContainer },
		template: `<MintEcLinkContainer />`,
		data: () => ({}),
	}));
