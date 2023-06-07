import {
	FileApiFactory,
	FileApiInterface,
	FileRecordResponse as FileRecord,
	FileRecordParentType,
	RenameFileParams,
} from "@/fileStorageApi/v3";
import { authModule } from "@/store/store-accessor";
import { BusinessError } from "@/store/types/commons";
import { $axios } from "@/utils/api";
import { downloadFile } from "@/utils/fileHelper";
import { createSharedComposable } from "@vueuse/core";
import { ref, set } from "vue";

export const useFileStorageApi = createSharedComposable(() => {
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);
	const fileRecords = ref<Record<FileRecord["parentId"], FileRecord>>({});
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
			set(fileRecords.value, `${file.parentId}`, file);
		});
	};

	const getFile = (parentId: FileRecord["parentId"]) => {
		return fileRecords.value[parentId];
	};

	const appendFile = (file: FileRecord) => {
		set(fileRecords.value, `${file.parentId}`, file);
	};

	const replaceFile = (file: FileRecord) => {
		set(fileRecords.value, `${file.parentId}`, file);
	};

	const setBusinessError = (error: BusinessError): void => {
		businessError.value = error;
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
