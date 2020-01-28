import { storiesOf } from "@storybook/vue";

import NavigationBar from "./NavigationBar";

storiesOf('Molecules/NavigationBar', module).add("default", () => ({
	components: { NavigationBar },
	template: `<NavigationBar :links="links"/>`,
	data: () => ({
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
