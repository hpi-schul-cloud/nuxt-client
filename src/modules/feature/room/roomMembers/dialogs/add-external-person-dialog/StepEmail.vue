<template>
	<VCard ref="addExternalPersonContent">
		<template #title>
			<h2 class="mt-2">
				{{ t("pages.rooms.members.dialog.addExternalPerson.steps.email.heading") }}
			</h2>
		</template>
		<template #text>
			<p>
				{{ t("pages.rooms.members.dialog.addExternalPerson.steps.email.text") }}
			</p>
			<VForm ref="emailForm" class="mt-5" data-testid="add-external-person-email-form" @submit.prevent="onConfirmEmail">
				<VTextField
					ref="emailInput"
					v-model="email"
					class="mb-4"
					:label="t('pages.rooms.members.dialog.addExternalPerson.label.email')"
					data-testid="add-external-person-email"
					:rules="[isValidEmail(t('pages.rooms.members.dialog.addExternalPerson.label.email.error'))]"
					validate-on="submit"
					@keydown.enter.prevent="onConfirmEmail()"
				/>
			</VForm>
		</template>
		<template #actions>
			<VSpacer />
			<div class="mr-4 mb-3">
				<VBtn
					ref="cancelButton"
					class="ms-auto mr-2"
					:text="t('common.actions.cancel')"
					data-testid="add-external-person-cancel-btn"
					@click="onCancel"
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
			</div>
		</template>
	</VCard>
</template>

<script setup lang="ts">
import { getFirstInvalidElement } from "./utils/form";
import { isValidEmail } from "@util-validators";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const emailForm = ref();
const email = ref<string>("");

const emit = defineEmits<{
	(e: "close"): void;
	(e: "update:email", email: string): void;
}>();

const emailInput = ref<HTMLElement>();

onMounted(() => {
	setTimeout(() => {
		emailInput.value?.focus();
	}, 0);
});

const { t } = useI18n();

const onConfirmEmail = async () => {
	const errorElement = await getFirstInvalidElement(emailForm);
	if (errorElement) {
		errorElement.focus();
		return;
	}

	emit("update:email", email.value);
};

const onCancel = () => {
	emit("close");
};
</script>
