<template>
	<VDialog
		v-model="isOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-add-external-person"
		max-width="480"
		@keydown.esc="onClose"
		@click:outside="onClose"
	>
		<VCard ref="addExternalPersonContent">
			<template #title>
				<h2 class="mt-2">{{ t("pages.rooms.members.fab.addExternalPerson") }}</h2>
			</template>
			<template #text>
				<p>
					{{ t("pages.rooms.members.dialog.addExternalPerson.text") }}
				</p>
				<VForm ref="addExternalPersonForm" class="mt-5">
					<VTextField
						ref="emailInput"
						label="E-Mail-Adresse"
						data-testid="invite-external-person-email"
						:error-messages="emailValidationMessage"
						@blur="onEmailBlur"
					/>
					<template v-if="!isAccountFound">
						<VTextField
							ref="firstNameInput"
							:label="t('common.labels.firstName')"
							data-testid="invite-external-person-firstname"
						/>
						<VTextField
							ref="lastNameInput"
							:label="t('common.labels.lastName')"
							data-testid="invite-external-person-lastname"
						/>
					</template>
				</VForm>
			</template>
			<template #actions>
				<VSpacer />
				<div class="mr-4 mb-3">
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
						data-testid="invite-participant-save-btn"
					/>
				</div>
			</template>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { isValidEmail } from "@util-validators";
import { ref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { VBtn, type VCard, VSpacer, VTextField } from "vuetify/components";

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "close"): void;
}>();

const { t } = useI18n();
const { xs } = useDisplay();

const isAccountFound = ref(true);

const emailInput = useTemplateRef("emailInput");

const emailValidationMessage = ref<string | undefined>(undefined);

const onEmailBlur = () => {
	const errorMessage = t("common.validation.email");
	const valid = isValidEmail(errorMessage)(emailInput.value?.modelValue) === true;
	emailValidationMessage.value = valid ? undefined : errorMessage;
};

const onClose = () => {
	isOpen.value = false;
	emit("close");
};
</script>
