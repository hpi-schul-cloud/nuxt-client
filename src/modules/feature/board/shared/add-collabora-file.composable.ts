import { FileRecordParentType } from "@/fileStorageApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { FileElementContentSchema } from "@/types/board/ContentElement.schema";
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

	const initializeFileElementWithCollaboraFile = async (
		cardId: string,
		element: AnyContentElement,
		assetUrl: string,
		fileExtension: string,
		fileName: string,
		caption: string
	) => {
		try {
			disableFileSelectOnMount();
			await uploadFromUrl(assetUrl, element.id, FileRecordParentType.BOARDNODES, fileName + fileExtension);

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
	};
});
