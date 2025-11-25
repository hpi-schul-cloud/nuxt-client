<template>
	<Dialog
		v-model:is-dialog-open="isCollaboraFileDialogOpen"
		:message="t('pages.folder.add-collabora-file-dialog.title')"
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
					:label="t('pages.folder.add-collabora-file-dialog.doc-types')"
					:rules="docTypeRules"
					:menu-props="{ attach: '#officeFileForm' }"
					data-testid="collabora-element-form-type"
				/>
				<VTextField
					v-model="fileName"
					:label="t('common.labels.fileName')"
					:rules="fileNameRules"
					:placeholder="t('pages.folder.add-collabora-file-dialog.untitled-file')"
					data-testid="collabora-element-form-filename"
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

const props = defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

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

const docTypeRules = [isRequired(t("common.validation.required2"))];

const fileNameRules = [
	(value: string) => validateOnOpeningTag(value),
	isRequired(t("common.validation.required2")),
	(value: string) => validateInvalidCharacters(value, ["/"]),
];

const passesAllRules = (value: string, rules: ((value: string) => true | string)[]): boolean =>
	rules.every((rule) => rule(value) === true);

const isFormValid = computed(() => {
	if (!selectedDocType.value) {
		return false;
	}

	const isFileNameValid = passesAllRules(fileName.value, fileNameRules);

	return isFileNameValid;
});

const resetForm = () => {
	selectedDocType.value = null;
	fileName.value = "";
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
		?.action(props.folderId, fileName.value);
	resetForm();
};
</script>
