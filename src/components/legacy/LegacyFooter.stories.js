import { storiesOf } from "@storybook/vue";

import LegacyFooter from "./LegacyFooter";

storiesOf("5 Molecules/LegacyFooter", module).add("default", () => ({
	components: { LegacyFooter },
	template: `<LegacyFooter :links="links" :contacts="contacts"/>`,
	data: () => ({
		links: [
			{
				title: "Impressum",
				href: "https://hpi-schul-cloud.de/impressum",
			},
			{
				title: "Datenschutzerklärung HPI",
				href: "https://hpi-schul-cloud.de/datenschutz",
			},
			{
				title: "Datenschutzerklärung Muster Schulen",
				href: "https://s3.hidrive.strato.com/cloud-instances/default/Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
			},
		],
		contacts: [
			{
				title: "Allgemein: info@schulcloud.org",
				href: "mailto:info@schulcloud.org",
			},
			{
				title: "Support: support@dbildungscloud.de",
				href: "mailto:support@dbildungscloud.de",
			},
			{
				title: "Inhalteanbieter: inhalte@schulcloud.org",
				href: "mailto:inhalte@schulcloud.org",
			},
		],
	}),
}));
