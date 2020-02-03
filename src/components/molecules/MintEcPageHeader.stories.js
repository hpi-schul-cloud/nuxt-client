import { storiesOf } from "@storybook/vue";

import MintEcPageHeader from "./MintEcPageHeader";

storiesOf("4 Molecules/MintEcPageHeader", module).add("default", () => ({
	components: { MintEcPageHeader },
	template: `<MintEcPageHeader image="https://headless.schul-cloud.org/content/images/2019/12/01_schule-informieren-6.png" heading="Schule informieren" teaser="Ein Teaser" />`,
	data: () => ({}),
}));
