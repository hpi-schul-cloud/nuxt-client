import { storiesOf } from "@storybook/vue";
import { text, number } from "@storybook/addon-knobs";

import LandingCTA from "@components/molecules/LandingCTA";
import StepProgress from "@components/organisms/StepProgress";

export const steps = [
	{ name: "Kursdaten" },
	{ name: "Kursmitglieder" },
	{ name: "Abschließen" },
];

export const moreProgressSteps = [
	{ name: "One" },
	{ name: "Two" },
	{ name: "Three" },
	{ name: "Four" },
	{ name: "Five" },
];

storiesOf("Molecules|Onboarding", module)
	.add("Landing CTA", () => ({
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
	}))

	.add("StepProgress", () => ({
		components: { StepProgress },
		data: () => ({
			progressSteps: steps,
			currentStep: number("currentStep", 0),
		}),
		template: `
		<div>
			<StepProgress :steps="progressSteps" :currentStep="currentStep"/>
		</div>`,
	}));
