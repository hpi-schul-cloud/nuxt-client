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
						v-model="email"
						label="E-Mail-Adresse"
						autofocus
						data-testid="invite-external-person-email"
						:rules="[isValidEmail(t('common.validation.email'))]"
					/>
					<template v-if="isAdditionalInfoNeeded">
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
						data-testid="add-external-person-cancel-btn"
						@click="onClose"
					/>
					<VBtn
						ref="addButton"
						:disabled="!isEmailValid"
						class="ms-auto"
						color="primary"
						variant="flat"
						:text="t('pages.rooms.members.dialog.addExternalPerson.button.add')"
						data-testid="add-external-person-add-btn"
						@click="onAddButtonClick"
					/>
				</div>
			</template>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { useSafeFocusTrap } from "@/composables/safeFocusTrap";
import { ExternalMemberCheckStatus } from "@data-room";
import { isValidEmail } from "@util-validators";
import { computed, ModelRef, ref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { VBtn, type VCard, VSpacer, VTextField } from "vuetify/components";

const isOpen: ModelRef<boolean> = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

const props = defineProps<{
	memberStatus: ExternalMemberCheckStatus | undefined;
}>();

const emit = defineEmits<{
	(e: "close"): void;
	(e: "update:mail", email: string): void;
}>();

const { t } = useI18n();
const { xs } = useDisplay();
const emailInput = useTemplateRef("emailInput");
const email = ref<string>("");

const isAdditionalInfoNeeded = computed(() => props?.memberStatus === ExternalMemberCheckStatus.ACCOUNT_NOT_FOUND);
const isEmailValid = computed(() => isValidEmail("")(email.value) === true);
const addExternalPersonContent = ref<VCard>();

useSafeFocusTrap(isOpen, addExternalPersonContent, {
	initialFocus: emailInput.value?.$el,
	immediate: true,
});

const onAddButtonClick = async () => {
	emit("update:mail", email.value);
	isOpen.value = false;
};

const onClose = () => {
	isOpen.value = false;
	emit("close");
};
</script>
