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
						<!-- :selected-language="selectedLanguage" -->
						<LanguageSelection
							v-if="step.value === 1"
							:selected-language="selectedLanguage"
							@update:selected-language="onUpdateSelectedLanguage"
						/>
					</v-stepper-window-item>
				</template>
			</v-stepper-window>
			<div class="v-stepper-actions">
				<v-btn text :disabled="stepValue === 1" @click="onStepperClick(stepValue - 1)">
					{{ t("common.actions.back") }}
				</v-btn>
				<v-btn text color="primary" :disabled="stepValue === steps.length" @click="onStepperClick(stepValue + 1)">
					{{ t("common.actions.continue") }}
				</v-btn>
			</div>
		</v-stepper>
	</div>
</template>

<script setup lang="ts">
import LanguageSelection from "./steps/LanguageSelection.vue";
import { onMounted, ref } from "vue";
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

const setCookie = (lang = "de") => {
	const expires = new Date(Date.now() + 60 * 60 * 24 * 365 * 1000).toUTCString();
	document.cookie = `USER_LANG=${lang}; path=/; expires=${expires}; SameSite=Lax`;
};

const onUpdateSelectedLanguage = (value: string) => {
	setCookie(value);
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

onMounted(() => {
	stepValue.value = 1;
});
</script>
