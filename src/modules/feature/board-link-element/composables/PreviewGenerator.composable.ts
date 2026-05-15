import { convertDownloadToPreviewUrl, isPreviewPossible } from "@/utils/fileHelper";
import { FileRecordParentType } from "@api-file-storage";
import { useFileStorageApi } from "@data-file";

export interface PreviewImageResult {
	fileRecordId: string;
	url: string;
}

export const usePreviewGenerator = (elementId: string) => {
	const { uploadFromUrl } = useFileStorageApi();

	const createPreviewImage = async (externalImageUrl: string): Promise<PreviewImageResult | undefined> => {
		const uploadedFileRecord = await uploadFromUrl(externalImageUrl, elementId, FileRecordParentType.BOARDNODES);

		if (uploadedFileRecord?.previewStatus && isPreviewPossible(uploadedFileRecord.previewStatus)) {
			const imageUrl = convertDownloadToPreviewUrl(uploadedFileRecord.url);
			return {
				fileRecordId: uploadedFileRecord.id,
				url: imageUrl,
			};
		}
	};

	return {
		createPreviewImage,
		uploadFromUrl,
	};
};
