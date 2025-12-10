<template>
	<VDialog
		v-model="isOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-add-external-person"
		max-width="480"
		@keydown.esc="onClose"
		@click:outside="onClose"
		@after-leave="clearForm"
	>
		<VCard ref="addExternalPersonContent">
			<template #title>
				<h2 v-if="step === 'email'" class="mt-2">
					{{ t("pages.rooms.members.dialog.addExternalPerson.steps.email.heading") }}
				</h2>
				<h2 v-if="step === 'details'" class="mt-2">
					{{ t("pages.rooms.members.dialog.addExternalPerson.steps.details.heading") }}
				</h2>
			</template>
			<template #text>
				<InfoAlert v-if="step === 'details'" class="mb-4">{{
					t("pages.rooms.members.dialog.addExternalPerson.steps.details.alert", { applicationName })
				}}</InfoAlert>
				<p v-if="step === 'email'">
					{{ t("pages.rooms.members.dialog.addExternalPerson.steps.email.text") }}
				</p>
				<p v-if="step === 'details'">
					{{ t("pages.rooms.members.dialog.addExternalPerson.steps.details.text", { applicationName }) }}
				</p>
				<VForm ref="addExternalPersonForm" v-model="formValid" class="mt-5" @submit.prevent="onSubmit">
					<VTextField
						ref="emailInput"
						v-model="email"
						class="mb-4"
						:label="t('pages.rooms.members.dialog.addExternalPerson.label.email')"
						data-testid="invite-external-person-email"
						:readonly="step === 'details'"
						:rules="[isValidEmail(t('pages.rooms.members.dialog.addExternalPerson.label.email.error'))]"
					/>
					<template v-if="step === 'details'">
						<VTextField
							ref="firstNameInput"
							v-model="firstName"
							class="mb-4"
							:label="t('pages.rooms.members.dialog.addExternalPerson.label.firstName')"
							data-testid="invite-external-person-firstname"
							:rules="[isNonEmptyString(t('pages.rooms.members.dialog.addExternalPerson.label.firstName.error	'))]"
							@keydown.enter.prevent="() => lastNameInput?.focus()"
						/>
						<VTextField
							ref="lastNameInput"
							v-model="lastName"
							:label="t('pages.rooms.members.dialog.addExternalPerson.label.lastName')"
							data-testid="invite-external-person-lastname"
							:rules="[isNonEmptyString(t('pages.rooms.members.dialog.addExternalPerson.label.lastName.error'))]"
							@keydown.enter.prevent="onConfirmDetails"
						/>
					</template>
				</VForm>
			</template>
			<template #actions>
				<VSpacer />
				<div class="mr-4 mb-3">
					<template v-if="step === 'email'">
						<VBtn
							ref="cancelButton"
							class="ms-auto mr-2"
							:text="t('common.actions.cancel')"
							data-testid="invite-participant-cancel-btn"
							@click="onClose"
						/>
						<VBtn
							ref="addButton"
							class="ms-auto"
							color="primary"
							variant="flat"
							:text="t('pages.rooms.members.dialog.addExternalPerson.button.add')"
							data-testid="invite-participant-add-email-btn"
							@click="onConfirmEmail"
						/>
					</template>
					<template v-if="step === 'details'">
						<VBtn
							ref="backButton"
							class="ms-auto mr-2"
							:text="t('common.actions.back')"
							data-testid="invite-participant-back-btn"
							@click="onBackToEmail"
						/>
						<VBtn
							ref="confirmButton"
							class="ms-auto"
							color="primary"
							variant="flat"
							:text="t('pages.rooms.members.dialog.addExternalPerson.button.invite')"
							data-testid="invite-participant-confirm-btn"
							type="submit"
							@click="onConfirmDetails"
						/>
					</template>
					<template v-if="step === 'error'">
						<VBtn
							ref="closeButton"
							color="secondary"
							class="ms-auto mr-2"
							:text="t('common.labels.close')"
							data-testid="invite-participant-close-btn"
							@click="onClose"
						/>
					</template>
				</div>
			</template>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { notifyError } from "@data-app";
import { useEnvConfig } from "@data-env";
import { useRoomMembersStore } from "@data-room";
import { InfoAlert } from "@ui-alert";
import { isNonEmptyString, isValidEmail } from "@util-validators";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { VBtn, type VCard, VForm, VSpacer, VTextField } from "vuetify/components";

const roomMembersStore = useRoomMembersStore();
const applicationName = computed(() => useEnvConfig().value.SC_TITLE.replace("Niedersächsische", "Niedersächsischen"));

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "close"): void;
}>();

const { t } = useI18n();
const { xs } = useDisplay();

const step = ref<"email" | "details" | "error">("email");

const addExternalPersonForm = ref<VForm>();
const emailInput = ref<VTextField>();
const firstNameInput = ref<VTextField>();
const lastNameInput = ref<VTextField>();

const email = ref<string>("");
const firstName = ref<string>("");
const lastName = ref<string>("");

const formValid = computed(
	() =>
		(step.value === "email" && emailInput.value?.isValid) ||
		(step.value === "details" &&
			emailInput.value?.isValid &&
			firstNameInput.value?.isValid &&
			lastNameInput.value?.isValid)
);

watch(isOpen, (newVal) => {
	if (newVal === true) {
		setTimeout(() => {
			emailInput.value?.focus();
		}, 0);
	}
});

watch(step, (newStep) => {
	setTimeout(() => {
		if (newStep === "email") {
			emailInput.value?.focus();
		} else if (newStep === "details") {
			firstNameInput.value?.focus();
		}
	}, 0);
});

const onSubmit = () => {
	if (step.value === "email") {
		onConfirmEmail();
	} else if (step.value === "details") {
		onConfirmDetails();
	} else {
		onClose();
	}
};

const onConfirmEmail = async () => {
	emailInput.value?.validate();

	if (!emailInput.value?.isValid) {
		emailInput.value?.focus();

		return;
	}

	const status = await roomMembersStore.addMemberByEmail(email.value);
	if (status === "SUCCESS") {
		onClose();
	} else if (status === "NOT_FOUND") {
		step.value = "details";
	} else if (status === "USER_NOT_VALID") {
		step.value = "error";
	} else {
		notifyError(t("pages.rooms.members.dialog.addExternalPerson.errors.addingMember"));
	}
};

const onConfirmDetails = async () => {
	addExternalPersonForm.value?.validate();
	if (!formValid.value) {
		if (firstNameInput.value?.isValid === false) {
			firstNameInput.value.focus();
		} else if (lastNameInput.value?.isValid === false) {
			lastNameInput.value.focus();
		}
		return;
	}

	try {
		await roomMembersStore.registerExternalMember({
			email: email.value,
			firstName: firstName.value,
			lastName: lastName.value,
		});
	} catch {
		notifyError(t("pages.rooms.members.dialog.addExternalPerson.errors.addingMember"));
	} finally {
		onClose();
	}
};

const clearForm = () => {
	[email, firstName, lastName].forEach((field) => (field.value = ""));
	step.value = "email";
};

const onBackToEmail = () => {
	clearForm();
};

const onClose = () => {
	isOpen.value = false;
	emit("close");
};
</script>
