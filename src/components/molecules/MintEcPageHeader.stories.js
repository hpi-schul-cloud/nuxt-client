import { storiesOf } from "@storybook/vue";

import MintEcPageHeader from "./MintEcPageHeader";

storiesOf("5 Molecules/MintEcPageHeader", module).add("default", () => ({
	components: { MintEcPageHeader },
	template: `<MintEcPageHeader image="" heading="Schule informieren" teaser="Ein Teaser" />`,
	data: () => ({}),
}));
