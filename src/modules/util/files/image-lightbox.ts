import { FileRecord } from "@/types/file/File";
import {
	convertDownloadToPreviewUrl,
	isPreviewPossible,
} from "@/utils/fileHelper";
import { LightBoxOptions, useLightBox } from "@ui-light-box";

export const openImageInLightbox = (file: FileRecord, altText: string) => {
	if (!isPreviewPossible(file.previewStatus)) {
		throw new Error("Opening image in lightbox is not possible");
	}

	const previewUrl = convertDownloadToPreviewUrl(file.url);

	const options: LightBoxOptions = {
		downloadUrl: file.url,
		previewUrl: previewUrl,
		alt: altText,
		name: file.name,
	};

	const { open } = useLightBox();

	open(options);
};
