import {
	FileApiFactory,
	FileApiInterface,
	FileRecordParentType,
	FileRecordResponse,
	FileRecordScanStatus,
	FileUrlParams,
	PreviewStatus,
	RenameFileParams,
} from "@/fileStorageApi/v3";
import { authModule } from "@/store/store-accessor";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createGlobalState } from "@vueuse/core";
import { ref, Ref } from "vue";
import { useSharedFileRecordsStatus } from "./FileRecordsStatus.composable";
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

const useFileStorageApi = () => {
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);
	const fileRecords: Ref<FileRecordResponse>[] = [];
	const {
		showFileTooBigError,
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
		showFileExistsError,
	} = useFileStorageNotifier();

	const { addFileRecordStatus, removeFileRecordStatus } =
		useSharedFileRecordsStatus();

	const createDefaultFileRecord = (id: string) => {
		return ref({
			id: "asd",
			name: "w3c_home_256.bmp",
			url: "",
			size: 4534,
			securityCheckStatus: FileRecordScanStatus.PENDING,
			parentId: id,
			creatorId: "0000d231816abba584714c9e",
			mimeType: "image/bmp",
			parentType: FileRecordParentType.BOARDNODES,
			previewStatus: PreviewStatus.AWAITING_SCAN_STATUS,
			isUploading: true,
		});
	};
	const getFileRecord = (id: string) => {
		const realValue = fileRecords.find(
			(fileRecord) => fileRecord.value.parentId === id
		);
		console.log("id", id);

		console.log("realValue", realValue);

		const defaultFileRecord = createDefaultFileRecord(id);

		if (!realValue) {
			fileRecords.push(defaultFileRecord);
		}

		const returnValue = realValue ?? defaultFileRecord;
		console.log(returnValue);

		return returnValue;
	};

	const fetchFile = async (
		parentId: string,
		parentType: FileRecordParentType
	): Promise<void> => {
		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.list(schoolId, parentId, parentType);

			// idea: use request-pooling to reduce number of api-requests
			const index = fileRecords.findIndex(
				(fileRecord) => fileRecord.value.parentId === parentId
			);
			if (index !== -1) {
				fileRecords[index].value = response.data.data[0];
			} else {
				fileRecords.push(ref(response.data.data[0]));
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
			addFileRecordStatus({ id: parentId, isUploading: true });

			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileApi.upload(
				schoolId,
				parentId,
				parentType,
				file
			);

			removeFileRecordStatus(parentId);

			const index = fileRecords.findIndex(
				(fileRecord) => fileRecord.value.parentId === parentId
			);
			if (index !== -1) {
				fileRecords[index].value = response.data;
			} else {
				fileRecords.push(ref(response.data));
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

			fileRecords.push(ref(response.data));
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

			fileRecords.push(ref(response.data));
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

export const useSharedFileRecords = createGlobalState(useFileStorageApi);
