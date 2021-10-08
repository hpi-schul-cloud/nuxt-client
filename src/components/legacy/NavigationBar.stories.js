import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import NavigationBar from "./NavigationBar";
import SchulCloudLogoColor from "@assets/img/logo/logo-dBildungscloud.svg";

storiesOf("5 Molecules/NavigationBar", module).add("default", () => ({
	components: { NavigationBar },
	template: `<NavigationBar :img="img" :links="links" :buttons="true"/> `,
	data: () => ({
		img: text("img", SchulCloudLogoColor),
		links: [
			{
				title: "Über das Projekt",
				href: "/about",
			},
			{
				title: "Erste Schritte",
				href: "https://blog.hpi-schul-cloud.de/erste-schritte/",
			},
			{
				title: "Blog",
				href: "https://blog.hpi-schul-cloud.de/",
			},
			{
				title: "FAQ",
				href: "https://blog.hpi-schul-cloud.de/faq",
			},
		],
	}),
}));
