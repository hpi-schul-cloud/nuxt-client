import { FileAlert } from "../../shared/types/FileAlert.enum";
import { FileRecordResponse, PreviewStatus } from "@/fileStorageApi/v3";
import { computed, Ref, ref } from "vue";

export const useFileAlerts = (fileRecord: Ref<FileRecordResponse | undefined>) => {
	const emittedAlerts: Ref<FileAlert[]> = ref([]);

	const previewStatusAlert = computed(() => mapPreviewStatusToFileAlert(fileRecord?.value?.previewStatus));

	const exceedsCollaboraEditableFileSizeAlert = computed(() => {
		if (!fileRecord.value) return;

		const { exceedsCollaboraEditableFileSize } = fileRecord.value;
		const alert = exceedsCollaboraEditableFileSize ? FileAlert.EXCEEDS_COLLABORA_EDITABLE_FILE_SIZE : undefined;

		return alert;
	});

	const alerts = computed(() => {
		const alerts = [...emittedAlerts.value];

		if (previewStatusAlert.value !== undefined) alerts.push(previewStatusAlert.value);

		if (exceedsCollaboraEditableFileSizeAlert.value !== undefined)
			alerts.push(exceedsCollaboraEditableFileSizeAlert.value);

		return alerts;
	});

	const addAlert = (alert: FileAlert) => {
		emittedAlerts.value.push(alert);
	};

	return {
		alerts,
		addAlert,
	};
};

function mapPreviewStatusToFileAlert(previewStatus?: PreviewStatus): FileAlert | undefined {
	if (previewStatus === PreviewStatus.AWAITING_SCAN_STATUS) return FileAlert.AWAITING_SCAN_STATUS;
	if (previewStatus === PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED) return FileAlert.SCAN_STATUS_BLOCKED;
	if (previewStatus === PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR) return FileAlert.SCAN_STATUS_ERROR;
	if (previewStatus === PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK)
		return FileAlert.SCAN_STATUS_WONT_CHECK;
}
