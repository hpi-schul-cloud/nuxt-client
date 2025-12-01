<template>
	<Dialog
		v-model:is-dialog-open="isCollaboraFileDialogOpen"
		:message="t('pages.folder.add-collabora-file-dialog.title')"
		:confirm-btn-disabled="!isFormValid"
		confirm-btn-lang-key="common.actions.create"
		data-testid="collabora-file-dialog"
		@cancel="onCancel"
		@confirm="onConfirm"
	>
		<template #content>
			<VForm id="collaboraFileForm" ref="form" data-testid="collabora-file-form" @submit.prevent="onConfirm">
				<!-- Attach the select to the form so that we can use focusTrap in the dialog -->
				<VSelect
					v-model="selectedDocType"
					:items="collaboraFileSelectionOptions"
					item-title="label"
					item-value="id"
					persistent-hint
					:label="t('pages.folder.add-collabora-file-dialog.doc-types')"
					:rules="docTypeRules"
					:menu-props="{ attach: '#collaboraFileForm' }"
					data-testid="collabora-file-type"
				/>
				<VTextField
					v-model="fileName"
					:label="t('common.labels.fileName')"
					:rules="fileNameRules"
					:placeholder="t('pages.folder.add-collabora-file-dialog.untitled-file')"
					data-testid="collabora-file-name"
				/>
			</VForm>
		</template>
	</Dialog>
</template>
<script setup lang="ts">
import { useAddCollaboraFile } from "./add-collabora-file.composable";
import { FileRecordParentType } from "@/fileStorageApi/v3";
import { CollaboraFileType } from "@/types/enum/Collabora";
import { FileRecord } from "@/types/file/File";
import { getFileExtension } from "@/utils/fileHelper";
import { useFileStorageApi } from "@data-file";
import { Dialog } from "@ui-dialog";
import { getCollaboraAssetUrl } from "@util-collabora";
import { isRequired, useInvalidCharactersValidator, useOpeningTagValidator } from "@util-validators";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const emit = defineEmits<{
	(collaboraFileAdded: "collabora-file-added", newFile: FileRecord): void;
}>();

type VuetifyForm = {
	validate: () => Promise<{ valid: boolean }>;
};

const { uploadFromUrl } = useFileStorageApi();

const { isCollaboraFileDialogOpen, closeCollaboraFileDialog } = useAddCollaboraFile();
const { validateOnOpeningTag } = useOpeningTagValidator();
const { validateInvalidCharacters } = useInvalidCharactersValidator();

const { t } = useI18n();

const form = ref<VuetifyForm | null>(null);

const selectedDocType = ref<string | null>(null);
const fileName = ref<string>("");

const uploadCollaboraFile = async (type: CollaboraFileType, folderId: string, fileName: string) => {
	const assetUrl = getCollaboraAssetUrl(type);
	const fileExtension = getFileExtension(assetUrl);
	const fullFileName = `${fileName}.${fileExtension}`;

	const fileRecord = await uploadFromUrl(assetUrl, folderId, FileRecordParentType.BOARDNODES, fullFileName);

	closeCollaboraFileDialog();

	return fileRecord;
};

const collaboraFileSelectionOptions = [
	{
		id: "1",
		label: t("pages.folder.add-collabora-file-dialog.option.text"),
		action: async (folderId: string, fileName: string) =>
			uploadCollaboraFile(CollaboraFileType.Text, folderId, fileName),
	},
	{
		id: "2",
		label: t("pages.folder.add-collabora-file-dialog.option.spreadsheet"),
		action: async (folderId: string, fileName: string) =>
			uploadCollaboraFile(CollaboraFileType.Spreadsheet, folderId, fileName),
	},
	{
		id: "3",
		label: t("pages.folder.add-collabora-file-dialog.option.presentation"),
		action: async (folderId: string, fileName: string) =>
			uploadCollaboraFile(CollaboraFileType.Presentation, folderId, fileName),
	},
];

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
	const newFile = await collaboraFileSelectionOptions
		.find((item) => item.id === selectedDocType.value)
		?.action(props.folderId, fileName.value);

	if (newFile) {
		emit("collabora-file-added", newFile);
	}
	resetForm();
};
</script>
