import { computed } from "vue";

export const useFileType = (mimeType: string) => {
	const isImage = computed(
		() =>
			mimeType === "image/jpeg" ||
			mimeType === "image/png" ||
			mimeType === "image/gif" ||
			mimeType === "image/svg+xml"
	);

	return { isImage };
};
