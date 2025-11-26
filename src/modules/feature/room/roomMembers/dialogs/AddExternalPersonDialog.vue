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
				<h2 class="mt-2">Externe Person hinzufügen</h2>
			</template>
			<template #text>
				<p>
					Bitte die E-Mail-Adresse der schulfremden bzw. Externen Person angeben, die zum Raum hinzugefügt werden soll.
				</p>
				<VForm ref="inviteMembersForm" class="mt-5">
					<VTextField
						ref="emailInput"
						label="E-Mail-Adresse"
						data-testid="invite-participant-description-input"
						:rules="[isValidEmail(t('common.validation.email'))]"
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
						data-testid="invite-participant-cancel-btn"
						@click="onClose"
					/>
					<VBtn
						ref="addButton"
						class="ms-auto"
						color="primary"
						variant="flat"
						text="Zum Raum hinzufügen"
						data-testid="invite-participant-save-btn"
					/>
				</div>
			</template>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { isValidEmail } from "@util-validators";
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

const onClose = () => {
	isOpen.value = false;
	emit("close");
};
</script>
