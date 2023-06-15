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
import { ref } from "vue";

export const useFileStorageApi = (
	parentId: string,
	parentType: FileRecordParentType
) => {
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);

	const businessError = ref<BusinessError>({
		statusCode: "",
		message: "",
	});

	const fetchFiles = async (): Promise<FileRecordResponse[] | undefined> => {
		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.list(schoolId, parentId, parentType);

			return response.data.data;
		} catch (error) {
			setBusinessError(error as BusinessError);
		}
	};

	const upload = async (
		file: File
	): Promise<FileRecordResponse | undefined> => {
		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.upload(
				schoolId,
				parentId,
				parentType,
				file
			);

			return response.data;
		} catch (error) {
			setBusinessError(error as BusinessError);
		}
	};

	const rename = async (
		fileRecordId: FileRecordResponse["id"],
		params: RenameFileParams
	): Promise<FileRecordResponse | void> => {
		try {
			const response = await fileApi.patchFilename(fileRecordId, params);

			return response.data;
		} catch (error) {
			setBusinessError(error as BusinessError);
		}
	};

	const setBusinessError = (error: BusinessError): void => {
		businessError.value = error;
	};

	const fetchFileRecursively = async (
		waitTime = 10000,
		waitTimeMax = 50000,
		refreshTimer = 0
	): Promise<FileRecordResponse | undefined> => {
		let fileRecord: FileRecordResponse | undefined;

		const result = await fetchFiles();
		if (result) {
			fileRecord = result[0];
			if (
				fileRecord?.securityCheckStatus === FileRecordScanStatus.PENDING &&
				refreshTimer <= waitTimeMax
			) {
				refreshTimer = refreshTimer + waitTime;
				await new Promise((resolve) => setTimeout(resolve, waitTime));
				fileRecord = await fetchFileRecursively(
					waitTime,
					waitTimeMax,
					refreshTimer
				);
			}
		}

		return fileRecord;
	};

	return {
		fetchFiles,
		fetchFileRecursively,
		rename,
		upload,
		businessError,
	};
};
