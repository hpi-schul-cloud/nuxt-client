import {
	FileApiFactory,
	FileApiInterface,
	FileRecordResponse as FileRecord,
	FileRecordParentType,
	FileRecordResponse,
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
		fileRecordId: FileRecord["id"],
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

	return {
		fetchFiles,
		rename,
		upload,
		businessError,
	};
};
