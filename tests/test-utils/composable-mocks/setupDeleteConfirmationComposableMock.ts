import { ref } from "vue";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";

interface Props {
	askDeleteConfirmationMock?: () => Promise<boolean>;
}

export default function setupDeleteConfirmationComposableMock(
	props: Props = {}
) {
	const { askDeleteConfirmationMock } = props;
	const deleteConfirmationMock = vi.mocked(useDeleteConfirmationDialog);

	const askDeleteConfirmation = askDeleteConfirmationMock ?? vi.fn();
	const isDeleteDialogOpen = ref(false);

	const mocks = {
		askDeleteConfirmation,
		isDeleteDialogOpen,
	};

	deleteConfirmationMock.mockReturnValue(mocks);

	return mocks;
}
