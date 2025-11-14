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
							<h2 :id="`step-heading-${step.id}`" class="mb-4 heading" tabindex="-1">{{ step.heading }}</h2>
							<LanguageSelection
								v-if="step.value === RegistrationSteps.LanguageSelection"
								:selected-language="lang"
								@update:selected-language="onUpdateSelectedLanguage"
							/>
							<Welcome v-else-if="step.value === RegistrationSteps.Welcome" />
							<Password v-else-if="step.value === RegistrationSteps.PasswordSetup" v-model="password" />
							<Consent
								v-if="step.value === RegistrationSteps.DeclarationOfConsent"
								v-model:is-terms-of-use-accepted="isTermsOfUseAccepted"
								v-model:is-privacy-policy-accepted="isPrivacyPolicyAccepted"
							/>
						</VForm>
					</VStepperWindowItem>
				</template>
			</VStepperWindow>
			<VStepperActions>
				<template #prev>
					<VBtn v-if="stepValue > 1" data-testid="registration-back-button" @click="onBack(stepValue - 1)">
						{{ t("common.actions.back") }}
					</VBtn>
				</template>
				<template #next>
					<VSpacer v-if="stepValue < steps.length" />
					<VBtn
						variant="flat"
						color="primary"
						data-testid="registration-continue-button"
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
import Consent from "./steps/Consent.vue";
import LanguageSelection from "./steps/LanguageSelection.vue";
import Password from "./steps/Password.vue";
import Welcome from "./steps/Welcome.vue";
import { LanguageType } from "@/serverApi/v3";
import { useRegistration } from "@data-room";
import { computed, nextTick, onMounted, ref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { VForm } from "vuetify/components";

enum RegistrationSteps {
	LanguageSelection = 1,
	Welcome,
	PasswordSetup,
	DeclarationOfConsent,
	ConfirmationCode,
	Registration,
}

const { t } = useI18n();
const { xs, sm } = useDisplay();
const mobileView = computed(() => xs.value || sm.value);

const {
	selectedLanguage,
	password,
	isTermsOfUseAccepted,
	isPrivacyPolicyAccepted,
	setSelectedLanguage,
	initializeLanguage,
} = useRegistration();
const lang = computed(() => selectedLanguage.value || LanguageType.De);
const stepForms = useTemplateRef("stepForms");

const onUpdateSelectedLanguage = (value: string) => {
	setSelectedLanguage(value as LanguageType);
};

const stepValue = ref(RegistrationSteps.LanguageSelection);

const focusHeadingForStep = async (stepIndex: number) => {
	const step = steps.value[stepIndex];
	if (!step) return;

	const heading = document.getElementById(`step-heading-${step.id}`);
	await nextTick();
	heading?.focus();
};

const onBack = async (value: RegistrationSteps) => {
	stepValue.value = value;
	await focusHeadingForStep(stepValue.value - 1);
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
	await nextTick();

	focusHeadingForStep(stepValue.value - 1);
};

onMounted(() => {
	initializeLanguage();
});

const steps = computed(() => [
	{
		value: RegistrationSteps.LanguageSelection,
		title: t("common.labels.language"),
		heading: t("pages.registrationExternalMembers.steps.language.heading"),
		id: "language",
	},
	{
		value: RegistrationSteps.Welcome,
		title: t("common.labels.welcome"),
		heading: t("common.labels.welcome"),
		id: "welcome",
	},
	{
		value: RegistrationSteps.PasswordSetup,
		title: t("common.labels.password"),
		heading: t("pages.registrationExternalMembers.steps.password.heading"),
		id: "password",
	},
	{
		value: RegistrationSteps.DeclarationOfConsent,
		title: t("pages.registrationExternalMembers.steps.declarationOfConsent.title"),
		heading: t("pages.registrationExternalMembers.steps.declarationOfConsent.title"),
		id: "consent",
	},
	{
		value: RegistrationSteps.ConfirmationCode,
		title: t("pages.registrationExternalMembers.steps.confirmationCode.title"),
		heading: t("pages.registrationExternalMembers.steps.confirmationCode.heading"),
		id: "confirmation",
	},
	{
		value: RegistrationSteps.Registration,
		title: t("pages.registrationExternalMembers.steps.registration.title"),
		heading: t("pages.registrationExternalMembers.steps.registration.heading"),
		id: "registration",
	},
]);
</script>
<style scoped>
.heading:focus {
	outline: none;
}
</style>
