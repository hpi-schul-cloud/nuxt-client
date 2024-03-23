import { FileRecordParentType } from "@/fileStorageApi/v3";
import {
	convertDownloadToPreviewUrl,
	isPreviewPossible,
} from "@/utils/fileHelper";
import { useFileStorageApi } from "@/modules/feature/board-file-element";

export const usePreviewGenerator = (elementId: string) => {
	const { getFileRecord, uploadFromUrl } = useFileStorageApi();

	const createPreviewImage = async (
		externalImageUrl: string
	): Promise<string | undefined> => {
		await uploadFromUrl(
			externalImageUrl,
			elementId,
			FileRecordParentType.BOARDNODES
		);

		const fileRecord = getFileRecord(elementId);

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
