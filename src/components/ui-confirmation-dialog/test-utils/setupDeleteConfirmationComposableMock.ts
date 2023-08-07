import { jest } from "@jest/globals";
import { useDeleteConfirmationDialog } from "../DeleteConfirmation.composable";
import { ref } from "vue";

interface Props {
	askDeleteConfirmationMock?: jest.Mock;
}

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
