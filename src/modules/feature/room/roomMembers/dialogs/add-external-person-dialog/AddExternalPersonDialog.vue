<template>
	<SvsDialog
		v-model="isOpen"
		:title="externalPersonTitle"
		data-testid="dialog-add-external-person"
		no-actions
		@after-leave="resetForm"
	>
		<template #content>
			<StepEmail
				v-if="step === ExternalMembersInvitationSteps.Email || step === ExternalMembersInvitationSteps.Error"
				:email="email"
				:has-error="step === ExternalMembersInvitationSteps.Error"
				@submit:email="onSubmitEmail"
				@close="closeDialog"
			/>
			<StepDetails
				v-else-if="step === ExternalMembersInvitationSteps.Details"
				:application-names="applicationNames"
				:email="email"
				:first-name="firstName"
				:last-name="lastName"
				@update:details="onUpdateDetails"
				@submit:invitation="onSubmitInvitation"
				@back="onBack"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import StepDetails from "./StepDetails.vue";
import StepEmail from "./StepEmail.vue";
import { notifyError, notifySuccess } from "@data-app";
import { useEnvConfig } from "@data-env";
import {
	ExternalMemberCheckStatus,
	ExternalMembersInvitationSteps,
	useRegistrationStore,
	useRoomMembersStore,
} from "@data-room";
import { SvsDialog } from "@ui-dialog";
import { computed, nextTick, ref } from "vue";
import { useI18n } from "vue-i18n";

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

const { t } = useI18n();

const step = ref<ExternalMembersInvitationSteps>(ExternalMembersInvitationSteps.Email);

const email = ref("");
const firstName = ref("");
const lastName = ref("");

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

const externalPersonTitle = computed(() => {
	if (step.value === ExternalMembersInvitationSteps.Email || step.value === ExternalMembersInvitationSteps.Error) {
		return "pages.rooms.members.dialog.addExternalPerson.steps.email.heading";
	} else {
		return "pages.rooms.members.dialog.addExternalPerson.steps.details.heading";
	}
});

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

const onBack = () => {
	step.value = ExternalMembersInvitationSteps.Email;
};

const resetForm = () => {
	[email, firstName, lastName].forEach((field) => (field.value = ""));
	step.value = ExternalMembersInvitationSteps.Email;
};

const closeDialog = () => {
	isOpen.value = false;
};
</script>
