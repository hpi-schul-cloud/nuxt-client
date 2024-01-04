import {
	FileApiFactory,
	FileApiInterface,
	FileRecordParentType,
	FileRecordResponse,
	FileUrlParams,
	RenameFileParams,
} from "@/fileStorageApi/v3";
import { authModule } from "@/store/store-accessor";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createGlobalState } from "@vueuse/core";
import { Ref, ref } from "vue";
import { useFileStorageNotifier } from "./FileStorageNotifications.composable";

export enum ErrorType {
	FILE_IS_BLOCKED = "FILE_IS_BLOCKED",
	FILE_NOT_FOUND = "FILE_NOT_FOUND",
	FILE_NAME_EXISTS = "FILE_NAME_EXISTS",
	FILE_NAME_EMPTY = "FILE_NAME_EMPTY",
	COULD_NOT_CREATE_PATH = "COULD_NOT_CREATE_PATH",
	FILE_TOO_BIG = "FILE_TOO_BIG",
	Unauthorized = "Unauthorized",
	Forbidden = "Forbidden",
}

const fileStorageApi = () => {
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);
	const fileRecords = new Map<string, Ref<FileRecordResponse | undefined>>();
	const {
		showFileTooBigError,
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
		showFileExistsError,
	} = useFileStorageNotifier();

	const getFileRecord = (id: string) => {
		const existingFileRecord = fileRecords.get(id);
		const skeletonFileRecord = ref(undefined);

		if (!existingFileRecord) {
			fileRecords.set(id, skeletonFileRecord);
		}

		const returnValue = existingFileRecord ?? skeletonFileRecord;

		return returnValue;
	};

	const fetchFile = async (
		parentId: string,
		parentType: FileRecordParentType
	): Promise<void> => {
		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.list(schoolId, parentId, parentType);

			const existingFileRecord = fileRecords.get(parentId);

			if (existingFileRecord) {
				existingFileRecord.value = response.data.data[0];
			} else {
				fileRecords.set(parentId, ref(response.data.data[0]));
			}
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const upload = async (
		file: File,
		parentId: string,
		parentType: FileRecordParentType
	): Promise<void> => {
		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.upload(
				schoolId,
				parentId,
				parentType,
				file
			);

			const existingFileRecord = fileRecords.get(parentId);

			if (existingFileRecord) {
				existingFileRecord.value = response.data;
			} else {
				fileRecords.set(parentId, ref(response.data));
			}
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const uploadFromUrl = async (
		imageUrl: string,
		parentId: string,
		parentType: FileRecordParentType
	): Promise<void> => {
		try {
			const { pathname } = new URL(imageUrl);
			const fileName = pathname.substring(pathname.lastIndexOf("/") + 1);
			const schoolId = authModule.getUser?.schoolId as string;
			const fileUrlParams: FileUrlParams = {
				url: imageUrl,
				fileName,
				headers: `User-Agent: Embed Request User Agent`,
			};
			const response = await fileApi.uploadFromUrl(
				schoolId,
				parentId,
				parentType,
				fileUrlParams
			);

			fileRecords.set(parentId, ref(response.data));
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

			fileRecords.set(fileRecordId, ref(response.data));
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const showError = (error: unknown) => {
		const responseError = mapAxiosErrorToResponseError(error);
		const { message } = responseError;

		showMessageByType(message);
	};

	const showMessageByType = (message: ErrorType | string) => {
		switch (message) {
			case ErrorType.FILE_TOO_BIG:
				showFileTooBigError();
				break;
			case ErrorType.FILE_NAME_EXISTS:
				showFileExistsError();
				break;
			case ErrorType.Unauthorized:
				showUnauthorizedError();
				break;
			case ErrorType.Forbidden:
				showForbiddenError();
				break;
			default:
				showInternalServerError();
				break;
		}
	};

	return {
		fetchFile,
		rename,
		upload,
		uploadFromUrl,
		getFileRecord,
	};
};

export const useFileStorageApi = createGlobalState(fileStorageApi);
