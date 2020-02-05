import { storiesOf } from "@storybook/vue";

import LegacyFooter from "./LegacyFooter";

storiesOf("5 Molecules/LegacyFooter", module).add("default", () => ({
	components: { LegacyFooter },
	template: `<LegacyFooter :links="links" :contacts="contacts"/>`,
	data: () => ({
		links: [
			{
				title: "Impressum",
				href: "https://schul-cloud.org/impressum",
			},
			{
				title: "Datenschutzerklärung HPI",
				href: "https://schul-cloud.org/datenschutz",
			},
			{
				title: "Datenschutzerklärung Muster Schulen",
				href:
					"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
			},
		],
		contacts: [
			{
				title: "Allgemein: info@schulcloud.org",
				href: "mailto:info@schulcloud.org",
			},
			{
				title: "Support: feedback@schulcloud.org",
				href: "mailto:feedback@schulcloud.org",
			},
			{
				title: "Inhalteanbieter: inhalte@schulcloud.org",
				href: "mailto:inhalte@schulcloud.org",
			},
		],
	}),
}));
