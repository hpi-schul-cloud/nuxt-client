<template>
	<Dialog
		v-model:is-dialog-open="isCollaboraDialogOpen"
		:message="t('components.elementTypeSelection.dialog.title')"
		:confirm-btn-lang-key="t('common.actions.create')"
		data-testid="collabora-element-type-selection"
		@cancel="closeCollaboraDialog"
		@confirm="onConfirm"
	>
		<template #content>
			<VForm ref="form" validate-on="submit" @submit.prevent.stop="onConfirm">
				<VSelect
					v-model="selectedDocType"
					:items="collaboraElementTypeOptions"
					item-title="label"
					item-value="id"
					persistent-hint
					:label="t('Dokumententyp')"
					:rules="docTypeRules"
				/>
				<VTextField
					v-model="fileName"
					:label="t('Name des Dokuments')"
					:rules="fileNameRules"
					:placeholder="t('Unbenanntes Dokument')"
				/>
			</VForm>
		</template>
	</Dialog>
</template>
<script setup lang="ts">
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { Dialog } from "@ui-dialog";
import { isRequired } from "@util-validators";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

type VuetifyFormApi = {
	validate: () => { valid: boolean };
	resetValidation: () => void;
};

const { isCollaboraDialogOpen, closeCollaboraDialog, collaboraElementTypeOptions } = useSharedElementTypeSelection();

const { t } = useI18n();

const form = ref<VuetifyFormApi | null>(null);

const selectedDocType = ref<string | null>(null);
const fileName = ref<string>("");

const docTypeRules = [isRequired(t("common.validation.required2"))];
const fileNameRules = [isRequired(t("common.validation.required2"))];

const onConfirm = async () => {
	if (form?.value) {
		const { valid } = await form.value.validate();
		if (valid) {
			collaboraElementTypeOptions.value.find((item) => item.id === selectedDocType.value)?.action(fileName.value);
		}
	}
};
</script>
