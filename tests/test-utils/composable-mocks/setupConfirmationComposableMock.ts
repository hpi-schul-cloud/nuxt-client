import { jest } from "@jest/globals";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { ref } from "vue";

interface Props {
	askConfirmationMock?: jest.Mock;
}

export default function setupConfirmationComposableMock(props: Props = {}) {
	const { askConfirmationMock } = props;
	const confirmationMock = jest.mocked(useConfirmationDialog);

	const askConfirmation = askConfirmationMock ?? jest.fn();
	const isDialogOpen = ref(false);

	const mocks = {
		askConfirmation,
		isDialogOpen,
	};

	confirmationMock.mockReturnValue(
		mocks as ReturnType<typeof useConfirmationDialog>
	);

	return mocks;
}
