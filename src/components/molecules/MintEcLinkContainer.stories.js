import { storiesOf } from "@storybook/vue";

import MintEcLinkContainer from "./MintEcLinkContainer";

storiesOf("Molecules/MintEcLinkContainer", module).add("default", () => ({
	components: { MintEcLinkContainer },
	template: `<MintEcLinkContainer heading="01 Schule informiern" ic="fas fa-info-circle" href="/mint-ec/schule-informieren" image="headless.schul-cloud.org/content/images/2019/12/01_schule-informieren-6.png"/>`,
	data: () => ({}),
}));
