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
import { ref } from "vue";
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

export const useFileStorageApi = (
	parentId: string,
	parentType: FileRecordParentType
) => {
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);
	const fileRecord = ref<FileRecordResponse>();
	const {
		showFileTooBigError,
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
		showFileExistsError,
	} = useFileStorageNotifier();

	const fetchFile = async (): Promise<void> => {
		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.list(schoolId, parentId, parentType);

			// idea: use request-pooling to reduce number of api-requests
			fileRecord.value = response.data.data[0];
		} catch (error) {
			showError(error);
			throw error;
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
			showError(error);
			throw error;
		}
	};

	const uploadFromUrl = async (imageUrl: string): Promise<void> => {
		try {
			const imageUrlObject = new URL(imageUrl);
			const fileName = imageUrlObject.pathname.replace(/^.*?([^/]+)\/?$/, "$1");
			const schoolId = authModule.getUser?.schoolId as string;
			const fileUrlParams: FileUrlParams = {
				url: imageUrl,
				fileName,
				headers: `User-Agent: Embed Request User Agent Schulcloud Verbund Software`,
			};
			const response = await fileApi.uploadFromUrl(
				schoolId,
				parentId,
				parentType,
				fileUrlParams
			);

			fileRecord.value = response.data;
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

			fileRecord.value = response.data;
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
		fileRecord,
	};
};
