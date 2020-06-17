import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import NavigationBar from "./NavigationBar";
import navbarBaseItems from "@utils/navbarBaseItems.js";
import SchulCloudLogoColor from "@assets/img/logo/logo-image-color.svg";

storiesOf("5 Molecules/NavigationBar", module).add("default", () => ({
	components: { NavigationBar },
	navbarItems() {
		return navbarBaseItems.map((item) => {
			if (item.title.includes(".")) {
				item.title = this.$t(`${item.title}`);
			}
			return item;
		});
	},
	template: `<NavigationBar :img="img" :links="navbarItems"/>`,
	data: () => ({
		img: text("img", SchulCloudLogoColor)
	}),
}));
