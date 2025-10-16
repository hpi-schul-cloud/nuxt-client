import { useSharedElementTypeSelection } from "../shared/SharedElementTypeSelection.composable";
import { Mock } from "vitest";
import { computed, ComputedRef, Ref, ref } from "vue";

interface Props {
	closeDialogMock?: Mock;
	closeCollaboraDialogMock?: Mock;
	openCollaboraDialogMock?: Mock;
}

interface ElementTypeSelectionOptions {
	icon: string;
	label: string;
	action: () => Promise<void>;
	testId: string;
}

interface CollaboraElementTypeSelectionOptions {
	id: string;
	label: string;
	action: (fileName: string, caption: string) => Promise<void>;
}

export const setupSharedElementTypeSelectionMock = (props: Props = {}) => {
	const { closeDialogMock, openCollaboraDialogMock, closeCollaboraDialogMock } = props;
	const mockedSharedElementTypeSelection = vi.mocked(useSharedElementTypeSelection);

	const closeDialog = closeDialogMock ?? vi.fn();
	const openCollaboraDialog = openCollaboraDialogMock ?? vi.fn();
	const closeCollaboraDialog = closeCollaboraDialogMock ?? vi.fn();
	const isDialogOpen = ref(false);
	const isDialogLoading = ref(false);
	const isCollaboraDialogOpen = ref(false);

	const staticElementTypeOptions: Ref<Array<ElementTypeSelectionOptions>> = ref([]);
	const collaboraElementTypeOptions: Ref<Array<CollaboraElementTypeSelectionOptions>> = ref([]);
	const dynamicElementTypeOptions: Ref<Array<ElementTypeSelectionOptions>> = ref([]);
	const elementTypeOptions: ComputedRef<Array<ElementTypeSelectionOptions>> = computed(() => [
		...staticElementTypeOptions.value,
		...dynamicElementTypeOptions.value,
	]);

	const mocks = {
		closeDialog,
		openCollaboraDialog,
		closeCollaboraDialog,
		isDialogOpen,
		isDialogLoading,
		isCollaboraDialogOpen,
		staticElementTypeOptions,
		dynamicElementTypeOptions,
		elementTypeOptions,
		collaboraElementTypeOptions,
	};

	mockedSharedElementTypeSelection.mockReturnValue(mocks);

	return mocks;
};
