<template>
	<Dialog
		v-model:is-dialog-open="isCollaboraFileDialogOpen"
		:message="t('feature.collabora.add-collabora-file-dialog.title')"
		:confirm-btn-disabled="!isFormValid"
		confirm-btn-lang-key="common.actions.create"
		data-testid="collabora-file-dialog"
		@cancel="onCancel"
		@confirm="onConfirm"
		@after-leave="resetForm"
		@click.stop
		@keydown.enter.stop
	>
		<template #content>
			<VForm id="collaboraFileForm" ref="form" data-testid="collabora-file-form" @submit.prevent="onConfirm">
				<!-- Attach the select to the form so that we can use focusTrap in the dialog -->
				<VSelect
					v-model="selectedDocType"
					:items="collaboraFileSelectionOptions"
					persistent-hint
					:label="t('feature.collabora.add-collabora-file-dialog.doc-types')"
					:rules="docTypeRules"
					:menu-props="{ attach: '#collaboraFileForm' }"
					data-testid="collabora-file-form-type"
				/>
				<VTextField
					v-model="fileName"
					:label="t('common.labels.fileName')"
					:rules="fileNameRules"
					:placeholder="t('feature.collabora.add-collabora-file-dialog.untitled-file')"
					data-testid="collabora-file-form-filename"
				/>
			</VForm>
		</template>
	</Dialog>
</template>
<script setup lang="ts">
import { useAddCollaboraFile } from "../composables/add-collabora-file.composable";
import type { CreateCollaboraFilePayload } from "../types/collabora-file";
import { CollaboraFileType } from "@data-file";
import { Dialog } from "@ui-dialog";
import { isRequired, useInvalidCharactersValidator, useOpeningTagValidator } from "@util-validators";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits<{
	(e: "create-collabora-file", payload: CreateCollaboraFilePayload): void;
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
		title: t("feature.collabora.add-collabora-file-dialog.option.text"),
		value: CollaboraFileType.Text,
	},
	{
		title: t("feature.collabora.add-collabora-file-dialog.option.spreadsheet"),
		value: CollaboraFileType.Spreadsheet,
	},
	{
		title: t("feature.collabora.add-collabora-file-dialog.option.presentation"),
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
	closeCollaboraFileDialog();
};

const onConfirm = async () => {
	if (!form?.value) return;
	if (!selectedDocType.value) return;

	const { valid } = await form.value.validate();
	if (!valid) return;

	emit("create-collabora-file", { type: selectedDocType.value, fileName: fileName.value });
	closeCollaboraFileDialog();
};
</script>
