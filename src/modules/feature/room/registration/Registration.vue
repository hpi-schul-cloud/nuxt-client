<template>
	<div>
		<VStepper v-model="stepValue" alt-labels non-linear :mobile="mobileView">
			<VStepperHeader>
				<template v-for="step in steps" :key="step.value">
					<VStepperItem :value="step.value" :step="step.value" color="primary" :title="step.title" />
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
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

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
const { xs, sm } = useDisplay();

const mobileView = computed(() => xs.value || sm.value);

const onUpdateSelectedLanguage = (value: string) => {
	emit("update:selectedLanguage", value);
};

const stepValue = ref(1);

const onStepperClick = (value: number) => {
	stepValue.value = value;
};

const steps = computed(() => [
	{
		value: 1,
		title: t("common.labels.language"),
		subtitle: t("pages.registrationExternalMembers.steps.language.subtitle"),
	},
	{ value: 2, title: t("common.labels.welcome"), subtitle: t("common.labels.welcome") },
	{
		value: 3,
		title: t("common.labels.password"),
		subtitle: t("pages.registrationExternalMembers.steps.password.subtitle"),
	},
	{
		value: 4,
		title: t("pages.registrationExternalMembers.steps.declarationOfConsent.title"),
		subtitle: t("pages.registrationExternalMembers.steps.declarationOfConsent.title"),
	},
	{
		value: 5,
		title: t("pages.registrationExternalMembers.steps.confirmationCode.title"),
		subtitle: t("pages.registrationExternalMembers.steps.confirmationCode.title"),
	},
	{
		value: 6,
		title: t("pages.registrationExternalMembers.steps.registration.title"),
		subtitle: t("pages.registrationExternalMembers.steps.registration.subtitle"),
	},
]);
</script>
