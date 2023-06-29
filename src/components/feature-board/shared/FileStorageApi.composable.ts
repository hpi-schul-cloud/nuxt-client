import {
	FileApiFactory,
	FileApiInterface,
	FileRecordParentType,
	FileRecordResponse,
	FileRecordScanStatus,
	RenameFileParams,
} from "@/fileStorageApi/v3";
import { authModule } from "@/store/store-accessor";
import { $axios, mapAxiosErrorToApiResponseError } from "@/utils/api";
import { delay } from "@/utils/helpers";
import { ref } from "vue";
import { useFileStorageNotifier } from "./FileStorageNotifications.composable";

export const useFileStorageApi = (
	parentId: string,
	parentType: FileRecordParentType
) => {
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);
	const fileRecord = ref<FileRecordResponse>();
	const { showErrorFromResponse } = useFileStorageNotifier();

	const fetchFile = async (): Promise<void> => {
		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.list(schoolId, parentId, parentType);

			fileRecord.value = response.data.data[0];
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const upload = async (file: File): Promise<void> => {
		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.upload(
				schoolId,
				parentId,
				parentType,
				file
			);

			fileRecord.value = response.data;
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const rename = async (
		fileRecordId: FileRecordResponse["id"],
		params: RenameFileParams
	): Promise<void> => {
		try {
			const response = await fileApi.patchFilename(fileRecordId, params);

			fileRecord.value = response.data;
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const fetchPendingFileRecursively = async (
		waitTime = 10000,
		waitTimeMax = 50000,
		refreshTimer = 0
	): Promise<FileRecordResponse | undefined> => {
		if (
			!fileRecord.value ||
			fileRecord.value?.securityCheckStatus !== FileRecordScanStatus.PENDING
		) {
			return;
		}
		try {
			await delay(waitTime);

			await fetchFile();

			if (refreshTimer < waitTimeMax) {
				refreshTimer = refreshTimer + waitTime;

				await fetchPendingFileRecursively(waitTime, waitTimeMax, refreshTimer);
			}
		} catch (error) {
			return;
		}
	};

	const showError = (error: unknown) => {
		showErrorFromResponse(mapAxiosErrorToApiResponseError(error));
	};

	return {
		fetchFile,
		fetchPendingFileRecursively,
		rename,
		upload,
		fileRecord,
	};
};
