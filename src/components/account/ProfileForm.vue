<template>
	<section class="mb-8" data-testid="profile-section">
		<InfoAlert v-if="isSSO" class="mb-6" data-testid="sso-notice">
			{{ t("pages.account.profile.ssoNotice") }}
		</InfoAlert>

		<!-- Validating only invalid fields on input keeps the passwords cleared after a save from turning red -->
		<VForm ref="formRef" validate-on="invalid-input" @submit.prevent="handleSubmit">
			<div v-if="showNameFields" class="d-flex" :class="{ 'flex-column': xs, 'ga-6': !xs }">
				<VTextField
					id="firstName"
					v-model="formData.firstName"
					v-input-attrs="{ 'data-testid': 'user_first_name' }"
					:label="t('common.labels.firstName')"
					:readonly="isSSO"
					:disabled="isSSO || loading"
					autocomplete="given-name"
					data-test-id="input_first_name"
					class="flex-fill"
				/>
				<VTextField
					id="lastName"
					v-model="formData.lastName"
					v-input-attrs="{ 'data-testid': 'user_last_name' }"
					:label="t('common.labels.lastName')"
					:readonly="isSSO"
					:disabled="isSSO || loading"
					autocomplete="family-name"
					data-test-id="input_last_name"
					class="flex-fill"
				/>
			</div>

			<VTextField
				id="email"
				v-model="formData.email"
				v-input-attrs="{ 'data-testid': isSSO ? 'user_email_readonly' : 'user_email' }"
				:label="t('pages.account.profile.email')"
				:readonly="isSSO"
				:disabled="isSSO || loading"
				:rules="isSSO ? [] : [isRequired(), isValidEmail()]"
				type="email"
				name="email"
				autocomplete="email"
				data-test-id="input_email"
			/>

			<template v-if="!isSSO">
				<SvsPasswordField
					v-model="formData.passwordOld"
					v-input-attrs="{ 'data-testid': 'settings_password_current' }"
					:label="t('pages.account.password.currentPassword')"
					:hint="t('pages.account.password.currentPasswordHint')"
					:rules="currentPasswordRules"
					:disabled="loading"
					persistent-hint
					autocomplete="current-password"
					data-test-id="input_current_password"
					class="mt-2"
				/>

				<template v-if="canEditPassword">
					<h2 class="mt-8">{{ t("pages.account.password.headline") }}</h2>
					<ul id="password-instructions" class="pl-5 mb-4">
						<li>{{ t("pages.account.password.instructions.rules") }}</li>
						<li>{{ t("pages.account.password.instructions.specialCharacters") }}</li>
					</ul>
					<div class="d-flex" :class="{ 'flex-column': xs, 'ga-6': !xs }">
						<SvsPasswordField
							v-model="formData.passwordNew"
							v-input-attrs="{ 'data-testid': 'settings_password_new' }"
							:label="t('pages.account.password.newPassword')"
							:rules="newPasswordRules"
							:disabled="loading"
							aria-describedby="password-instructions"
							autocomplete="new-password"
							data-test-id="input_new_password"
							class="flex-fill"
						/>
						<SvsPasswordField
							v-model="formData.passwordConfirm"
							v-input-attrs="{ 'data-testid': 'settings_password_control' }"
							:label="t('pages.account.password.confirmPassword')"
							:rules="confirmPasswordRules"
							:disabled="loading"
							autocomplete="new-password"
							data-test-id="input_confirm_password"
							class="flex-fill"
						/>
					</div>
				</template>

				<div class="d-flex justify-end mt-4">
					<VBtn type="submit" color="primary" variant="flat" :loading="loading" data-testid="submit_new_password_btn">
						{{ t("pages.account.profile.saveButton") }}
					</VBtn>
				</div>
			</template>
		</VForm>
	</section>
</template>

<script setup lang="ts">
import { vInputAttrs } from "@/directives/inputAttrs.directive";
import { UpdateProfilePayload } from "@data-account";
import { InfoAlert } from "@ui-alert";
import { SvsPasswordField } from "@ui-controls";
import {
	hasLowercaseLetter,
	hasNumber,
	hasSpecialCharacter,
	hasUppercaseLetter,
	isOfMinLength,
	isRequired,
	isValidEmail,
} from "@util-validators";
import { computed, reactive, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
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
const { xs } = useDisplay();
const formRef = useTemplateRef<VForm>("formRef");

const formData = reactive({
	firstName: "",
	lastName: "",
	email: "",
	passwordOld: "",
	passwordNew: "",
	passwordConfirm: "",
});

// Students may not change their name, but SSO users see it read-only like everyone else
const showNameFields = computed(() => props.isSSO || !props.isStudent);

// A new profile object arrives after loading and after every successful save
watch(
	() => props.initialData,
	(newData) => {
		Object.assign(formData, {
			firstName: newData.firstName,
			lastName: newData.lastName,
			email: newData.email,
			passwordOld: "",
			passwordNew: "",
			passwordConfirm: "",
		});
		formRef.value?.resetValidation();
	},
	{ immediate: true }
);

const currentPasswordRules = [isRequired(t("pages.account.password.errors.currentRequired"))];

const newPasswordRules = [
	isOfMinLength(8)(),
	hasUppercaseLetter(),
	hasLowercaseLetter(),
	hasNumber(),
	hasSpecialCharacter(),
].map((rule) => (value: string) => !value || rule(value));

const confirmPasswordRules = [
	(value: string) =>
		!formData.passwordNew || value === formData.passwordNew || t("pages.account.password.errors.mismatch"),
];

const handleSubmit = async () => {
	const validation = await formRef.value?.validate();
	if (!validation?.valid) return;

	const canEditName = !props.isStudent;
	const payload: UpdateProfilePayload = {
		passwordOld: formData.passwordOld,
		email: formData.email !== props.initialData.email ? formData.email : undefined,
		firstName: canEditName && formData.firstName !== props.initialData.firstName ? formData.firstName : undefined,
		lastName: canEditName && formData.lastName !== props.initialData.lastName ? formData.lastName : undefined,
		passwordNew: formData.passwordNew || undefined,
	};

	emit("submit", payload);
};
</script>
