import { convertDownloadToPreviewUrl, isPreviewPossible } from "@/utils/fileHelper";
import { FileRecordParentType } from "@api-file-storage";
import { useFileStorageApi } from "@data-file";
import { computed } from "vue";

export interface PreviewImageResult {
	fileRecordId: string;
	url: string;
}

export const usePreviewGenerator = (elementId: string) => {
	const { getFileRecordsByParentId, uploadFromUrl } = useFileStorageApi();

	const createPreviewImage = async (externalImageUrl: string): Promise<PreviewImageResult | undefined> => {
		await uploadFromUrl(externalImageUrl, elementId, FileRecordParentType.BOARDNODES);

		const fileRecord = computed(() => getFileRecordsByParentId(elementId)[0]);

		if (fileRecord.value?.previewStatus && isPreviewPossible(fileRecord.value?.previewStatus)) {
			const imageUrl = convertDownloadToPreviewUrl(fileRecord.value.url);

			return {
				fileRecordId: fileRecord.value.id,
				url: imageUrl,
			};
		}
	};

	return {
		createPreviewImage,
		uploadFromUrl,
	};
};
