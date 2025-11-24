import { FileRecordParentType } from "@/fileStorageApi/v3";
import { CollaboraFileType } from "@/types/enum/Collabora";
import { getCollaboraAssetUrl } from "@/utils/collaboraHelper";
import { getFileExtension } from "@/utils/fileHelper";
import { useFileStorageApi } from "@data-file";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useAddCollaboraFile = createSharedComposable(() => {
	const { t } = useI18n();
	const { uploadFromUrl } = useFileStorageApi();

	const isCollaboraFileDialogOpen = ref<boolean>(false);

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

		await uploadFromUrl(assetUrl, folderId, FileRecordParentType.BOARDNODES, fullFileName);

		closeCollaboraFileDialog();
	};

	const collaboraFileSelectionOptions = [
		{
			id: "1",
			label: t("components.elementTypeSelection.elements.collabora.option.text"),
			action: async (folderId: string, fileName: string) =>
				uploadCollaboraFile(CollaboraFileType.Text, folderId, fileName),
		},
		{
			id: "2",
			label: t("components.elementTypeSelection.elements.collabora.option.spreadsheet"),
			action: async (folderId: string, fileName: string) =>
				uploadCollaboraFile(CollaboraFileType.Spreadsheet, folderId, fileName),
		},
		{
			id: "3",
			label: t("components.elementTypeSelection.elements.collabora.option.presentation"),
			action: async (folderId: string, fileName: string) =>
				uploadCollaboraFile(CollaboraFileType.Presentation, folderId, fileName),
		},
	];

	return {
		collaboraFileSelectionOptions,
		isCollaboraFileDialogOpen,
		openCollaboraFileDialog,
		closeCollaboraFileDialog,
	};
});
