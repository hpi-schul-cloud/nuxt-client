<template>
	<Dialog
		v-model:is-dialog-open="isCollaboraDialogOpen"
		:message="t('components.elementTypeSelection.dialog.title')"
		:confirm-btn-lang-key="t('common.actions.create')"
		data-testid="collabora-element-dialog"
		@cancel="onCancel"
		@confirm="onConfirm"
	>
		<template #content>
			<VForm
				id="createCollaboraFileForm"
				ref="form"
				data-testid="collabora-element-form"
				@submit.prevent.stop="onConfirm"
			>
				<!-- Attach the select to the form so that we can use focusTrap in the dialog -->
				<VSelect
					v-model="selectedDocType"
					:items="collaboraElementTypeOptions"
					item-title="label"
					item-value="id"
					persistent-hint
					:label="t('Dokumententyp')"
					:rules="docTypeRules"
					:menu-props="{ attach: '#createCollaboraFileForm' }"
					data-testid="collabora-element-form-type"
				/>
				<VTextField
					v-model="fileName"
					:label="t('Name des Dokuments')"
					:rules="fileNameRules"
					:placeholder="t('Unbenanntes Dokument')"
					data-testid="collabora-element-form-filename"
				/>
				<VTextarea
					v-model="caption"
					rows="1"
					:rules="captionRules"
					auto-grow
					:label="$t('components.cardElement.fileElement.caption')"
					data-testid="collabora-element-form-caption"
				/>
			</VForm>
		</template>
	</Dialog>
</template>
<script setup lang="ts">
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { useOpeningTagValidator } from "@/utils/validation";
import { Dialog } from "@ui-dialog";
import { isRequired } from "@util-validators";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

type VuetifyForm = {
	validate: () => Promise<{ valid: boolean }>;
};

const { isCollaboraDialogOpen, closeCollaboraDialog, collaboraElementTypeOptions } = useSharedElementTypeSelection();
const { validateOnOpeningTag } = useOpeningTagValidator();

const { t } = useI18n();

const form = ref<VuetifyForm | null>(null);

const selectedDocType = ref<string | null>(null);
const fileName = ref<string>("");
const caption = ref<string>("");

const docTypeRules = [isRequired(t("common.validation.required2"))];
const fileNameRules = [(value: string) => validateOnOpeningTag(value), isRequired(t("common.validation.required2"))];
const captionRules = [(value: string) => validateOnOpeningTag(value)];

const resetForm = () => {
	selectedDocType.value = null;
	fileName.value = "";
	caption.value = "";
};

const onCancel = () => {
	resetForm();
	closeCollaboraDialog();
};

const onConfirm = async () => {
	if (form?.value) {
		const { valid } = await form.value.validate();
		if (valid) {
			await collaboraElementTypeOptions.value
				.find((item) => item.id === selectedDocType.value)
				?.action(fileName.value, caption.value);
			resetForm();
		}
	}
};
</script>
