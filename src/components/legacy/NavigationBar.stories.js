import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import NavigationBar from "./NavigationBar";
import SchulCloudLogoColor from "@assets/img/logo/logo-image-color.svg";

storiesOf("5 Molecules/NavigationBar", module).add("default", () => ({
	components: { NavigationBar },
	template: `<NavigationBar :img="img" :links="links"/>`,
	data: () => ({
		img: text("img", SchulCloudLogoColor),
		links: [
			{
				title: "Projekt",
				href: "/about",
			},
			{
				title: "Mitmachen",
				href: "/community",
			},
			{
				title: "Blog",
				href: "https://blog.schul-cloud.org/",
			},
			{
				title: "FAQ",
				href: "https://blog.schul-cloud.org/faq",
			},
			{
				title: "Onboarding",
				href: "/mint-ec/mint-ec-willkommenspaket",
			},
		],
	}),
}));
