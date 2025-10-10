<template>
	<div>
		<VStepper v-model="stepValue" alt-labels>
			<VStepperHeader>
				<template v-for="step in steps" :key="step.value">
					<VStepperItem :complete="false" :value="step.value" :step="step.value" color="primary">
						{{ step.title }}
					</VStepperItem>
					<VDivider v-if="step.value < steps.length" />
				</template>
			</VStepperHeader>
			<VStepperWindow>
				<template v-for="step in steps" :key="step.value">
					<VStepperWindowItem :value="step.value" class="mt-n6">
						<h2 class="mb-10">{{ step.subtitle }}</h2>
						<LanguageSelection
							v-if="step.value === 1"
							:selected-language="selectedLanguage"
							@update:selected-language="onUpdateSelectedLanguage"
						/>
					</VStepperWindowItem>
				</template>
			</VStepperWindow>
			<div class="v-stepper-actions">
				<VBtn text :disabled="stepValue === 1" @click="onStepperClick(stepValue - 1)">
					{{ t("common.actions.back") }}
				</VBtn>
				<VBtn text color="primary" :disabled="stepValue === steps.length" @click="onStepperClick(stepValue + 1)">
					{{ t("common.actions.continue") }}
				</VBtn>
			</div>
		</VStepper>
	</div>
</template>

<script setup lang="ts">
import LanguageSelection from "./steps/LanguageSelection.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	selectedLanguage?: string;
};

withDefaults(defineProps<Props>(), {
	selectedLanguage: "de",
});

const emit = defineEmits<{
	(e: "update:selectedLanguage", value: string): void;
}>();

const { t } = useI18n();

const onUpdateSelectedLanguage = (value: string) => {
	emit("update:selectedLanguage", value);
};

const steps = [
	{ value: 1, title: "Sprache", subtitle: "Bitte Sprache wählen" },
	{ value: 2, title: "Wilkommen", subtitle: "Willkommen" },
	{ value: 3, title: "Passwort", subtitle: "Passwort vergeben" },
	{ value: 4, title: "Einwilligungserklärung", subtitle: "Einwilligungserklärung" },
	{ value: 5, title: "Bestätigungscode", subtitle: "Bestätigungscode" },
	{ value: 6, title: "Registrierung", subtitle: "Registrierung erfolgreich" },
];

const stepValue = ref(1);

const onStepperClick = (value: number) => {
	stepValue.value = value;
};
</script>
