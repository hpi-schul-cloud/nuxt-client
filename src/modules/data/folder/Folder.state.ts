import {
	BoardElementApiFactory,
	ContentElementType,
	ParentNodeInfo,
} from "@/serverApi/v3";
import {
	AnyContentElement,
	FileFolderElement,
} from "@/types/board/ContentElement";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { computed, ref } from "vue";

export const useFolderState = () => {
	const boardElementApi = BoardElementApiFactory(undefined, "/v3", $axios);

	const fileFolderElement = ref<FileFolderElement | undefined>(undefined);
	const parentNodeInfos = ref<ParentNodeInfo[]>([]);
	const isLoading = ref(false);

	const fetchFileFolderElement = async (fileFolderElementId: string) => {
		isLoading.value = true;
		try {
			const reponse =
				await boardElementApi.elementControllerGetElementWithParentHierarchy(
					fileFolderElementId
				);

			fileFolderElement.value = castToFileFolderElement(reponse.data.element);
			parentNodeInfos.value = reponse.data.parentHierarchy;
		} catch (error) {
			throwApplicationError(error);
		} finally {
			isLoading.value = false;
		}
	};

	const isEmpty = computed(() => {
		return true;
	});

	return {
		parentNodeInfos,
		fileFolderElement,
		isLoading,
		isEmpty,
		fetchFileFolderElement,
	};
};

const castToFileFolderElement = (
	element: AnyContentElement
): FileFolderElement => {
	if (element.type === ContentElementType.FileFolder) {
		return element as FileFolderElement;
	} else {
		throw createApplicationError(404);
	}
};

const throwApplicationError = (error: unknown): never => {
	const responseError = mapAxiosErrorToResponseError(error);

	throw createApplicationError(responseError.code);
};
