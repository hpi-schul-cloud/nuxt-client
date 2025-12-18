<template>
	<VCard>
		<template #title>
			<h2 class="mt-2">
				{{ t("pages.rooms.members.dialog.addExternalPerson.steps.details.heading") }}
			</h2>
		</template>
		<template #text>
			<InfoAlert class="mb-4">{{
				t("pages.rooms.members.dialog.addExternalPerson.steps.details.alert", {
					applicationName: applicationNames.alert,
				})
			}}</InfoAlert>
			<p>
				{{
					t("pages.rooms.members.dialog.addExternalPerson.steps.details.text", {
						applicationName: applicationNames.text,
					})
				}}
			</p>
			<VForm ref="detailsForm" class="mt-5" data-testid="add-external-person-detail-form">
				<VTextField
					ref="emailInput"
					v-model="email"
					class="mb-4"
					:label="t('pages.rooms.members.dialog.addExternalPerson.label.email')"
					data-testid="add-external-person-email"
					readonly
				/>
				<VTextField
					ref="firstNameInput"
					v-model="firstName"
					class="mb-4"
					:label="t('pages.rooms.members.dialog.addExternalPerson.label.firstName')"
					data-testid="add-external-person-firstname"
					:rules="[
						isNonEmptyString(t('pages.rooms.members.dialog.addExternalPerson.label.firstName.error')),
						hasNoOpeningTagFollowedByString(t('common.validation.containsOpeningTag').replace(/\.$/, '')),
					]"
					@keydown.enter.prevent="onConfirmDetails"
				/>
				<VTextField
					ref="lastNameInput"
					v-model="lastName"
					:label="t('pages.rooms.members.dialog.addExternalPerson.label.lastName')"
					data-testid="add-external-person-lastname"
					:rules="[
						isNonEmptyString(t('pages.rooms.members.dialog.addExternalPerson.label.lastName.error')),
						hasNoOpeningTagFollowedByString(t('common.validation.containsOpeningTag').replace(/\.$/, '')),
					]"
					@keydown.enter.prevent="onConfirmDetails"
				/>
			</VForm>
		</template>
		<template #actions>
			<VSpacer />
			<div class="mr-4 mb-3">
				<VBtn
					ref="backButton"
					class="ms-auto mr-2"
					:text="t('common.actions.back')"
					data-testid="add-external-person-back-btn"
					@click="onBack"
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
			</div>
		</template>
	</VCard>
</template>

<script setup lang="ts">
import { getFirstInvalidElement } from "./utils/form";
import { InfoAlert } from "@ui-alert";
import { hasNoOpeningTagFollowedByString, isNonEmptyString } from "@util-validators";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

defineProps<{
	applicationNames: {
		text: string;
		alert: string;
	};
}>();

const email = defineModel("email", { type: String, required: true });
const firstName = defineModel("firstName", { type: String, required: true });
const lastName = defineModel("lastName", { type: String, required: true });

const emit = defineEmits<{
	(e: "back"): void;
	(e: "update:details", firstName: string, lastName: string): void;
	(e: "submit:invitation"): void;
}>();

const firstNameInput = ref<HTMLElement>();

onMounted(() => {
	setTimeout(() => {
		firstNameInput.value?.focus();
	}, 0);
});

const { t } = useI18n();

const detailsForm = ref();

const onConfirmDetails = async () => {
	const errorElement = await getFirstInvalidElement(detailsForm);
	if (errorElement) {
		errorElement.focus();
		return;
	}
	emit("update:details", firstName.value, lastName.value);
	emit("submit:invitation");
};

const onBack = () => {
	emit("update:details", firstName.value, lastName.value);
	emit("back");
};
</script>
