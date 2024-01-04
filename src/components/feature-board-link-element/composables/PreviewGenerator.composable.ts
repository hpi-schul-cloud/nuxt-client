import { FileRecordParentType } from "@/fileStorageApi/v3";
import {
	convertDownloadToPreviewUrl,
	isPreviewPossible,
} from "@/utils/fileHelper";
import { useSharedFileRecords } from "@feature-board-file-element";
import { computed } from "vue";

export const usePreviewGenerator = (elementId: string) => {
	const { getFileRecord, uploadFromUrl } = useSharedFileRecords();

	const fileRecord = computed(() => {
		return getFileRecord(elementId);
	});

	const createPreviewImage = async (
		externalImageUrl: string
	): Promise<string | undefined> => {
		await uploadFromUrl(
			externalImageUrl,
			elementId,
			FileRecordParentType.BOARDNODES
		);
		if (
			fileRecord.value?.value.previewStatus &&
			isPreviewPossible(fileRecord.value?.value.previewStatus)
		) {
			const imageUrl = convertDownloadToPreviewUrl(fileRecord.value.value.url);
			return imageUrl;
		}
	};

	return {
		createPreviewImage,
		uploadFromUrl,
	};
};
