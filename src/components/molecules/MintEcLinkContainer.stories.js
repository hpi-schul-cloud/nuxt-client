import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import MintEcLinkContainer from "./MintEcLinkContainer";

storiesOf("5 Molecules/MintEcLinkContainer", module).add("default", () => ({
	components: { MintEcLinkContainer },
	template: `<MintEcLinkContainer heading="01 Schule informiern" ic="fas fa-info-circle" href="/mint-ec/schule-informieren" :image="image"/>`,
	data: () => ({
		image: text(
			"image",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOc+R8AAjcBmvywMWoAAAAASUVORK5CYII="
		),
	}),
}));
