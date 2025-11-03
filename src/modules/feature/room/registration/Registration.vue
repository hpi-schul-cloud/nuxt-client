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
						<h2 id="language-heading" class="mb-10">{{ step.subtitle }}</h2>
						<LanguageSelection
							v-if="step.value === 1"
							:selected-language="lang"
							@update:selected-language="onUpdateSelectedLanguage"
						/>
						<Welcome v-else-if="step.value === 2" />
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
		subtitle: t("pages.registrationExternalMembers.steps.language.subtitle"),
	},
	{
		value: RegistrationSteps.Welcome,
		title: t("common.labels.welcome"),
		subtitle: t("pages.registrationExternalMembers.steps.welcome.subtitle"),
	},
	{
		value: RegistrationSteps.PasswordSetup,
		title: t("common.labels.password"),
		subtitle: t("pages.registrationExternalMembers.steps.password.subtitle"),
	},
	{
		value: RegistrationSteps.DeclarationOfConsent,
		title: t("pages.registrationExternalMembers.steps.declarationOfConsent.title"),
		subtitle: t("pages.registrationExternalMembers.steps.declarationOfConsent.title"),
	},
	{
		value: RegistrationSteps.ConfirmationCode,
		title: t("pages.registrationExternalMembers.steps.confirmationCode.title"),
		subtitle: t("pages.registrationExternalMembers.steps.confirmationCode.title"),
	},
	{
		value: RegistrationSteps.Registration,
		title: t("pages.registrationExternalMembers.steps.registration.title"),
		subtitle: t("pages.registrationExternalMembers.steps.registration.subtitle"),
	},
]);
</script>
