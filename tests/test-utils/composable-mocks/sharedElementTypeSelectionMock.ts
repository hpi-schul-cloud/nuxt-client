import { useSharedElementTypeSelection } from "@/components/feature-board/shared/SharedElementTypeSelection.composable";
import { ref } from "vue";
import { jest } from "@jest/globals";

interface Props {
	closeDialogMock?: jest.Mock;
}

export const setupSharedElementTypeSelectionMock = (props: Props) => {
	const { closeDialogMock } = props;
	const mockedSharedElementTypeSelection = jest.mocked(
		useSharedElementTypeSelection
	);

	const closeDialog = closeDialogMock ?? jest.fn();
	const isDialogOpen = ref(false);

	const elementTypeOptions = ref();

	const mocks = {
		closeDialog,
		isDialogOpen,
		elementTypeOptions,
	};

	mockedSharedElementTypeSelection.mockReturnValue(mocks);

	return mocks;
};
