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
						<h2 :id="`step-heading-${step.id}`" class="mb-4">{{ step.heading }}</h2>
						<LanguageSelection
							v-if="step.value === RegistrationSteps.LanguageSelection"
							:selected-language="lang"
							@update:selected-language="onUpdateSelectedLanguage"
						/>
						<Welcome v-else-if="step.value === RegistrationSteps.Welcome" />
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
					<VSpacer v-if="stepValue < steps.length" />
					<VBtn
						variant="flat"
						color="primary"
						data-testid="registiration-continue-button"
						:disabled="stepValue === steps.length"
						@click="onStepperClick(stepValue + 1)"
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
import Welcome from "./steps/Welcome.vue";
import { LanguageType } from "@/serverApi/v3";
import { useRegistration } from "@data-room";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

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

const { selectedLanguage, setSelectedLanguage, initializeLanguage } = useRegistration();
const lang = computed(() => selectedLanguage.value || LanguageType.De);

const onUpdateSelectedLanguage = (value: string) => {
	setSelectedLanguage(value as LanguageType);
};

const stepValue = ref(RegistrationSteps.LanguageSelection);

const onStepperClick = (value: RegistrationSteps) => {
	stepValue.value = value;
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
		heading: t("pages.registrationExternalMembers.steps.declarationOfConsent.heading"),
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
