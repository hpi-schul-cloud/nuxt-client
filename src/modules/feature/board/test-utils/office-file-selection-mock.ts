import { useOfficeFileSelection } from "../shared/office-file-selection.composable";
import { Mock } from "vitest";
import { Ref, ref } from "vue";

interface Props {
	openOfficeFileDialogMock?: Mock;
}
interface OfficeFileSelectionOptions {
	id: string;
	label: string;
	action: (fileName: string, caption: string) => Promise<void>;
}

export const setupOfficeFileSelectionMock = (props: Props = {}) => {
	const { openOfficeFileDialogMock } = props;
	const mockedOfficeFileSelection = vi.mocked(useOfficeFileSelection);

	const openOfficeFileDialog = openOfficeFileDialogMock ?? vi.fn();
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
