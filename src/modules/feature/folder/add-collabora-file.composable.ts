import { FileRecordParentType, FileRecordResponse } from "@/fileStorageApi/v3";
import { CollaboraFileType } from "@/types/enum/Collabora";
import { getFileExtension } from "@/utils/fileHelper";
import { useFileStorageApi } from "@data-file";
import { getCollaboraAssetUrl } from "@util-collabora";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useAddCollaboraFile = createSharedComposable(() => {
	const { t } = useI18n();
	const { uploadFromUrl } = useFileStorageApi();

	const isCollaboraFileDialogOpen = ref<boolean>(false);
	const latestAddedCollaboraFile = ref<FileRecordResponse | null>(null);

	const closeCollaboraFileDialog = () => {
		isCollaboraFileDialogOpen.value = false;
	};

	const openCollaboraFileDialog = () => {
		isCollaboraFileDialogOpen.value = true;
	};

	const uploadCollaboraFile = async (type: CollaboraFileType, folderId: string, fileName: string) => {
		const assetUrl = getCollaboraAssetUrl(type);
		const fileExtension = getFileExtension(assetUrl);
		const fullFileName = `${fileName}.${fileExtension}`;

		const fileRecordResponse = await uploadFromUrl(assetUrl, folderId, FileRecordParentType.BOARDNODES, fullFileName);
		latestAddedCollaboraFile.value = fileRecordResponse ?? null;

		closeCollaboraFileDialog();
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

	return {
		collaboraFileSelectionOptions,
		isCollaboraFileDialogOpen,
		openCollaboraFileDialog,
		closeCollaboraFileDialog,
		latestAddedCollaboraFile,
	};
});
