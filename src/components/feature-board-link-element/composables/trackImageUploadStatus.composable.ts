import { FileRecordParentType } from "@/fileStorageApi/v3";
import {
	convertDownloadToPreviewUrl,
	isPreviewPossible,
} from "@/utils/fileHelper";
import { useFileStorageApi } from "@feature-board-file-element";
import { ref } from "vue";

type Options = {
	baseDuration: number;
	increaseDuration: number;
	maxRetries: number;
};

export const useTrackImageUploadStatus = (
	elementId: string,
	options: Options = {
		baseDuration: 1000,
		increaseDuration: 100,
		maxRetries: 10,
	}
) => {
	const retries = ref(0);

	const { fetchFile, fileRecord } = useFileStorageApi(
		elementId,
		FileRecordParentType.BOARDNODES
	);

	const sleep = () => {
		return new Promise((resolve) =>
			setTimeout(
				resolve,
				options.baseDuration + retries.value * options.increaseDuration
			)
		);
	};

	const isImagePreviewable = async () => {
		while (retries.value < options.maxRetries) {
			await sleep();
			await fetchFile();

			if (
				fileRecord?.value &&
				isPreviewPossible(fileRecord.value?.previewStatus)
			) {
				return true;
			}
			retries.value++;
		}
		return false;
	};

	const trackImageUploadStatus = async (): Promise<string | undefined> => {
		const hasPreview = await isImagePreviewable();
		if (hasPreview && fileRecord.value) {
			const imageUrl = convertDownloadToPreviewUrl(fileRecord.value.url);
			return imageUrl;
		}
	};

	return {
		trackImageUploadStatus,
	};
};
