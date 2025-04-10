import { BoardElementApiFactory } from "@/serverApi/v3";
import { FileFolderElement } from "@/types/board/ContentElement";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { computed, ref } from "vue";

type BreadCrumbs = { id: string; name: string; type: string };

export const useFolderState = () => {
	const boardElementApi = BoardElementApiFactory(undefined, "/v3", $axios);

	const fileRecords = ref<FileFolderElement[]>([]);
	const fileFolderElement = ref<FileFolderElement | undefined>(undefined);
	const breadCrumbs = ref<BreadCrumbs[]>([]);
	const isLoading = ref(false);

	const fetchFileFolderElement = async (fileFolderElementId: string) => {
		isLoading.value = true;
		try {
			const fileFolderElementMetadata = (
				await boardElementApi.elementControllerGetElementMetadata(
					fileFolderElementId
				)
			).data;

			fileFolderElement.value =
				fileFolderElementMetadata.element as FileFolderElement;
			breadCrumbs.value = fileFolderElementMetadata.path as BreadCrumbs[];
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			throw createApplicationError(responseError.code);
		} finally {
			isLoading.value = false;
		}
	};

	const isEmpty = computed(() => {
		return fileRecords.value.length === 0;
	});

	return {
		breadCrumbs,
		fileFolderElement,
		fileRecords,
		isLoading,
		isEmpty,
		fetchFileFolderElement,
	};
};
