import { FileRecordParentType } from "@/fileStorageApi/v3";
import {
	convertDownloadToPreviewUrl,
	isPreviewPossible,
} from "@/utils/fileHelper";
import { useFileStorageApi } from "@feature-board-file-element";

export const usePreviewGenerator = (elementId: string) => {
	const { fileRecord, uploadFromUrl } = useFileStorageApi(
		elementId,
		FileRecordParentType.BOARDNODES
	);

	const createPreviewImage = async (
		externalImageUrl: string
	): Promise<string | undefined> => {
		await uploadFromUrl(externalImageUrl);
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
