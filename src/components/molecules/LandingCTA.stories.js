import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import LandingCTA from "@components/molecules/LandingCTA";

storiesOf("Molecules/Onboarding", module).add("Landing CTA", () => ({
	components: { LandingCTA },
	data: () => ({
		title: text("title", "Willkommen in der Schul-Cloud, Carl Cactus"),
		subtitle: text(
			"subtitle",
			"Mit der HPI Schul-Cloud Unterricht digital gestalten"
		),
		ctaText: text("ctaText", "Erstelle deinen ersten Kurs"),
	}),
	template:
		"<LandingCTA :subtitle='subtitle' :title='title' :ctaText='ctaText'/>",
}));
