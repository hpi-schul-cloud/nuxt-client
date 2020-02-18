import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import MintEcPageHeader from "./MintEcPageHeader";

storiesOf("5 Molecules/MintEcPageHeader", module).add("default", () => ({
	components: { MintEcPageHeader },
	template: `<MintEcPageHeader :heading="heading" :teaser="teaser" :image="image"  />`,
	data: () => ({
		heading: text("heading", "Schule informieren"),
		teaser: text("teaser", "Ein Teaser"),
		image: text(
			"image",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOc+R8AAjcBmvywMWoAAAAASUVORK5CYII="
		),
	}),
}));
