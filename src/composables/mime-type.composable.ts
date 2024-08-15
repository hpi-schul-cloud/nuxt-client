import { computed } from "vue";

export const useMimeType = (mimeType: string) => {
	const isPdfMimeType = computed(() => {
		return mimeType === "application/pdf";
	});

	const isAudioMimeType = computed(() => {
		return mimeType.startsWith("audio/");
	});

	const isVideoMimeType = computed(() => {
		return (
			mimeType.startsWith("video/") ||
			mimeType === "application/x-mpegURL" ||
			mimeType === "application/vnd.ms-asf" ||
			mimeType === "application/ogg"
		);
	});

	return {
		isPdfMimeType,
		isAudioMimeType,
		isVideoMimeType,
	};
};
