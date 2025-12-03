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
			</VForm>
		</template>
	</Dialog>
</template>
<script setup lang="ts">
import { useAddCollaboraFile } from "../composables/add-collabora-file.composable";
import { CollaboraFileType } from "@data-file";
import { Dialog } from "@ui-dialog";
import { isRequired, useInvalidCharactersValidator, useOpeningTagValidator } from "@util-validators";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits<{
	(e: "create-collabora-file", payload: { type: CollaboraFileType; fileName: string }): void;
}>();

type VuetifyForm = {
	validate: () => Promise<{ valid: boolean }>;
};

const { isCollaboraFileDialogOpen, closeCollaboraFileDialog } = useAddCollaboraFile();
const { validateOnOpeningTag } = useOpeningTagValidator();
const { validateInvalidCharacters } = useInvalidCharactersValidator();
const { t } = useI18n();

const form = ref<VuetifyForm | null>(null);
const selectedDocType = ref<CollaboraFileType | null>(null);
const fileName = ref<string>("");

const docTypeRules = [isRequired(t("common.validation.required2"))];
const fileNameRules = [
	(value: string) => validateOnOpeningTag(value),
	isRequired(t("common.validation.required2")),
	(value: string) => validateInvalidCharacters(value, ["/"]),
];

const passesAllRules = (value: string, rules: ((value: string) => true | string)[]): boolean =>
	rules.every((rule) => rule(value) === true);

const collaboraFileSelectionOptions = [
	{
		title: t("components.elementTypeSelection.elements.collabora.option.text"),
		value: CollaboraFileType.Text,
	},
	{
		title: t("components.elementTypeSelection.elements.collabora.option.spreadsheet"),
		value: CollaboraFileType.Spreadsheet,
	},
	{
		title: t("components.elementTypeSelection.elements.collabora.option.presentation"),
		value: CollaboraFileType.Presentation,
	},
];

const isFormValid = computed(() => {
	if (!selectedDocType.value) {
		return false;
	}

	return passesAllRules(fileName.value, fileNameRules);
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
	if (!selectedDocType.value) return;

	const { valid } = await form.value.validate();
	if (!valid) return;

	emit("create-collabora-file", { type: selectedDocType.value, fileName: fileName.value });
	closeCollaboraFileDialog();
	resetForm();
};
</script>
