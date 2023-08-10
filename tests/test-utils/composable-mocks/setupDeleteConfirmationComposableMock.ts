import { jest } from "@jest/globals";
import { ref } from "vue";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";

interface Props {
	askDeleteConfirmationMock?: () => boolean;
}

jest.mock("@ui-confirmation-dialog");

export default function setupDeleteConfirmationComposableMock(
	props: Props = {}
) {
	const { askDeleteConfirmationMock } = props;
	const deleteConfirmationMock = jest.mocked(useDeleteConfirmationDialog);

	const askDeleteConfirmation = askDeleteConfirmationMock ?? jest.fn();
	const isDeleteDialogOpen = ref(false);

	const mocks = {
		askDeleteConfirmation,
		isDeleteDialogOpen,
	};

	deleteConfirmationMock.mockReturnValue(mocks);

	return mocks;
}
