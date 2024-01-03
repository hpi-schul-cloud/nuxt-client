import { createGlobalState } from "@vueuse/core";
import { Ref, ref } from "vue";

export type FileRecordStatus = {
	id: string;
	isUploading: boolean;
};

const useFileRecordsStatus = () => {
	const fileRecordsStatus: Ref<FileRecordStatus[]> = ref([]);

	const getFileRecordStatus = (id: string) => {
		return fileRecordsStatus.value.find(
			(fileRecordStatus) => fileRecordStatus.id === id
		);
	};

	const addFileRecordStatus = (fileRecordStatus: FileRecordStatus) => {
		fileRecordsStatus.value.push(fileRecordStatus);
	};

	const removeFileRecordStatus = (id: string) => {
		const index = fileRecordsStatus.value.findIndex(
			(fileRecordStatus) => fileRecordStatus.id === id
		);

		if (index !== -1) {
			fileRecordsStatus.value.splice(index, 1);
		}
	};

	return {
		addFileRecordStatus,
		getFileRecordStatus,
		removeFileRecordStatus,
	};
};

export const useSharedFileRecordsStatus =
	createGlobalState(useFileRecordsStatus);
