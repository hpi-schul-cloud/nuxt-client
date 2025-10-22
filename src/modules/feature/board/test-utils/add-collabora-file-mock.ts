import { useAddCollaboraFile } from "../shared/add-collabora-file.composable";
import { Mock } from "vitest";
import { Ref, ref } from "vue";

interface Props {
	openCollaboraFileDialogMock?: Mock;
}
interface CollaboraFileSelectionOptions {
	id: string;
	label: string;
	action: (fileName: string, caption: string) => Promise<void>;
}

export const setupCollaboraFileSelectionMock = (props: Props = {}) => {
	const { openCollaboraFileDialogMock } = props;
	const mockedCollaboraFileSelection = vi.mocked(useAddCollaboraFile);

	const openCollaboraFileDialog = openCollaboraFileDialogMock ?? vi.fn();
	const closeCollaboraFileDialog = vi.fn();
	const initializeFileElementWithCollaboraFile = vi.fn();
	const isCollaboraFileDialogOpen = ref(false);
	const collaboraFileSelectionOptions: Ref<Array<CollaboraFileSelectionOptions>> = ref([]);

	const mocks = {
		openCollaboraFileDialog,
		closeCollaboraFileDialog,
		collaboraFileSelectionOptions,
		isCollaboraFileDialogOpen,
		initializeFileElementWithCollaboraFile,
	};

	mockedCollaboraFileSelection.mockReturnValue(mocks);

	return mocks;
};
