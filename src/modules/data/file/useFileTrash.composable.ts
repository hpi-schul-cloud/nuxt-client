import { FileRecord, FileRecordParent, StorageLocation } from "@/types/file/File";
import { $axios } from "@/utils/api";
import { FileApiFactory, FileApiInterface } from "@api-file-storage";
import { notifyError } from "@data-app";
import { useAppStore } from "@data-app";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useFileTrash = () => {
	const { t } = useI18n();
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);

	const deletedFileRecords = ref<FileRecord[]>([]);

	const fetchDeletedFiles = async (parentId: string, parentType: FileRecordParent): Promise<void> => {
		const schoolId = useAppStore().school?.id as string;
		const response = await fileApi.listDeleted(schoolId, StorageLocation.SCHOOL, parentId, parentType);

		deletedFileRecords.value = response.data.data;
	};

	const restoreFiles = async (fileRecords: FileRecord[]): Promise<void> => {
		try {
			const fileRecordIds = fileRecords.map((r) => r.id);

			await fileApi.restoreFiles({ fileRecordIds });

			const restoredIds = new Set(fileRecordIds);

			deletedFileRecords.value = deletedFileRecords.value.filter((r) => !restoredIds.has(r.id));
		} catch {
			notifyError(t("components.board.notifications.errors.fileServiceNotAvailable"));
		}
	};

	return {
		deletedFileRecords,
		fetchDeletedFiles,
		restoreFiles,
	};
};
