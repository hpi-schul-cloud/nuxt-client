import { FileRecordParentType } from "@/fileStorageApi/v3";
import {
	convertDownloadToPreviewUrl,
	isPreviewPossible,
} from "@/utils/fileHelper";
import { useFileStorageApi } from "@feature-board-file-element";
import { computed } from "vue";

export const usePreviewGenerator = (elementId: string) => {
	const { getFileRecordsByParentId, uploadFromUrl } = useFileStorageApi();

	const createPreviewImage = async (
		externalImageUrl: string
	): Promise<string | undefined> => {
		await uploadFromUrl(
			externalImageUrl,
			elementId,
			FileRecordParentType.BOARDNODES
		);

		const fileRecord = computed(() => getFileRecordsByParentId(elementId)[0]);

		if (
			fileRecord.value?.previewStatus &&
			isPreviewPossible(fileRecord.value?.previewStatus)
		) {
			const imageUrl = convertDownloadToPreviewUrl(fileRecord.value.url);

			return imageUrl;
		}
	};

	return {
		createPreviewImage,
		uploadFromUrl,
	};
};
