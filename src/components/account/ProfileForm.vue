<template>
	<VCard variant="outlined" class="pa-6 rounded-lg mb-6">
		<div class="text-h6 font-weight-bold mb-4 d-flex align-center">
			<VIcon :icon="mdiAccountCircleOutline" size="small" class="me-2 text-primary" />
			{{ t("pages.account.profile.headline") }}
		</div>

		<!-- SSO Central Management Notice -->
		<VAlert v-if="isSSO" type="info" variant="tonal" density="compact" class="mb-4" data-testid="sso-notice">
			{{ t("pages.account.profile.ssoNotice") }}
		</VAlert>

		<VForm ref="formRef" @submit.prevent="handleSubmit">
			<!-- Name fields (hidden for students) -->
			<div v-if="!isStudent" class="d-flex flex-column flex-sm-row gap-4 mb-4">
				<VTextField
					v-model="formData.firstName"
					v-input-attrs="{ 'data-testid': 'user_first_name' }"
					:label="t('pages.account.profile.firstName')"
					:readonly="isSSO"
					:disabled="loading"
					data-test-id="input_first_name"
					class="flex-grow-1"
				/>
				<VTextField
					v-model="formData.lastName"
					v-input-attrs="{ 'data-testid': 'user_last_name' }"
					:label="t('pages.account.profile.lastName')"
					:readonly="isSSO"
					:disabled="loading"
					data-test-id="input_last_name"
					class="flex-grow-1"
				/>
			</div>

			<!-- Email field -->
			<VTextField
				v-model="formData.email"
				v-input-attrs="{
					id: 'email',
					'data-testid': isSSO ? 'user_email_readonly' : 'user_email',
				}"
				:label="t('pages.account.profile.email')"
				:readonly="isSSO"
				:disabled="loading"
				:rules="[isRequired(), isValidEmail()]"
				name="email"
				data-test-id="input_email"
				class="mb-4"
			/>

			<!-- Password Section (for non-SSO users with PASSWORD_EDIT permission) -->
			<div v-if="!isSSO && canEditPassword" class="mt-6">
				<VDivider class="mb-4" />
				<div class="text-subtitle-1 font-weight-bold mb-2 d-flex align-center">
					<VIcon :icon="mdiLockOutline" size="small" class="me-2 text-primary" />
					{{ t("pages.account.password.headline") }}
				</div>
				<div class="text-caption text-medium-emphasis mb-4">
					{{ t("pages.account.password.hint") }}
				</div>

				<VTextField
					v-model="formData.passwordOld"
					v-input-attrs="{ 'data-testid': 'settings_password_current' }"
					:label="t('pages.account.password.currentPassword')"
					:rules="currentPasswordRules"
					:disabled="loading"
					type="password"
					autocomplete="current-password"
					data-test-id="input_current_password"
					class="mb-4"
				/>

				<VTextField
					v-model="formData.passwordNew"
					v-input-attrs="{ 'data-testid': 'settings_password_new' }"
					:label="t('pages.account.password.newPassword')"
					:rules="newPasswordRules"
					:disabled="loading"
					type="password"
					autocomplete="new-password"
					data-test-id="input_new_password"
					class="mb-4"
				/>

				<VTextField
					v-model="formData.passwordConfirm"
					v-input-attrs="{ 'data-testid': 'settings_password_control' }"
					:label="t('pages.account.password.confirmPassword')"
					:rules="confirmPasswordRules"
					:disabled="loading"
					type="password"
					autocomplete="new-password"
					data-test-id="input_confirm_password"
					class="mb-4"
				/>
			</div>

			<!-- Form Actions -->
			<div class="d-flex justify-end gap-3 mt-6">
				<VBtn
					v-if="!isSSO"
					type="submit"
					color="primary"
					:loading="loading"
					data-testid="submit_new_password_btn"
					class="px-6"
				>
					{{ t("common.actions.save") }}
				</VBtn>
			</div>
		</VForm>
	</VCard>
</template>

<script setup lang="ts">
import { vInputAttrs } from "@/directives/inputAttrs.directive";
import { UpdateProfilePayload } from "@data-account";
import { mdiAccountCircleOutline, mdiLockOutline } from "@icons/material";
import { isRequired, isValidEmail } from "@util-validators";
import { reactive, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { VForm } from "vuetify/components";

const props = defineProps({
	initialData: {
		type: Object as () => {
			firstName: string;
			lastName: string;
			email: string;
		},
		required: true,
	},
	isSSO: {
		type: Boolean,
		default: false,
	},
	isStudent: {
		type: Boolean,
		default: false,
	},
	canEditPassword: {
		type: Boolean,
		default: true,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits<{
	(e: "submit", payload: UpdateProfilePayload): void;
}>();

const { t } = useI18n();
const formRef = useTemplateRef<VForm>("formRef");

const formData = reactive({
	firstName: "",
	lastName: "",
	email: "",
	passwordOld: "",
	passwordNew: "",
	passwordConfirm: "",
});

watch(
	() => props.initialData,
	(newData) => {
		formData.firstName = newData.firstName;
		formData.lastName = newData.lastName;
		formData.email = newData.email;
	},
	{ immediate: true, deep: true }
);

const currentPasswordRules = [
	(v: string) => {
		const isEmailChanged = formData.email !== props.initialData.email;
		const isNewPasswordEntered = Boolean(formData.passwordNew);
		if ((isEmailChanged || isNewPasswordEntered) && !v) {
			return t("pages.account.password.errors.currentRequired");
		}
		return true;
	},
];

const newPasswordRules = [
	(v: string) => {
		if (!v) return true;
		if (v.length < 8) return t("pages.account.password.errors.minLength");
		if (!/[a-z]/.test(v)) return t("pages.account.password.errors.lowerCase");
		if (!/[A-Z]/.test(v)) return t("pages.account.password.errors.upperCase");
		if (!/[0-9]/.test(v)) return t("pages.account.password.errors.number");
		if (!/[!§$%&()=?;:,.#+*~-]/.test(v)) return t("pages.account.password.errors.specialChar");
		return true;
	},
];

const confirmPasswordRules = [
	(v: string) => {
		if (formData.passwordNew && v !== formData.passwordNew) {
			return t("pages.account.password.errors.mismatch");
		}
		return true;
	},
];

const handleSubmit = async () => {
	const validation = await formRef.value?.validate();
	if (!validation?.valid) return;

	const payload: UpdateProfilePayload = {
		passwordOld: formData.passwordOld,
		email: formData.email !== props.initialData.email ? formData.email : undefined,
		firstName: !props.isStudent && formData.firstName !== props.initialData.firstName ? formData.firstName : undefined,
		lastName: !props.isStudent && formData.lastName !== props.initialData.lastName ? formData.lastName : undefined,
		passwordNew: formData.passwordNew ? formData.passwordNew : undefined,
	};

	emit("submit", payload);
};
</script>
