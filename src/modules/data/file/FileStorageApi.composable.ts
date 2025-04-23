import {
	FileApiFactory,
	FileApiInterface,
	FileUrlParams,
	RenameFileParams,
	StorageLocation,
} from "@/fileStorageApi/v3";
import { authModule } from "@/store/store-accessor";
import { FileRecord, FileRecordParent } from "@/types/file/File";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createTestableGlobaleState } from "@/utils/create-global-state";
import { useFileRecordsStore } from "./FileRecords.state";
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
	const {
		showFileTooBigError,
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
		showFileExistsError,
	} = useFileStorageNotifier();

	const { getFileRecordsByParentId, upsertFileRecords } = useFileRecordsStore();

	const fetchFiles = async (
		parentId: string,
		parentType: FileRecordParent
	): Promise<void> => {
		try {
			const schoolId = authModule.getSchool?.id as string;
			const response = await fileApi.list(
				schoolId,
				StorageLocation.SCHOOL,
				parentId,
				parentType
			);

			upsertFileRecords(response.data.data);
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const upload = async (
		file: File,
		parentId: string,
		parentType: FileRecordParent
	): Promise<void> => {
		try {
			const schoolId = authModule.getSchool?.id as string;
			const response = await fileApi.upload(
				schoolId,
				StorageLocation.SCHOOL,
				parentId,
				parentType,
				file
			);
			upsertFileRecords([response.data]);
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const uploadFromUrl = async (
		imageUrl: string,
		parentId: string,
		parentType: FileRecordParent
	): Promise<void> => {
		try {
			const { pathname } = new URL(imageUrl);
			const fileName = pathname.substring(pathname.lastIndexOf("/") + 1);
			const schoolId = authModule.getSchool?.id as string;
			const fileUrlParams: FileUrlParams = {
				url: imageUrl,
				fileName,
				headers: { "User-Agent": "Embed Request User Agent" },
			};
			const response = await fileApi.uploadFromUrl(
				schoolId,
				StorageLocation.SCHOOL,
				parentId,
				parentType,
				fileUrlParams
			);

			upsertFileRecords([response.data]);
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const rename = async (
		fileRecordId: FileRecord["id"],
		params: RenameFileParams
	): Promise<void> => {
		try {
			const response = await fileApi.patchFilename(fileRecordId, params);

			upsertFileRecords([response.data]);
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
		fetchFiles,
		rename,
		upload,
		uploadFromUrl,
		getFileRecordsByParentId,
	};
};

export const useFileStorageApi = createTestableGlobaleState(fileStorageApi);
