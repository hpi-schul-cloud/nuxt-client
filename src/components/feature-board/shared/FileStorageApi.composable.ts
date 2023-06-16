import {
	FileApiFactory,
	FileApiInterface,
	FileRecordParentType,
	FileRecordResponse,
	FileRecordScanStatus,
	RenameFileParams,
} from "@/fileStorageApi/v3";
import { authModule } from "@/store/store-accessor";
import { BusinessError } from "@/store/types/commons";
import { $axios } from "@/utils/api";
import { delay } from "@/utils/helpers";
import { ref } from "vue";

export const useFileStorageApi = (
	parentId: string,
	parentType: FileRecordParentType
) => {
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);
	const fileRecord = ref<FileRecordResponse>();

	const businessError = ref<BusinessError>({
		statusCode: "",
		message: "",
	});

	const fetchFile = async (): Promise<void> => {
		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.list(schoolId, parentId, parentType);

			fileRecord.value = response.data.data[0];
		} catch (error) {
			setBusinessError(error as BusinessError);
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
			setBusinessError(error as BusinessError);
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
			setBusinessError(error as BusinessError);
		}
	};

	const setBusinessError = (error: BusinessError): void => {
		businessError.value = error;
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

		await delay(waitTime);

		await fetchFile();

		if (refreshTimer < waitTimeMax) {
			refreshTimer = refreshTimer + waitTime;

			await fetchPendingFileRecursively(waitTime, waitTimeMax, refreshTimer);
		}
	};

	return {
		fetchFile,
		fetchPendingFileRecursively,
		rename,
		upload,
		businessError,
		fileRecord,
	};
};
