import { FileRecordParentType } from "@/fileStorageApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { FileElementContentSchema } from "@/types/board/ContentElement.schema";
import { getFileExtension } from "@/utils/fileHelper";
import { useCardStore } from "@data-board";
import { useFileStorageApi } from "@data-file";
import { useSharedFileSelect } from "@util-board";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

interface CollaboraFileSelectionOptions {
	id: string;
	label: string;
	action: (fileName: string, caption: string) => Promise<void>;
}

export enum CollaboraFileType {
	Text,
	Spreadsheet,
	Presentation,
}

export const useAddCollaboraFile = createSharedComposable(() => {
	const isCollaboraFileDialogOpen = ref<boolean>(false);
	const collaboraFileSelectionOptions = ref<Array<CollaboraFileSelectionOptions>>([]);

	const { disableFileSelectOnMount, resetFileSelectOnMountEnabled } = useSharedFileSelect();
	const { uploadFromUrl } = useFileStorageApi();
	const cardStore = useCardStore();

	const closeCollaboraFileDialog = () => {
		isCollaboraFileDialogOpen.value = false;
	};

	const openCollaboraFileDialog = () => {
		isCollaboraFileDialogOpen.value = true;
	};

	const updateFileElementCaption = async (element: AnyContentElement, caption: string) => {
		const elementContent = FileElementContentSchema.parse(element.content);

		elementContent.caption = caption;
		element.content = elementContent;
		await cardStore.updateElementRequest({ element });
	};

	const getAssetUrl = (collaboraFileType: CollaboraFileType): string | undefined => {
		const base = `${window.location.origin}/collabora`;

		if (collaboraFileType === CollaboraFileType.Text) {
			return `${base}/doc.docx`;
		}
		if (collaboraFileType === CollaboraFileType.Spreadsheet) {
			return `${base}/spreadsheet.xlsx`;
		}
		if (collaboraFileType === CollaboraFileType.Presentation) {
			return `${base}/presentation.pptx`;
		}
	};

	const initializeFileElementWithCollaboraFile = async (
		cardId: string,
		element: AnyContentElement,
		collaboraFileType: CollaboraFileType,
		fileName: string,
		caption: string
	) => {
		const assetUrl = getAssetUrl(collaboraFileType);
		if (!assetUrl) {
			return;
		}
		const fileExtension = getFileExtension(assetUrl);
		if (!fileExtension) {
			return;
		}

		try {
			disableFileSelectOnMount();
			await uploadFromUrl(assetUrl, element.id, FileRecordParentType.BOARDNODES, fileName + "." + fileExtension);

			if (caption && caption.trim().length > 0) {
				await updateFileElementCaption(element, caption.trim());
			}
		} catch {
			await cardStore.deleteElementRequest({ elementId: element.id, cardId });
		} finally {
			resetFileSelectOnMountEnabled();
			closeCollaboraFileDialog();
		}
	};

	return {
		openCollaboraFileDialog,
		closeCollaboraFileDialog,
		isCollaboraFileDialogOpen,
		collaboraFileSelectionOptions,
		initializeFileElementWithCollaboraFile,
		getAssetUrl,
	};
});
