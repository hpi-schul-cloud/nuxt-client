<template>
	<div>
		<v-stepper alt-labels>
			<v-stepper-header>
				<template v-for="step in steps" :key="step.value">
					<v-stepper-item :complete="false" :value="step.value">
						{{ step.title }}
					</v-stepper-item>
					<v-divider v-if="step.value < steps.length" />
				</template>
			</v-stepper-header>
		</v-stepper>
	</div>
</template>

<script setup lang="ts">
const steps = [
	{ value: 1, title: "Sprache", subtitle: "Bitte Sprache wählen" },
	{ value: 2, title: "Wilkommen", subtitle: "Willkommen" },
	{ value: 3, title: "Passwort", subtitle: "Passwort vergeben" },
	{ value: 4, title: "Einwilligungserklärung", subtitle: "Einwilligungserklärung" },
	{ value: 5, title: "Bestätigungscode", subtitle: "Bestätigungscode" },
	{ value: 6, title: "Registrierung", subtitle: "Registrierung erfolgreich" },
];
</script>
