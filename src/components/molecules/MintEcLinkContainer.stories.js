import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import faker from "faker/locale/en";
// set a seed to have a consistent fake for the screenshot tests
faker.seed(512); // any static number will do the job

import MintEcLinkContainer from "./MintEcLinkContainer";

storiesOf("5 Molecules/MintEcLinkContainer", module).add("default", () => ({
	components: { MintEcLinkContainer },
	template: `<MintEcLinkContainer heading="01 Schule informiern" ic="info-circle" href="/mint-ec/schule-informieren" :image="image"/>`,
	data: () => ({
		image: text("image", faker.image.dataUri(1, 1)),
	}),
}));
