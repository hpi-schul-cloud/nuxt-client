import { useAddCollaboraFile } from "../shared/add-collabora-file.composable";
import { Mock } from "vitest";
import { ref } from "vue";

interface Props {
	openCollaboraFileDialogMock?: Mock;
	setCardIdMock?: Mock;
}

export const setupCollaboraFileSelectionMock = (props: Props = {}) => {
	const { setCardIdMock, openCollaboraFileDialogMock } = props;
	const mockedCollaboraFileSelection = vi.mocked(useAddCollaboraFile);

	const openCollaboraFileDialog = openCollaboraFileDialogMock ?? vi.fn();
	const closeCollaboraFileDialog = vi.fn();
	const isCollaboraFileDialogOpen = ref(false);
	const collaboraFileSelectionOptions = [
		{
			id: "1",
			label: "Text Document",
			action: vi.fn(),
		},
		{
			id: "2",
			label: "Table Document",
			action: vi.fn(),
		},
	];
	const setCardId = setCardIdMock ?? vi.fn();
	const setCreateElementRequestFn = vi.fn();
	const cardId = ref("");

	const mocks = {
		cardId,
		collaboraFileSelectionOptions,
		isCollaboraFileDialogOpen,
		openCollaboraFileDialog,
		closeCollaboraFileDialog,
		setCardId,
		setCreateElementRequestFn,
	};

	mockedCollaboraFileSelection.mockReturnValue(mocks);

	return mocks;
};
