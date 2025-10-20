import { useSharedElementTypeSelection } from "../shared/SharedElementTypeSelection.composable";
import { Mock } from "vitest";
import { computed, ComputedRef, Ref, ref } from "vue";

interface Props {
	closeDialogMock?: Mock;
}

interface ElementTypeSelectionOptions {
	icon: string;
	label: string;
	action: () => Promise<void>;
	testId: string;
}

export const setupSharedElementTypeSelectionMock = (props: Props = {}) => {
	const { closeDialogMock } = props;
	const mockedSharedElementTypeSelection = vi.mocked(useSharedElementTypeSelection);

	const closeDialog = closeDialogMock ?? vi.fn();
	const isDialogOpen = ref(false);
	const isDialogLoading = ref(false);

	const staticElementTypeOptions: Ref<Array<ElementTypeSelectionOptions>> = ref([]);
	const dynamicElementTypeOptions: Ref<Array<ElementTypeSelectionOptions>> = ref([]);
	const elementTypeOptions: ComputedRef<Array<ElementTypeSelectionOptions>> = computed(() => [
		...staticElementTypeOptions.value,
		...dynamicElementTypeOptions.value,
	]);

	const mocks = {
		closeDialog,
		isDialogOpen,
		isDialogLoading,
		staticElementTypeOptions,
		dynamicElementTypeOptions,
		elementTypeOptions,
	};

	mockedSharedElementTypeSelection.mockReturnValue(mocks);

	return mocks;
};
