import { FileRecordResponse, FileRecordScanStatus } from "@/fileStorageApi/v3";
import { computed } from "vue";

export const useFileRecord = (fileRecord?: FileRecordResponse) => {
	const isImage = computed(() => {
		if (!fileRecord) {
			return false;
		}

		const { mimeType } = fileRecord;
		const result =
			mimeType === "image/jpeg" ||
			mimeType === "image/png" ||
			mimeType === "image/gif" ||
			mimeType === "image/svg+xml";

		return result;
	});

	const isBlocked = computed(
		() => fileRecord?.securityCheckStatus === FileRecordScanStatus.BLOCKED
	);

	const url = computed(() =>
		!isBlocked.value && fileRecord?.url ? fileRecord.url : ""
	);

	return { isImage, isBlocked, url };
};
