import { FileRecordParentType } from "@/fileStorageApi/v3";
import { getFileExtension } from "@/utils/fileHelper";
import { useFileStorageApi } from "@data-file";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export enum CollaboraFileType {
	Text,
	Spreadsheet,
	Presentation,
}

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

	const folderId = ref("");
	const setFolderId = (folderIdParam: string) => {
		folderId.value = folderIdParam;
	};

	const getAssetUrl = (collaboraFileType: CollaboraFileType): string => {
		const base = `${window.location.origin}/collabora`;

		if (collaboraFileType === CollaboraFileType.Text) {
			return `${base}/doc.docx`;
		}
		if (collaboraFileType === CollaboraFileType.Spreadsheet) {
			return `${base}/spreadsheet.xlsx`;
		}

		return `${base}/presentation.pptx`;
	};

	const uploadCollaboraFile = async (type: CollaboraFileType, fileName: string) => {
		const assetUrl = getAssetUrl(type);
		const fileExtension = getFileExtension(assetUrl);

		try {
			const fullFileName = fileExtension ? `${fileName}.${fileExtension}` : fileName;
			await uploadFromUrl(assetUrl, folderId.value, FileRecordParentType.BOARDNODES, fullFileName);
		} catch {
			// Handle error appropriately
		} finally {
			closeCollaboraFileDialog();
		}
	};

	const collaboraFileSelectionOptions = [
		{
			id: "1",
			label: t("components.elementTypeSelection.elements.collabora.option.text"),
			action: async (fileName: string) => uploadCollaboraFile(CollaboraFileType.Text, fileName),
		},
		{
			id: "2",
			label: t("components.elementTypeSelection.elements.collabora.option.spreadsheet"),
			action: async (fileName: string) => uploadCollaboraFile(CollaboraFileType.Spreadsheet, fileName),
		},
		{
			id: "3",
			label: t("components.elementTypeSelection.elements.collabora.option.presentation"),
			action: async (fileName: string) => uploadCollaboraFile(CollaboraFileType.Presentation, fileName),
		},
	];

	return {
		collaboraFileSelectionOptions,
		isCollaboraFileDialogOpen,
		openCollaboraFileDialog,
		closeCollaboraFileDialog,
		getAssetUrl,
		setFolderId,
	};
});
