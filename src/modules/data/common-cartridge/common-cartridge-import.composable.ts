import { $axios } from "@/utils/api";
import { CommonCartridgeApiFactory } from "@api-common-cartridge";
import { useAppStoreRefs } from "@data-app";
import { ref } from "vue";

export const useCommonCartridgeImport = () => {
	const isOpen = ref(false);
	const isSuccess = ref(false);
	const file = ref<File | undefined>(undefined);

	const configuration = {
		isJsonMime: (mime: string) => mime?.includes("application/json") ?? false,
	};
	const commonCartridgeApi = CommonCartridgeApiFactory(configuration, "/v3", $axios);

	const importCommonCartridgeFile = async (file: File | undefined): Promise<void> => {
		const { user, school } = useAppStoreRefs();
		const schoolId = school.value?.id;
		const currentUserId = user.value?.id;

		if (!file || !currentUserId || !schoolId) {
			isSuccess.value = false;
			return;
		}

		try {
			const encodedFileName = encodeURIComponent(file.name);
			await commonCartridgeApi.commonCartridgeControllerUploadFileAndStartImport(file, {
				headers: {
					"Content-Disposition": `attachment; filename="${encodedFileName}"; filename*=UTF-8''${encodedFileName}`,
				},
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
