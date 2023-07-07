import { FileRecordResponse, FileRecordScanStatus } from "@/fileStorageApi/v3";
import { Ref, computed } from "vue";

export const useFileRecord = (
	fileRecord: Ref<FileRecordResponse | undefined>
) => {
	const isImage = computed(() => {
		if (!fileRecord.value) {
			return false;
		}

		const { mimeType } = fileRecord.value;
		const result =
			mimeType === "image/jpeg" ||
			mimeType === "image/png" ||
			mimeType === "image/gif" ||
			mimeType === "image/svg+xml";

		return result;
	});

	const isBlockedByVirusScan = computed(
		() => fileRecord.value?.securityCheckStatus === FileRecordScanStatus.BLOCKED
	);

	const url = computed(() =>
		!isBlockedByVirusScan.value && fileRecord.value?.url
			? fileRecord.value.url
			: ""
	);

	return { isImage, isBlockedByVirusScan, url };
};
