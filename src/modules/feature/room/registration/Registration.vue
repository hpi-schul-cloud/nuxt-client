<template>
	<div>
		<v-stepper v-model="stepValue" alt-labels>
			<v-stepper-header>
				<template v-for="step in steps" :key="step.value">
					<v-stepper-item :complete="false" :value="step.value" :step="step.value" color="primary">
						{{ step.title }}
					</v-stepper-item>
					<v-divider v-if="step.value < steps.length" />
				</template>
			</v-stepper-header>
			<v-stepper-window>
				<template v-for="step in steps" :key="step.value">
					<v-stepper-window-item :value="step.value" class="mt-n6">
						<h2 class="mb-10">{{ step.subtitle }}</h2>
						<LanguageSelection v-if="step.value === 1" />
					</v-stepper-window-item>
				</template>
			</v-stepper-window>
			<v-stepper-actions @click:prev="onClick(stepValue - 1)" @click:next="onClick(stepValue + 1)">
				<v-btn text :disabled="stepValue === 1"> Zurück </v-btn>
				<v-btn text color="primary" :disabled="stepValue === steps.length"> Weiter </v-btn>
			</v-stepper-actions>
		</v-stepper>
	</div>
</template>

<script setup lang="ts">
import LanguageSelection from "./steps/LanguageSelection.vue";
import { ref } from "vue";

const steps = [
	{ value: 1, title: "Sprache", subtitle: "Bitte Sprache wählen" },
	{ value: 2, title: "Wilkommen", subtitle: "Willkommen" },
	{ value: 3, title: "Passwort", subtitle: "Passwort vergeben" },
	{ value: 4, title: "Einwilligungserklärung", subtitle: "Einwilligungserklärung" },
	{ value: 5, title: "Bestätigungscode", subtitle: "Bestätigungscode" },
	{ value: 6, title: "Registrierung", subtitle: "Registrierung erfolgreich" },
];

const stepValue = ref(1);

const onClick = (value: number) => {
	stepValue.value = value;
};
</script>
