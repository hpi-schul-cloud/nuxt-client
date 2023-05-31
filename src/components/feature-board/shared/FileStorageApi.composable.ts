import {
	FileApiFactory,
	FileApiInterface,
	FileRecordResponse as FileRecord,
	FileRecordParamsParentType,
	FileRecordResponse,
	RenameFileParams,
} from "@/fileStorageApi/v3";
import { authModule } from "@/store/store-accessor";
import { BusinessError } from "@/store/types/commons";
import { downloadFile } from "@/utils/fileHelper";
import { createSharedComposable } from "@vueuse/core";
import { reactive, ref } from "vue";
import { $axios } from "../../../utils/api";

export const useFileStorageApi = createSharedComposable(() => {
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);
	const fileRecords: Record<FileRecord["parentId"], FileRecord> = reactive({});
	const newFileForParent = ref("");

	let businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	const fetchFiles = async (
		parentId: string,
		parentType: FileRecordParamsParentType
	): Promise<void> => {
		resetBusinessError();

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
		parentType: FileRecordParamsParentType,
		file: File
	): Promise<FileRecordResponse | undefined> => {
		resetBusinessError();

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

			return response.data;
		} catch (error) {
			setBusinessError(error as BusinessError);

			return;
		}
	};

	const download = async (file: FileRecord): Promise<void> => {
		resetBusinessError();

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
		fileRecordId: string,
		params: RenameFileParams
	): Promise<void> => {
		resetBusinessError();

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
		businessError = error;
	};

	const resetBusinessError = (): void => {
		businessError = {
			statusCode: "",
			message: "",
		};
	};

	return {
		download,
		fetchFiles,
		rename,
		upload,
		getFile,
		businessError,
		fileRecords,
		newFileForParent,
	};
});
