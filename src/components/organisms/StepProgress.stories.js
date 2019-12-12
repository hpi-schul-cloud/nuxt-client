import { storiesOf } from "@storybook/vue";
import { number } from "@storybook/addon-knobs";

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

storiesOf("Molecules|Onboarding", module).add("StepProgress", () => ({
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
