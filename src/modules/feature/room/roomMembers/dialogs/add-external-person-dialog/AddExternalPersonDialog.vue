<template>
	<VDialog
		v-model="isOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-add-external-person"
		max-width="480"
		@keydown.esc="onClose"
		@click:outside="onClose"
		@after-leave="resetForm"
	>
		<StepEmail v-if="step === 'email'" @update:email="onUpdateEmail" @close="onClose" />
		<StepDetails
			v-else-if="step === 'details'"
			:application-names="applicationNames"
			:email="email"
			@update:details="onUpdateDetails"
			@close="onClose"
			@back="onBack"
		/>
		<VCard v-else-if="step === 'error'">
			<template #title>
				<h2 class="mt-2">
					{{ t("pages.rooms.members.dialog.addExternalPerson.steps.details.heading") }}
				</h2>
			</template>
			<template #text />
			<template #actions>
				<VSpacer />
				<div class="mr-4 mb-3">
					<VBtn
						ref="closeButton"
						color="secondary"
						class="ms-auto mr-2"
						:text="t('common.labels.close')"
						data-testid="add-external-person-close-btn"
						@click="onClose()"
					/>
				</div>
			</template>
		</VCard>
		<div v-else>fdfdfd</div>
	</VDialog>
</template>

<script setup lang="ts">
import StepDetails from "./StepDetails.vue";
import StepEmail from "./StepEmail.vue";
import { useSafeFocusTrap } from "@/composables/safeFocusTrap";
import { notifyError } from "@data-app";
import { useEnvConfig } from "@data-env";
import { ExternalMemberCheckStatus, useRoomMembersStore } from "@data-room";
import { computed, nextTick, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { VBtn, type VCard, VForm, VSpacer } from "vuetify/components";

const roomMembersStore = useRoomMembersStore();
const applicationNames = computed(() => {
	const name = useEnvConfig().value.SC_TITLE || "dBildungsCloud";
	return {
		text: name.replace("Niedersächsische", "Niedersächsischen"),
		alert: name,
	};
});

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

const onUpdateEmail = async (newEmail: string) => {
	email.value = newEmail;

	const status = await roomMembersStore.addMemberByEmail(newEmail);
	if (status === ExternalMemberCheckStatus.ACCOUNT_FOUND_AND_ADDED) {
		closeDialog();
	} else if (status === ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND) {
		step.value = "details";
		await nextTick();
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

const onUpdateDetails = (newFirstName: string, newLastName: string) => {
	firstName.value = newFirstName;
	lastName.value = newLastName;
	onConfirmDetails();
};

const onBack = () => {
	resetForm();
};

const resetForm = () => {
	[email, firstName, lastName].forEach((field) => (field.value = ""));
	step.value = "email";
};

const closeDialog = () => {
	isOpen.value = false;
	emit("close");
};
</script>
