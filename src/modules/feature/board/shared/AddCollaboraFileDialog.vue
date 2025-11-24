<template>
	<Dialog
		v-model:is-dialog-open="isCollaboraFileDialogOpen"
		:message="t('components.elementTypeSelection.elements.collabora.subtitle')"
		:confirm-btn-disabled="!isFormValid"
		confirm-btn-lang-key="common.actions.create"
		data-testid="collabora-element-dialog"
		@cancel="onCancel"
		@confirm="onConfirm"
	>
		<template #content>
			<VForm id="officeFileForm" ref="form" data-testid="collabora-element-form" @submit.prevent="onConfirm">
				<!-- Attach the select to the form so that we can use focusTrap in the dialog -->
				<VSelect
					v-model="selectedDocType"
					:items="collaboraFileSelectionOptions"
					item-title="label"
					item-value="id"
					persistent-hint
					:label="t('components.cardElement.fileElement.collaboraFile.types')"
					:rules="docTypeRules"
					:menu-props="{ attach: '#officeFileForm' }"
					data-testid="collabora-element-form-type"
				/>
				<VTextField
					v-model="fileName"
					:label="t('common.labels.fileName')"
					:rules="fileNameRules"
					:placeholder="t('components.cardElement.fileElement.collaboraFile.untitled')"
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
import { useAddCollaboraFile } from "./add-collabora-file.composable";
import { Dialog } from "@ui-dialog";
import { isRequired, useInvalidCharactersValidator, useOpeningTagValidator } from "@util-validators";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

type VuetifyForm = {
	validate: () => Promise<{ valid: boolean }>;
};

const { isCollaboraFileDialogOpen, closeCollaboraFileDialog, collaboraFileSelectionOptions } = useAddCollaboraFile();
const { validateOnOpeningTag } = useOpeningTagValidator();
const { validateInvalidCharacters } = useInvalidCharactersValidator();

const { t } = useI18n();

const form = ref<VuetifyForm | null>(null);

const selectedDocType = ref<string | null>(null);
const fileName = ref<string>("");
const caption = ref<string>("");

const docTypeRules = [isRequired(t("common.validation.required2"))];
const fileNameRules = [
	(value: string) => validateOnOpeningTag(value),
	isRequired(t("common.validation.required2")),
	(value: string) => validateInvalidCharacters(value, ["/"]),
];
const captionRules = [(value: string) => validateOnOpeningTag(value)];

const passesAllRules = (value: string, rules: ((value: string) => true | string)[]): boolean =>
	rules.every((rule) => rule(value) === true);

const isFormValid = computed(() => {
	if (!selectedDocType.value) {
		return false;
	}

	const isFileNameValid = passesAllRules(fileName.value, fileNameRules);
	const isCaptionValid = passesAllRules(caption.value, captionRules);
	const isFormValid = isFileNameValid && isCaptionValid;

	return isFormValid;
});

const resetForm = () => {
	selectedDocType.value = null;
	fileName.value = "";
	caption.value = "";
};

const onCancel = () => {
	resetForm();
	closeCollaboraFileDialog();
};

const onConfirm = async () => {
	if (!form?.value) return;

	const { valid } = await form.value.validate();
	if (!valid) return;

	closeCollaboraFileDialog();
	await collaboraFileSelectionOptions
		.find((item) => item.id === selectedDocType.value)
		?.action(fileName.value, caption.value);
	resetForm();
};
</script>
