import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { CommonCartridgeApiFactory } from "@api-common-cartridge";
import { FileApiFactory, FileRecordParentType, StorageLocation } from "@api-file-storage";
import { useAppStoreRefs } from "@data-app";
import { isAxiosError } from "axios";
import { ref } from "vue";

export enum CommonCartridgeImportErrorType {
	FILE_SIZE_EXCEEDED = "FILE_SIZE_EXCEEDED",
	UNKNOWN = "UNKNOWN",
}

export const useCommonCartridgeImport = () => {
	const isOpen = ref(false);
	const isSuccess = ref(false);
	const errorType = ref<CommonCartridgeImportErrorType | undefined>(undefined);
	const maxFileSize = ref<number | undefined>(undefined);
	const file = ref<File | undefined>(undefined);

	const commonCartridgeApi = CommonCartridgeApiFactory(undefined, "/v3", $axios);
	const fileStorageApi = FileApiFactory(undefined, "/v3", $axios);

	const importCommonCartridgeFile = async (file: File | undefined): Promise<void> => {
		const { user, school } = useAppStoreRefs();
		const schoolId = school.value?.id;
		const currentUserId = user.value?.id;

		errorType.value = undefined;
		maxFileSize.value = undefined;

		if (!file || !currentUserId || !schoolId) {
			isSuccess.value = false;
			return;
		}

		try {
			const uploadResult = await fileStorageApi.upload(
				schoolId,
				StorageLocation.SCHOOL,
				currentUserId,
				FileRecordParentType.USERS,
				file
			);

			const fileRecords = uploadResult.data;

			await commonCartridgeApi.commonCartridgeControllerImportCourse({
				fileRecordId: fileRecords.id,
				fileName: fileRecords.name,
				fileUrl: fileRecords.url,
			});
			isSuccess.value = true;
		} catch (error) {
			isSuccess.value = false;
			const responseError = mapAxiosErrorToResponseError(error);
			if (responseError.type === CommonCartridgeImportErrorType.FILE_SIZE_EXCEEDED) {
				errorType.value = CommonCartridgeImportErrorType.FILE_SIZE_EXCEEDED;
				if (isAxiosError(error) && error.response?.data?.details?.maxFileSize) {
					maxFileSize.value = error.response.data.details.maxFileSize as number;
				}
			} else {
				errorType.value = CommonCartridgeImportErrorType.UNKNOWN;
			}
		}
	};
	return {
		isOpen,
		isSuccess,
		errorType,
		maxFileSize,
		file,
		importCommonCartridgeFile,
	};
};
