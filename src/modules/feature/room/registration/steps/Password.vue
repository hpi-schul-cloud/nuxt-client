<template>
	<p>{{ t("pages.registrationExternalMembers.steps.password.firstParagraph", { instance }) }}</p>
	<p>{{ t("pages.registrationExternalMembers.steps.password.secondParagraph") }}</p>
	<div class="d-flex" :class="{ 'flex-column': xs, 'ga-6': !xs }">
		<VTextField
			readonly
			:label="t('common.labels.firstName')"
			:model-value="userData?.firstName"
			data-testid="first-name"
		/>
		<VTextField
			readonly
			:label="t('common.labels.lastName')"
			:model-value="userData?.lastName"
			data-testid="last-name"
		/>
	</div>
	<VTextField readonly :label="t('common.labels.email')" :model-value="userData?.email" data-testid="email" />
	<p class="font-weight-bold mt-4">{{ t("pages.registrationExternalMembers.steps.password.setPassword") }}</p>
	<ul id="password-instructions" class="pl-5">
		<li>{{ t("pages.registrationExternalMembers.steps.password.instructions.minLengthWithLowerAndUpperCase") }}</li>
		<li>{{ t("pages.registrationExternalMembers.steps.password.instructions.numberAndSpecialCharacter") }}</li>
		<li>{{ t("pages.registrationExternalMembers.steps.password.instructions.allowedSpecialCharacters") }}</li>
	</ul>
	<div class="d-flex mt-4" :class="{ 'flex-column ga-4': xs, 'ga-6': !xs }">
		<PasswordField
			v-model="password"
			aria-describedby="password-instructions"
			autocomplete="new-password"
			data-testid="password"
			class="flex-fill password-error-message"
			:width="xs ? '100%' : '50%'"
			:label="t('common.labels.password')"
			:rules="passwordRules"
			@update:model-value="onUpdatePassword"
		/>
		<PasswordField
			ref="confirmPasswordField"
			v-model="confirmPassword"
			data-testid="confirm-password"
			autocomplete="new-password"
			class="flex-fill password-error-message"
			:label="t('common.labels.password.confirmation')"
			:width="xs ? '100%' : '50%'"
			:rules="passwordConfirmationRules"
		/>
	</div>
</template>

<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { PasswordField } from "@ui-inputs";
import {
	hasLowercaseLetter,
	hasNumber,
	hasSpecialCharacter,
	hasUppercaseLetter,
	isOfMinLength,
	isRequired,
} from "@util-validators";
import { computed, nextTick, ref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

defineProps<{
	userData: {
		firstName: string;
		lastName: string;
		email: string;
	} | null;
}>();

const { t } = useI18n();
const { xs } = useDisplay();
const password = defineModel<string>();
const instance = computed(() => useEnvConfig().value.SC_TITLE);
const confirmPasswordField = useTemplateRef("confirmPasswordField");
const confirmPassword = ref("");

const passwordRules = computed(() => [
	isRequired(t("pages.registrationExternalMembers.steps.password.validation.required")),
	isOfMinLength(8)(t("pages.registrationExternalMembers.steps.password.validation.minLength")),
	hasUppercaseLetter(),
	hasLowercaseLetter(),
	hasNumber(),
	hasSpecialCharacter(),
]);

const passwordConfirmationRules = computed(() => [
	(value: string) => {
		if (value !== password.value) {
			return t("pages.registrationExternalMembers.steps.password.validation.passwordsMatch");
		}
		return true;
	},
]);

const onUpdatePassword = async () => {
	if (confirmPassword.value === "") return;
	await nextTick();
	await confirmPasswordField.value?.validate();
};
</script>

<style scoped>
.password-error-message {
	:deep(.v-input__details) {
		min-height: 30px;
		align-items: flex-start;
	}
}
</style>
