import { ContentElementType, H5pElementResponse } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { AnyContentElement } from "@/types/board/ContentElement";
import { useAppStore } from "@data-app";
import { useBoardApi, useCardStore } from "@data-board";
import { onUnmounted, Ref, ref } from "vue";

export const useH5pEditorBoardHooks = (elementId: string) => {
	const cardStore = useCardStore();
	const boardApi = useBoardApi();
	const element: Ref<H5pElementResponse | undefined> = ref();

	const isH5pElement = (element: AnyContentElement): element is H5pElementResponse =>
		element.type === ContentElementType.H5p;

	const onCreate = async (): Promise<void> => {
		const response = await boardApi.getElementWithParentHierarchyCall(elementId);
		const elementData: AnyContentElement = response.data.element;

		if (!isH5pElement(elementData)) {
			useAppStore().handleApplicationError(HttpStatusCode.NotFound);
			return;
		}

		element.value = elementData;
	};

	const afterSave = async (contentId: string): Promise<void> => {
		if (!element.value) {
			throw new Error("Element not found");
		}

		element.value.content.contentId = contentId;

		await cardStore.updateElementRequest({
			element: element.value,
		});
	};

	onUnmounted(() => {
		cardStore.disconnectSocketRequest();
	});

	return {
		onCreate,
		afterSave,
		element,
	};
};
