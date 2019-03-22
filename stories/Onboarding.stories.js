/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from "@storybook/vue";
import outdent from "outdent";
import { text, number } from "@storybook/addon-knobs";

import LandingCTA from "@components/TemplateLandingCTA";
import StepProgress from "@components/StepProgress";

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

storiesOf("Onboarding", module).add("Landing CTA", () => ({
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

storiesOf("Wizard", module).add("StepProgress", () => ({
	components: { StepProgress },
	data: () => ({
		progressSteps: steps,
		currentStep: number("currentStep", 0),
	}),
	template: outdent`
		<div>
			<StepProgress :steps="progressSteps" :currentStep="currentStep"/>
		</div>`,
}));

/* eslint-enable react/react-in-jsx-scope */
