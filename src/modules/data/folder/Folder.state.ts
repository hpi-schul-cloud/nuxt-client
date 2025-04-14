import {
	BoardElementApiFactory,
	ContentElementType,
	ParentNodeInfo,
} from "@/serverApi/v3";
import { FileFolderElement } from "@/types/board/ContentElement";
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
			const reponse = (
				await boardElementApi.elementControllerGetElementWithParentHierarchy(
					fileFolderElementId
				)
			).data;

			if (reponse.element.type !== ContentElementType.FileFolder) {
				throw createApplicationError(404);
			}

			fileFolderElement.value = reponse.element as FileFolderElement;
			parentNodeInfos.value = reponse.parentHierarchy;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			throw createApplicationError(responseError.code);
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
