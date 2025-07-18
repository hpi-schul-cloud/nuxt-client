import { Ref, ref } from "vue";
import { useSharedElementTypeSelection } from "../shared/SharedElementTypeSelection.composable";

interface Props {
	closeDialogMock?: jest.Mock;
}

interface ElementTypeSelectionOptions {
	icon: string;
	label: string;
	action: () => Promise<void>;
	testId: string;
}

export const setupSharedElementTypeSelectionMock = (props: Props = {}) => {
	const { closeDialogMock } = props;
	const mockedSharedElementTypeSelection = jest.mocked(
		useSharedElementTypeSelection
	);

	const closeDialog = closeDialogMock ?? jest.fn();
	const isDialogOpen = ref(false);
	const isDialogLoading = ref(false);

	const staticElementTypeOptions: Ref<Array<ElementTypeSelectionOptions>> = ref(
		[]
	);
	const dynamicElementTypeOptions: Ref<Array<ElementTypeSelectionOptions>> =
		ref([]);

	const mocks = {
		closeDialog,
		isDialogOpen,
		isDialogLoading,
		staticElementTypeOptions,
		dynamicElementTypeOptions,
	};

	mockedSharedElementTypeSelection.mockReturnValue(mocks);
	return mocks;
};
