import {
	FileApiFactory,
	FileApiInterface,
	FileRecordResponse as FileRecord,
	FileRecordParamsParentType,
	FileRecordResponse,
	RenameFileParams,
} from "@/fileStorageApi/v3";
import { authModule } from "@/store/store-accessor";
import { BusinessError, Status } from "@/store/types/commons";
import { downloadFile } from "@/utils/fileHelper";
import { createSharedComposable } from "@vueuse/core";
import { reactive, ref } from "vue";
import { $axios } from "../../../utils/api";

export const useFileStorageApi = createSharedComposable(() => {
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);
	const newFileForParent = ref("");
	const files: Record<FileRecord["parentId"], FileRecord> = reactive({});
	let businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	let status: Status = "";

	const fetchFiles = async (
		parentId: string,
		parentType: FileRecordParamsParentType
	): Promise<void> => {
		resetBusinessError();
		setStatus("pending");

		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.list(schoolId, parentId, parentType);

			setFiles(response.data.data);

			setStatus("completed");
		} catch (error) {
			setBusinessError(error as BusinessError);
			setStatus("error");
		}
	};

	const upload = async (
		parentId: string,
		parentType: FileRecordParamsParentType,
		file: File
	): Promise<FileRecordResponse | undefined> => {
		resetBusinessError();
		setStatus("pending");

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
			setStatus("completed");

			return response.data;
		} catch (error) {
			setBusinessError(error as BusinessError);
			setStatus("error");
			return;
		}
	};

	const download = async (file: FileRecord): Promise<void> => {
		resetBusinessError();
		setStatus("pending");

		try {
			const res = await fileApi.download(file.id, file.name, {
				responseType: "blob",
			});

			downloadFile(res.data as unknown as Blob, file.name, file.mimeType);

			setStatus("completed");
		} catch (error) {
			setBusinessError(error as BusinessError);
			setStatus("error");
		}
	};

	const rename = async (
		fileRecordId: string,
		params: RenameFileParams
	): Promise<void> => {
		resetBusinessError();
		setStatus("pending");

		try {
			const response = await fileApi.patchFilename(fileRecordId, params);

			replaceFile(response.data);

			setStatus("completed");
		} catch (error) {
			setBusinessError(error as BusinessError);
			setStatus("error");
		}
	};

	const setFiles = (_files: FileRecord[]) => {
		_files.forEach((file) => {
			files[file.parentId] = file;
		});
	};

	const getFile = (parentId: FileRecord["parentId"]) => {
		return files[parentId];
	};

	const appendFile = (_file: FileRecord) => {
		files[_file.parentId] = _file;
	};

	const replaceFile = (_file: FileRecord) => {
		files[_file.parentId] = _file;
	};

	const setStatus = (_status: Status) => {
		status = _status;
	};

	const setBusinessError = (_businessError: BusinessError): void => {
		businessError = _businessError;
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
		files,
		status,
		newFileForParent,
	};
});
