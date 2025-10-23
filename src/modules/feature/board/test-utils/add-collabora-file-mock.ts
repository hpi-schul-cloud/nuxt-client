import { useAddCollaboraFile } from "../shared/add-collabora-file.composable";
import { collaboraFileSelectionOptionsFactory } from "../test-utils/collabora-file-selection-options.factory";
import { Mock } from "vitest";
import { ref } from "vue";

interface Props {
	openCollaboraFileDialogMock?: Mock;
	setCardIdMock?: Mock;
}
interface CollaboraFileSelectionOptions {
	id: string;
	label: string;
	action: (fileName: string, caption: string) => Promise<void>;
}

export const setupCollaboraFileSelectionMock = (props: Props = {}) => {
	const { setCardIdMock, openCollaboraFileDialogMock } = props;
	const mockedCollaboraFileSelection = vi.mocked(useAddCollaboraFile);

	const openCollaboraFileDialog = openCollaboraFileDialogMock ?? vi.fn();
	const closeCollaboraFileDialog = vi.fn();
	const isCollaboraFileDialogOpen = ref(false);
	const collaboraFileSelectionOptions: Array<CollaboraFileSelectionOptions> =
		collaboraFileSelectionOptionsFactory.createCollaboraFileSelectionOptionsList();
	const getAssetUrl = vi.fn();
	const setCardId = setCardIdMock ?? vi.fn();
	const setCreateElementRequestFn = vi.fn();
	const cardId = ref("");

	const mocks = {
		openCollaboraFileDialog,
		closeCollaboraFileDialog,
		collaboraFileSelectionOptions,
		isCollaboraFileDialogOpen,
		getAssetUrl,
		setCardId,
		setCreateElementRequestFn,
		cardId,
	};

	mockedCollaboraFileSelection.mockReturnValue(mocks);

	return mocks;
};
