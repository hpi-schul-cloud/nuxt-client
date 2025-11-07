<template>
	<p>{{ t("pages.registrationExternalMembers.steps.password.firstParagraph", { instance }) }}</p>
	<p>{{ t("pages.registrationExternalMembers.steps.password.secondParagraph") }}</p>
	<div class="d-flex" :class="{ 'flex-column': xs, 'ga-6': !xs }">
		<VTextField readonly :label="t('common.labels.firstName')" model-value="Vorname" data-testid="first-name" />
		<VTextField readonly :label="t('common.labels.lastName')" model-value="Nachname" data-testid="last-name" />
	</div>
	<VTextField readonly :label="t('common.labels.email')" model-value="Email" data-testid="email" />

	<p class="font-weight-bold mt-4">{{ t("pages.registrationExternalMembers.steps.password.setPassword") }}</p>
	<ul id="password-instructions" class="pl-4">
		<li>{{ t("pages.registrationExternalMembers.steps.password.instructions.minLengthWithLowerAndUpperCase") }}</li>
		<li>{{ t("pages.registrationExternalMembers.steps.password.instructions.numberAndSpecialCharacter") }}</li>
		<li>{{ t("pages.registrationExternalMembers.steps.password.instructions.allowedSpecialCharacters") }}</li>
	</ul>
	<div class="d-flex ga-6 mt-4" :class="{ 'flex-column': xs }">
		<VTextField
			v-model="password"
			aria-describedby="password-instructions"
			autocomplete="new-password"
			data-testid="password"
			class="flex-fill"
			type="password"
			:width="xs ? '100%' : '50%'"
			:label="t('common.labels.password')"
			:rules="passwordRules"
		/>
		<VTextField
			data-testid="confirm-password"
			autocomplete="new-password"
			class="flex-fill"
			type="password"
			:label="t('common.labels.password.confirmation')"
			:width="xs ? '100%' : '50%'"
			:rules="passwordConfirmationRules"
		/>
	</div>
</template>

<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import {
	hasLowercaseLetter,
	hasNumber,
	hasSpecialCharacter,
	hasUppercaseLetter,
	isOfMinLength,
	isRequired,
} from "@util-validators";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { VTextField } from "vuetify/components";

const { t } = useI18n();
const { xs } = useDisplay();
const password = defineModel<string>();
const instance = computed(() => useEnvConfig().value.SC_TITLE);

const passwordRules = computed(() => [
	isRequired(t("pages.registrationExternalMembers.steps.password.validation.required")),
	isOfMinLength(8)(t("pages.registrationExternalMembers.steps.password.validation.minLength")),
	hasUppercaseLetter(t("pages.registrationExternalMembers.steps.password.validation.upperCase")),
	hasLowercaseLetter(t("pages.registrationExternalMembers.steps.password.validation.lowerCase")),
	hasNumber(t("pages.registrationExternalMembers.steps.password.validation.number")),
	hasSpecialCharacter(t("pages.registrationExternalMembers.steps.password.validation.specialCharacter")),
]);

const passwordConfirmationRules = computed(() => [
	isRequired(t("pages.registrationExternalMembers.steps.password.validation.confirmPassword")),
	(value: string) => {
		if (value !== password.value) {
			return t("pages.registrationExternalMembers.steps.password.validation.passwordsMatch");
		}
		return true;
	},
]);
</script>
