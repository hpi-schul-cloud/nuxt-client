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
		<StepEmail
			v-if="step === ExternalMembersInvitationSteps.Email || step === ExternalMembersInvitationSteps.Error"
			:email="email"
			:has-error="step === ExternalMembersInvitationSteps.Error"
			@submit:email="onSubmitEmail"
			@close="onClose"
		/>
		<StepDetails
			v-else-if="step === ExternalMembersInvitationSteps.Details"
			:application-names="applicationNames"
			:email="email"
			:first-name="firstName"
			:last-name="lastName"
			@update:details="onUpdateDetails"
			@submit:invitation="onSubmitInvitation"
			@close="onClose"
			@back="onBack"
		/>
	</VDialog>
</template>

<script setup lang="ts">
import StepDetails from "./StepDetails.vue";
import StepEmail from "./StepEmail.vue";
import { useSafeFocusTrap } from "@/composables/safeFocusTrap";
import { notifyError, notifySuccess } from "@data-app";
import { useEnvConfig } from "@data-env";
import {
	ExternalMemberCheckStatus,
	ExternalMembersInvitationSteps,
	useRegistrationStore,
	useRoomMembersStore,
} from "@data-room";
import { computed, nextTick, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { type VCard } from "vuetify/components";

const registrationStore = useRegistrationStore();
const roomMembersStore = useRoomMembersStore();
const applicationNames = computed(() => {
	const name = useEnvConfig().value.SC_TITLE || "dBildungsCloud";
	return {
		alert: name.replace("Niedersächsische", "Niedersächsischen"),
		text: name,
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

const step = ref<ExternalMembersInvitationSteps>(ExternalMembersInvitationSteps.Email);

const email = ref<string>("");
const firstName = ref<string>("");
const lastName = ref<string>("");

useSafeFocusTrap(isOpen, addExternalPersonContent);

const onUpdateDetails = (newFirstName: string, newLastName: string) => {
	firstName.value = newFirstName;
	lastName.value = newLastName;
};

const onSubmitEmail = async (newEmail: string) => {
	email.value = newEmail;
	const status = await roomMembersStore.addMemberByEmail(email.value);
	if (status === ExternalMemberCheckStatus.ACCOUNT_FOUND_AND_ADDED) {
		closeDialog();
	} else if (status === ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND) {
		step.value = ExternalMembersInvitationSteps.Details;
		await nextTick();
	} else if (status === ExternalMemberCheckStatus.ACCOUNT_IS_NOT_EXTERNAL) {
		step.value = ExternalMembersInvitationSteps.Error;
	} else {
		notifyError(t("pages.rooms.members.dialog.addExternalPerson.errors.addingMember"));
	}
};

const onSubmitInvitation = async () => {
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
		notifySuccess(t("pages.rooms.members.dialog.addExternalPerson.success.addingMember", { email: email.value }));
		await registrationStore.fetchRegistrationsForCurrentRoom();
	}
};

const onClose = () => closeDialog();

const onBack = () => {
	step.value = ExternalMembersInvitationSteps.Email;
};

const resetForm = () => {
	[email, firstName, lastName].forEach((field) => (field.value = ""));
	step.value = ExternalMembersInvitationSteps.Email;
};

const closeDialog = () => {
	isOpen.value = false;
	emit("close");
};
</script>
