import {
	FileApiFactory,
	FileApiInterface,
	FileRecordParamsParentType,
	FileRecordResponse as FileRecord,
	RenameFileParams,
	FileRecordResponse,
} from "@/fileStorageApi/v3";
import { downloadFile } from "@/utils/fileHelper";
import { $axios } from "../../../utils/api";
import { authModule } from "@/store/store-accessor";
import { BusinessError, Status } from "@/store/types/commons";

export const useFileStorageApi = () => {
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);

	let files: FileRecord[] = [];

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
		files = _files;
	};

	const appendFile = (_file: FileRecord) => {
		files.push(_file);
	};

	const replaceFile = (_file: FileRecord) => {
		files = files.map((f) => (f.id === _file.id ? _file : f));
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
		businessError,
		files,
		status,
	};
};
