/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from "@storybook/vue";
import outdent from "outdent";

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
	template:
		"<LandingCTA subtitle='Mit der HPI Schul-Cloud Unterricht digital gestalten' title='Willkommen in der Schul-Cloud, Carl Cactus' ctaText='Erstelle deinen ersten Kurs'/>",
}));

storiesOf("Wizard", module).add("StepProgress", () => ({
	components: { StepProgress },
	template: outdent`
		<div>
			<StepProgress :steps="progressSteps" :currentStep="0"/>
			<StepProgress :steps="progressSteps" :currentStep="1"/>
			<StepProgress :steps="progressSteps" :currentStep="2"/>
		</div>`,
	data: () => ({
		progressSteps: steps,
	}),
}));

/* eslint-enable react/react-in-jsx-scope */
