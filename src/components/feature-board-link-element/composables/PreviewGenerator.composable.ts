import { FileRecordParentType, PreviewWidth } from "@/fileStorageApi/v3";
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
		console.log("fileRecord.value", fileRecord.value); // WIP: remove
		if (fileRecord.value?.previewStatus) {
			const imageUrl = convertDownloadToPreviewUrl(
				fileRecord.value.url,
				PreviewWidth._500
			);
			console.log("imageUrl2", imageUrl); // WIP: remove
			return imageUrl;
		}
	};

	return {
		createPreviewImage,
		uploadFromUrl,
	};
};
