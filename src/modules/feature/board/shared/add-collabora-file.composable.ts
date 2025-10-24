import { FileRecordParentType } from "@/fileStorageApi/v3";
import { ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { FileElementContentSchema } from "@/types/board/ContentElement.schema";
import { getFileExtension } from "@/utils/fileHelper";
import { type CreateElementRequestPayload, useCardStore } from "@data-board";
import { useFileStorageApi } from "@data-file";
import { useSharedFileSelect } from "@util-board";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export enum CollaboraFileType {
	Text,
	Spreadsheet,
	Presentation,
}

type CreateElementRequestFn = (payload: CreateElementRequestPayload) => Promise<AnyContentElement | undefined>;

export const useAddCollaboraFile = createSharedComposable(() => {
	const { t } = useI18n();
	const { disableFileSelectOnMount, resetFileSelectOnMountEnabled } = useSharedFileSelect();
	const { uploadFromUrl } = useFileStorageApi();
	const cardStore = useCardStore();

	const cardId = ref("");
	const createElementRequestFn = ref<CreateElementRequestFn>(() => Promise.resolve(undefined));
	const isCollaboraFileDialogOpen = ref<boolean>(false);

	const closeCollaboraFileDialog = () => {
		isCollaboraFileDialogOpen.value = false;
	};

	const openCollaboraFileDialog = () => {
		isCollaboraFileDialogOpen.value = true;
	};

	const setCardId = (id: string) => {
		cardId.value = id;
	};

	const setCreateElementRequestFn = (fn: CreateElementRequestFn) => {
		createElementRequestFn.value = fn;
	};

	const updateFileElementCaption = async (element: AnyContentElement, caption: string) => {
		if (!(caption && caption.trim().length > 0)) {
			return;
		}

		const elementContent = FileElementContentSchema.parse(element.content);
		elementContent.caption = caption;
		element.content = elementContent;
		await cardStore.updateElementRequest({ element });
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

	const createFileElementWithCollaboraFile = async (type: CollaboraFileType, fileName: string, caption: string) => {
		const element = await createElementRequestFn.value({
			type: ContentElementType.File,
			cardId: cardId.value,
		});
		if (!element) {
			return;
		}

		const assetUrl = getAssetUrl(type);
		const fileExtension = getFileExtension(assetUrl);

		try {
			disableFileSelectOnMount();
			const fullFileName = fileExtension ? `${fileName}.${fileExtension}` : fileName;
			await uploadFromUrl(assetUrl, element.id, FileRecordParentType.BOARDNODES, fullFileName);
			await updateFileElementCaption(element, caption.trim());
		} catch {
			await cardStore.deleteElementRequest({ elementId: element.id, cardId: cardId.value });
		} finally {
			resetFileSelectOnMountEnabled();
			closeCollaboraFileDialog();
		}
	};

	const collaboraFileSelectionOptions = [
		{
			id: "1",
			label: t("components.elementTypeSelection.elements.collabora.option.text"),
			action: async (fileName: string, caption: string) =>
				createFileElementWithCollaboraFile(CollaboraFileType.Text, fileName, caption),
		},
		{
			id: "2",
			label: t("components.elementTypeSelection.elements.collabora.option.spreadsheet"),
			action: async (fileName: string, caption: string) =>
				createFileElementWithCollaboraFile(CollaboraFileType.Spreadsheet, fileName, caption),
		},
		{
			id: "3",
			label: t("components.elementTypeSelection.elements.collabora.option.presentation"),
			action: async (fileName: string, caption: string) =>
				createFileElementWithCollaboraFile(CollaboraFileType.Presentation, fileName, caption),
		},
	];

	return {
		cardId,
		collaboraFileSelectionOptions,
		isCollaboraFileDialogOpen,
		openCollaboraFileDialog,
		closeCollaboraFileDialog,
		getAssetUrl,
		setCardId,
		setCreateElementRequestFn,
	};
});
