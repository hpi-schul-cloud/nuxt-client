import { FileRecordResponse, PreviewStatus } from "@/fileStorageApi/v3";
import { computed, Ref, ref } from "vue";
import { AudioRecordAlert } from "../../shared/types/AudioRecordAlert.enum";

export const useFileAlerts = (
	fileRecord: Ref<FileRecordResponse | undefined>
) => {
	const emittedAlerts: Ref<AudioRecordAlert[]> = ref([]);

	const previewStatusAlert = computed(() => {
		return mapPreviewStatusToFileAlert(fileRecord?.value?.previewStatus);
	});

	const alerts = computed(() => {
		const alerts = [...emittedAlerts.value];

		if (previewStatusAlert.value !== undefined)
			alerts.push(previewStatusAlert.value);

		return alerts;
	});

	const addAlert = (alert: AudioRecordAlert) => {
		emittedAlerts.value.push(alert);
	};

	return {
		alerts,
		addAlert,
	};
};

function mapPreviewStatusToFileAlert(
	previewStatus?: PreviewStatus
): AudioRecordAlert | undefined {
	if (previewStatus === PreviewStatus.AWAITING_SCAN_STATUS)
		return AudioRecordAlert.AWAITING_SCAN_STATUS;
	if (previewStatus === PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED)
		return AudioRecordAlert.SCAN_STATUS_BLOCKED;
	if (previewStatus === PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR)
		return AudioRecordAlert.SCAN_STATUS_ERROR;
	if (
		previewStatus === PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK
	)
		return AudioRecordAlert.SCAN_STATUS_WONT_CHECK;
}
