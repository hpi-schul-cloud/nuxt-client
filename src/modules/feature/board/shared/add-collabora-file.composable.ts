import { ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { FileElementContentSchema } from "@/types/board/ContentElement.schema";
import { type CreateElementRequestPayload, useCardStore } from "@data-board";
import { CollaboraFileType, useFileStorageApi } from "@data-file";
import { useSharedFileSelect } from "@util-board";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

type CreateElementRequestFn = (payload: CreateElementRequestPayload) => Promise<AnyContentElement | undefined>;

export const useAddCollaboraFile = createSharedComposable(() => {
	const { t } = useI18n();
	const { disableFileSelectOnMount, resetFileSelectOnMountEnabled } = useSharedFileSelect();
	const { uploadCollaboraFile } = useFileStorageApi();
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

	const createFileElementWithCollaboraFile = async (type: CollaboraFileType, fileName: string, caption: string) => {
		const element = await createElementRequestFn.value({
			type: ContentElementType.File,
			cardId: cardId.value,
		});
		if (!element) {
			return;
		}

		try {
			disableFileSelectOnMount();
			await uploadCollaboraFile(type, element.id, fileName);
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
		setCardId,
		setCreateElementRequestFn,
	};
});
