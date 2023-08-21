import { useSharedElementTypeSelection } from "../shared/SharedElementTypeSelection.composable";
import { jest } from "@jest/globals";
import { Ref, ref } from "vue";

interface Props {
	closeDialogMock?: jest.Mock;
}

interface ElementTypeSelectionOptions {
	icon: string;
	label: string;
	action: () => void;
	testId: string;
}

export const setupSharedElementTypeSelectionMock = (props: Props = {}) => {
	const { closeDialogMock } = props;
	const mockedSharedElementTypeSelection = jest.mocked(
		useSharedElementTypeSelection
	);

	const closeDialog = closeDialogMock ?? jest.fn();
	const isDialogOpen = ref(false);

	const elementTypeOptions: Ref<Array<ElementTypeSelectionOptions>> = ref([]);

	const mocks = {
		closeDialog,
		isDialogOpen,
		elementTypeOptions,
	};

	mockedSharedElementTypeSelection.mockReturnValue(mocks);
	return mocks;
};
