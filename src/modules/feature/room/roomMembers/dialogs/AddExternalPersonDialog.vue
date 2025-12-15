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
				<VForm ref="addExternalPersonForm" class="mt-5" data-testid="add-external-person-form">
					<VTextField
						ref="emailInput"
						v-model="email"
						class="mb-4"
						:label="t('pages.rooms.members.dialog.addExternalPerson.label.email')"
						data-testid="add-external-person-email"
						:readonly="step === 'details'"
						:rules="[isValidEmail(t('pages.rooms.members.dialog.addExternalPerson.label.email.error'))]"
						validate-on="submit"
						@keydown.enter.prevent="onConfirmEmail()"
					/>
					<template v-if="step === 'details'">
						<VTextField
							ref="firstNameInput"
							v-model="firstName"
							class="mb-4"
							:label="t('pages.rooms.members.dialog.addExternalPerson.label.firstName')"
							data-testid="add-external-person-firstname"
							:rules="[isNonEmptyString(t('pages.rooms.members.dialog.addExternalPerson.label.firstName.error'))]"
							@keydown.enter.prevent="onConfirmDetails()"
						/>
						<VTextField
							ref="lastNameInput"
							v-model="lastName"
							:label="t('pages.rooms.members.dialog.addExternalPerson.label.lastName')"
							data-testid="add-external-person-lastname"
							:rules="[isNonEmptyString(t('pages.rooms.members.dialog.addExternalPerson.label.lastName.error'))]"
							@keydown.enter.prevent="onConfirmDetails()"
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
							data-testid="add-external-person-cancel-btn"
							@click="onClose"
						/>
						<VBtn
							ref="addButton"
							class="ms-auto"
							color="primary"
							variant="flat"
							:text="t('pages.rooms.members.dialog.addExternalPerson.button.add')"
							data-testid="add-external-person-add-email-btn"
							@click="onConfirmEmail"
						/>
					</template>
					<template v-if="step === 'details'">
						<VBtn
							ref="backButton"
							class="ms-auto mr-2"
							:text="t('common.actions.back')"
							data-testid="add-external-person-back-btn"
							@click="clearForm"
						/>
						<VBtn
							ref="confirmButton"
							class="ms-auto"
							color="primary"
							variant="flat"
							:text="t('pages.rooms.members.dialog.addExternalPerson.button.invite')"
							data-testid="add-external-person-confirm-btn"
							@click="onConfirmDetails"
						/>
					</template>
					<template v-if="step === 'error'">
						<VBtn
							ref="closeButton"
							color="secondary"
							class="ms-auto mr-2"
							:text="t('common.labels.close')"
							data-testid="add-external-person-close-btn"
							@click="onClose"
						/>
					</template>
				</div>
			</template>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { useSafeFocusTrap } from "@/composables/safeFocusTrap";
import { notifyError } from "@data-app";
import { useEnvConfig } from "@data-env";
import { ExternalMemberCheckStatus, useRoomMembersStore } from "@data-room";
import { InfoAlert } from "@ui-alert";
import { isNonEmptyString, isValidEmail } from "@util-validators";
import { computed, nextTick, ref, useTemplateRef } from "vue";
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

const addExternalPersonContent = ref<VCard>();

const step = ref<"email" | "details" | "error">("email");

const addExternalPersonForm = ref<VForm>();
const firstNameInput = useTemplateRef("firstNameInput");

const email = ref<string>("");
const firstName = ref<string>("");
const lastName = ref<string>("");

useSafeFocusTrap(isOpen, addExternalPersonContent);

const checkForErrorsAndFocus = async () => {
	if (!addExternalPersonForm.value) return;
	const { valid, errors } = await addExternalPersonForm.value.validate();
	if (!valid && errors.length > 0) {
		const firstErrorId = errors[0].id as string;
		document.getElementById(firstErrorId)?.focus();
		return true;
	}
	return false;
};

const onConfirmEmail = async () => {
	if (await checkForErrorsAndFocus()) {
		return;
	}

	const status = await roomMembersStore.addMemberByEmail(email.value);
	if (status === ExternalMemberCheckStatus.ACCOUNT_FOUND_AND_ADDED) {
		closeDialog();
	} else if (status === ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND) {
		step.value = "details";
		await nextTick();
		firstNameInput.value?.focus();
	} else if (status === ExternalMemberCheckStatus.ACCOUNT_IS_NOT_EXTERNAL) {
		step.value = "error";
	} else {
		notifyError(t("pages.rooms.members.dialog.addExternalPerson.errors.addingMember"));
	}
};

const onConfirmDetails = async () => {
	if (await checkForErrorsAndFocus()) {
		return;
	}

	try {
		await roomMembersStore.startRegistrationProcess({
			email: email.value,
			firstName: firstName.value,
			lastName: lastName.value,
		});
	} catch {
		notifyError(t("pages.rooms.members.dialog.addExternalPerson.errors.addingMember"));
	} finally {
		closeDialog();
	}
};

const onClose = () => closeDialog();

const clearForm = () => {
	[email, firstName, lastName].forEach((field) => (field.value = ""));
	step.value = "email";
};

const closeDialog = () => {
	isOpen.value = false;
	emit("close");
};
</script>
