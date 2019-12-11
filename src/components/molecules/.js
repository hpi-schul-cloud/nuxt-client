import { storiesOf } from "@storybook/vue";

import MintEcPageHeader from "./MintEcPageHeader";

storiesOf("Molecules|MintEcPageHeader", module).add("default", () => ({
	components: { MintEcPageHeader },
	template: `<MintEcPageHeader image="headless.schul-cloud.org/content/images/2019/12/01_schule-informieren-6.png" header="Schule informieren" teaser="Ein Teaser" />`,
	data: () => ({}),
}));
