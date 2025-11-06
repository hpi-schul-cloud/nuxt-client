<template>
	<div>
		<VStepper v-model="stepValue" alt-labels :mobile="mobileView">
			<VStepperHeader>
				<template v-for="step in steps" :key="step.value">
					<VStepperItem :value="step.value" :step="step.value" color="primary" :title="step.title" />
					<VDivider v-if="step.value < steps.length" />
				</template>
			</VStepperHeader>
			<VStepperWindow>
				<template v-for="step in steps" :key="step.value">
					<VStepperWindowItem :value="step.value">
						<VForm ref="stepForms">
							<h2 id="language-heading" class="mb-10">{{ step.subtitle }}</h2>
							<LanguageSelection
								v-if="step.value === 1"
								:selected-language="lang"
								@update:selected-language="onUpdateSelectedLanguage"
							/>

							<Password v-else-if="step.value === 3" v-model="password" />
						</VForm>
					</VStepperWindowItem>
				</template>
			</VStepperWindow>
			<VStepperActions>
				<template #prev>
					<VBtn v-if="stepValue > 1" data-testid="registration-back-button" @click="onStepperClick(stepValue - 1)">
						{{ t("common.actions.back") }}
					</VBtn>
				</template>
				<template #next>
					<VSpacer v-if="stepValue === 1" />
					<VBtn
						variant="flat"
						color="primary"
						data-testid="registiration-continue-button"
						:disabled="stepValue === steps.length"
						@click="onContinue"
					>
						{{ t("common.actions.continue") }}
					</VBtn>
				</template>
			</VStepperActions>
		</VStepper>
	</div>
</template>

<script setup lang="ts">
import LanguageSelection from "./steps/LanguageSelection.vue";
import Password from "./steps/Password.vue";
import { LanguageType } from "@/serverApi/v3";
import { useRegistration } from "@data-room";
import { computed, onMounted, ref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { VForm } from "vuetify/components";

const { t } = useI18n();
const { xs, sm } = useDisplay();
const mobileView = computed(() => xs.value || sm.value);

const { selectedLanguage, password, setSelectedLanguage, initializeLanguage } = useRegistration();
const lang = computed(() => selectedLanguage.value || LanguageType.De);
const stepForms = useTemplateRef("stepForms");

const onUpdateSelectedLanguage = (value: string) => {
	setSelectedLanguage(value as LanguageType);
};

const stepValue = ref(1);

const onStepperClick = (value: number) => {
	stepValue.value = value;
};

const onContinue = async () => {
	if (stepForms.value === null) return;

	const { valid, errors } = await stepForms.value[stepValue.value - 1]!.validate();
	if (!valid && errors.length > 0) {
		// Workaround for Vuetify 3.9.4 fast-fail inputs errors will not be announced to screen readers on submitting,
		// so we are focusing the first invalid input to announce the error.
		// More Information: https://github.com/vuetifyjs/vuetify/issues/21920
		const firstErrorId = errors[0].id as string;
		document.getElementById(firstErrorId)?.focus();
		return;
	}
	stepValue.value += 1;
};

onMounted(() => {
	initializeLanguage();
});

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
