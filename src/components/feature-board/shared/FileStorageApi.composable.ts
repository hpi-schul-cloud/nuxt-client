import {
	FileApiFactory,
	FileApiInterface,
	FileRecordResponse as FileRecord,
	FileRecordParentType,
	FileRecordResponse,
	FileRecordScanStatus,
	RenameFileParams,
} from "@/fileStorageApi/v3";
import { authModule } from "@/store/store-accessor";
import { BusinessError } from "@/store/types/commons";
import { $axios } from "@/utils/api";
import { downloadFile } from "@/utils/fileHelper";
import { createSharedComposable } from "@vueuse/core";
import { Ref, reactive, ref } from "vue";

export const useFileStorageApi = createSharedComposable(() => {
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);
	const fileRecords: Record<FileRecord["parentId"], FileRecord> = reactive({});
	const newFileForParent = ref("");

	const businessError = ref<BusinessError>({
		statusCode: "",
		message: "",
	});

	const fetchFiles = async (
		parentId: string,
		parentType: FileRecordParentType
	): Promise<void> => {
		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.list(schoolId, parentId, parentType);

			setFiles(response.data.data);
		} catch (error) {
			setBusinessError(error as BusinessError);
		}
	};

	const upload = async (
		parentId: string,
		parentType: FileRecordParentType,
		file: File
	): Promise<void> => {
		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.upload(
				schoolId,
				parentId,
				parentType,
				file
			);

			appendFile(response.data);
			newFileForParent.value = response.data.parentId;
		} catch (error) {
			setBusinessError(error as BusinessError);

			return;
		}
	};

	const download = async (file: FileRecord): Promise<void> => {
		try {
			const res = await fileApi.download(file.id, file.name, {
				responseType: "blob",
			});

			downloadFile(res.data as unknown as Blob, file.name, file.mimeType);
		} catch (error) {
			setBusinessError(error as BusinessError);
		}
	};

	const rename = async (
		fileRecordId: FileRecord["id"],
		params: RenameFileParams
	): Promise<void> => {
		try {
			const response = await fileApi.patchFilename(fileRecordId, params);

			replaceFile(response.data);
		} catch (error) {
			setBusinessError(error as BusinessError);
		}
	};

	const setFiles = (files: FileRecord[]) => {
		files.forEach((file) => {
			fileRecords[file.parentId] = file;
		});
	};

	const getFile = (parentId: FileRecord["parentId"]) => {
		return fileRecords[parentId];
	};

	const appendFile = (file: FileRecord) => {
		fileRecords[file.parentId] = file;
	};

	const replaceFile = (file: FileRecord) => {
		fileRecords[file.parentId] = file;
	};

	const setBusinessError = (error: BusinessError): void => {
		businessError.value = error;
	};

	const refreshFile = async (
		parentId: string,
		parentType: FileRecordParentType
	) => {
		await fetchFiles(parentId, parentType);
		return getFile(parentId);
	};

	const fetchFileRecursively = async (
		parentId: string,
		parentType: FileRecordParentType,
		waitTime = 10000,
		waitTimeMax = 50000,
		refreshTimer = 0
	) => {
		let result = await refreshFile(parentId, parentType);

		if (
			result?.securityCheckStatus === FileRecordScanStatus.PENDING &&
			refreshTimer <= waitTimeMax
		) {
			refreshTimer = refreshTimer + waitTime;
			await new Promise((resolve) => setTimeout(resolve, waitTime));
			result = await fetchFileRecursively(
				parentId,
				parentType,
				waitTime,
				waitTimeMax,
				refreshTimer
			);
		}

		return result;
	};

	return {
		download,
		fetchFileRecursively,
		fetchFiles,
		rename,
		upload,
		getFile,
		refreshFile,
		businessError,
		fileRecords,
		newFileForParent,
	};
});
