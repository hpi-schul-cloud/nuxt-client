import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { ref } from "vue";

interface Props {
	askConfirmationMock?: ReturnType<typeof vi.fn>;
}

export default function setupConfirmationComposableMock(props: Props = {}) {
	const { askConfirmationMock } = props;
	const confirmationMock = vi.mocked(useConfirmationDialog);

	const askConfirmation = askConfirmationMock ?? vi.fn();
	const isDialogOpen = ref(false);

	const mocks = {
		askConfirmation,
		isDialogOpen,
	};

	confirmationMock.mockReturnValue(mocks);

	return mocks;
}
