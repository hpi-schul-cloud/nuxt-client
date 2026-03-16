import { $axios } from "@/utils/api";
import { CommonCartridgeApiFactory } from "@api-common-cartridge";
import { FileApiFactory, FileRecordParentType, StorageLocation } from "@api-file-storage";
import { useAppStoreRefs } from "@data-app";
import { ref } from "vue";

export const useCommonCartridgeImport = () => {
	const isOpen = ref(false);
	const isSuccess = ref(false);
	const file = ref<File | undefined>(undefined);

	const commonCartridgeApi = CommonCartridgeApiFactory(undefined, "/v3", $axios);
	const fileStorageApi = FileApiFactory(undefined, "/v3", $axios);

	const importCommonCartridgeFile = async (file: File | undefined): Promise<void> => {
		const { user, school } = useAppStoreRefs();
		const schoolId = school.value?.id;
		const currentUserId = user.value?.id;

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
		} catch {
			isSuccess.value = false;
		}
	};
	return {
		isOpen,
		isSuccess,
		file,
		importCommonCartridgeFile,
	};
};
