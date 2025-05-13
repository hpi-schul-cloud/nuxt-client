import { ContentElementType, H5pElementResponse } from "@/serverApi/v3";
import type ApplicationErrorModule from "@/store/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { AnyContentElement } from "@/types/board/ContentElement";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { APPLICATION_ERROR_KEY, injectStrict } from "@/utils/inject";
import { useBoardApi, useCardStore } from "@data-board";
import { onUnmounted, Ref, ref } from "vue";

export const useH5pEditorBoardHooks = (elementId: string) => {
	const cardStore = useCardStore();
	const boardApi = useBoardApi();
	const element: Ref<H5pElementResponse | undefined> = ref();

	const applicationErrorModule: ApplicationErrorModule = injectStrict(
		APPLICATION_ERROR_KEY
	);

	const isH5pElement = (
		element: AnyContentElement
	): element is H5pElementResponse => {
		return element.type === ContentElementType.H5p;
	};

	const onCreate = async (): Promise<void> => {
		const response =
			await boardApi.getElementWithParentHierarchyCall(elementId);
		const elementData: AnyContentElement = response.data.element;

		if (!isH5pElement(elementData)) {
			applicationErrorModule.setError(
				createApplicationError(HttpStatusCode.NotFound)
			);

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
