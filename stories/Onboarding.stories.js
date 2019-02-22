/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from "@storybook/vue";
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

storiesOf("Wizard", module)
	.add("StepProgress Step 1", () => ({
		components: { StepProgress },
		template: '<StepProgress :steps="progressSteps" :currentStep="0"/> ',
		data: () => ({
			progressSteps: steps,
		}),
	}))
	.add("StepProgress Step 2", () => ({
		components: { StepProgress },
		template: '<StepProgress :steps="progressSteps" :currentStep="1"/> ',
		data: () => ({
			progressSteps: steps,
		}),
	}))
	.add("StepProgress Step 3", () => ({
		components: { StepProgress },
		template: '<StepProgress :steps="progressSteps" :currentStep="2"/> ',
		data: () => ({
			progressSteps: steps,
		}),
	}))
	.add("StepProgress 5 Steps", () => ({
		components: { StepProgress },
		template: '<StepProgress :steps="progressSteps" :currentStep="2"/> ',
		data: () => ({
			progressSteps: moreProgressSteps,
		}),
	}));

/* eslint-enable react/react-in-jsx-scope */
