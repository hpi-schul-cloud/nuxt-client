import { useFileRecordsStore } from "./FileRecords.state";
import { useParentStatisticsStore } from "./ParentStatistics.state";
import { FileApiFactory, FileApiInterface, WopiApiFactory, WopiApiInterface } from "@/fileStorageApi/v3";
import {
	EditorMode,
	FileRecord,
	FileRecordParent,
	FileUrlParams,
	RenameFileParams,
	StorageLocation,
} from "@/types/file/File";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { formatFileSize } from "@/utils/fileHelper";
import { notifyError, useAppStore } from "@data-app";
import { useEnvFileConfig } from "@data-env";
import { useI18n } from "vue-i18n";

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

export const useFileStorageApi = () => {
	const { t } = useI18n();
	const fileApi: FileApiInterface = FileApiFactory(undefined, "/v3", $axios);
	const wopiApi: WopiApiInterface = WopiApiFactory(undefined, "/v3", $axios);

	const { getFileRecordsByParentId, upsertFileRecords, deleteFileRecords } = useFileRecordsStore();

	const { getStatisticByParentId, setStatisticForParent } = useParentStatisticsStore();

	const fetchFiles = async (parentId: string, parentType: FileRecordParent): Promise<void> => {
		try {
			const schoolId = useAppStore().school?.id as string;
			const response = await fileApi.list(schoolId, StorageLocation.SCHOOL, parentId, parentType);

			upsertFileRecords(response.data.data);
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const upload = async (file: File, parentId: string, parentType: FileRecordParent): Promise<void> => {
		try {
			const schoolId = useAppStore().school?.id as string;
			const response = await fileApi.upload(schoolId, StorageLocation.SCHOOL, parentId, parentType, file);
			upsertFileRecords([response.data]);
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const uploadFromUrl = async (imageUrl: string, parentId: string, parentType: FileRecordParent): Promise<void> => {
		try {
			const { pathname } = new URL(imageUrl);
			const fileName = pathname.substring(pathname.lastIndexOf("/") + 1);
			const schoolId = useAppStore().school?.id as string;
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
		}
	};

	const rename = async (fileRecordId: FileRecord["id"], params: RenameFileParams): Promise<void> => {
		try {
			const response = await fileApi.patchFilename(fileRecordId, params);

			upsertFileRecords([response.data]);
		} catch (error) {
			showError(error);
		}
	};

	const showError = (error: unknown) => {
		const responseError = mapAxiosErrorToResponseError(error);
		const { message } = responseError;

		showMessageByType(message);
	};

	const deleteFiles = async (fileRecords: FileRecord[]): Promise<void> => {
		try {
			const fileRecordIds = fileRecords.map((fileRecord) => fileRecord.id);

			deleteFileRecords(fileRecords);
			await fileApi.deleteFiles({ fileRecordIds });
		} catch (error) {
			upsertFileRecords(fileRecords);
			showError(error);
			notifyError(t("components.board.notifications.errors.fileNotDeleted"));
		}
	};

	const fetchFileStatistic = async (parentId: string, parentType: FileRecordParent): Promise<void> => {
		try {
			const response = await fileApi.getParentStatistic(parentId, parentType);
			const newStatistic = response.data;

			setStatisticForParent(parentId, newStatistic);
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const getAuthorizedCollaboraDocumentUrl = async (
		fileRecordId: string,
		editorMode: EditorMode,
		userDisplayName: string
	): Promise<string> => {
		try {
			const response = await wopiApi.getAuthorizedCollaboraDocumentUrl(fileRecordId, editorMode, userDisplayName);
			const url = response.data.authorizedCollaboraDocumentUrl;

			return url;
		} catch (error) {
			showError(error);
			throw error;
		}
	};

	const showMessageByType = (message: ErrorType | string) => {
		switch (message) {
			case ErrorType.FILE_TOO_BIG: {
				const maxFileSizeWithUnit = formatFileSize(useEnvFileConfig().value.MAX_FILE_SIZE);

				notifyError(
					t("components.board.notifications.errors.fileToBig", {
						maxFileSizeWithUnit,
					})
				);
				break;
			}
			case ErrorType.FILE_NAME_EXISTS:
				notifyError(t("components.board.notifications.errors.fileNameExists"));
				break;
			case ErrorType.Unauthorized:
				notifyError(t("error.401"));
				break;
			case ErrorType.Forbidden:
				notifyError(t("error.403"));
				break;
			default:
				notifyError(t("components.board.notifications.errors.fileServiceNotAvailable"));
				break;
		}
	};

	return {
		fetchFiles,
		rename,
		upload,
		uploadFromUrl,
		getFileRecordsByParentId,
		deleteFiles,
		getStatisticByParentId,
		tryGetParentStatisticFromApi: fetchFileStatistic,
		getAuthorizedCollaboraDocumentUrl,
	};
};
