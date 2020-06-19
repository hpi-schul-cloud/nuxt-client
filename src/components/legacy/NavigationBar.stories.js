import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import NavigationBar from "./NavigationBar";
import SchulCloudLogoColor from "@assets/img/logo/logo-image-color.svg";

storiesOf("5 Molecules/NavigationBar", module).add("default", () => ({
	components: { NavigationBar },
	template: `<NavigationBar :img="img" :links="links" :buttons="true"/> `,
	data: () => ({
		img: text("img", SchulCloudLogoColor),
		buttons: true,
		links: [
			{
				title: "Über das Projekt",
				href: "/about",
			},
			{
				title: "Erste Schritte",
				href:
					"https://docs.schul-cloud.org/pages/viewpage.action?pageId=13828239",
			},
			{
				title: "Blog",
				href: "https://blog.schul-cloud.org/",
			},
			{
				title: "FAQ",
				href: "https://blog.schul-cloud.org/faq",
			},
		],
	}),
}));
