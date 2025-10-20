import { useOfficeFileSelection } from "../shared/office-file-selection.composable";
import { Ref, ref } from "vue";

interface OfficeFileSelectionOptions {
	id: string;
	label: string;
	action: (fileName: string, caption: string) => Promise<void>;
}

export const setupOfficeFileSelectionMock = () => {
	const mockedOfficeFileSelection = vi.mocked(useOfficeFileSelection);

	const openOfficeFileDialog = vi.fn();
	const closeOfficeFileDialog = vi.fn();
	const isOfficeFileDialogOpen = ref(false);
	const officeFileSelectionOptions: Ref<Array<OfficeFileSelectionOptions>> = ref([]);

	const mocks = {
		openOfficeFileDialog,
		closeOfficeFileDialog,
		officeFileSelectionOptions,
		isOfficeFileDialogOpen,
	};

	mockedOfficeFileSelection.mockReturnValue(mocks);

	return mocks;
};
