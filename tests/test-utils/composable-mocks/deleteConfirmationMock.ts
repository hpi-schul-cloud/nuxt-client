import { useDeleteConfirmation } from "@/components/feature-confirmation-dialog/delete-confirmation.composable";
import { jest } from "@jest/globals";
import { ref } from "vue";

interface Props {
	askConfirmationMock?: jest.Mock;
}

export const setupDeleteConfirmationMock = (props: Props = {}) => {
	const { askConfirmationMock } = props;
	const mockedDeleteConfirmation = jest.mocked(useDeleteConfirmation);

	const askConfirmation = askConfirmationMock ?? jest.fn();
	const isDialogOpen = ref(false);

	const mocks = {
		askConfirmation,
		isDialogOpen,
	};

	mockedDeleteConfirmation.mockReturnValue(mocks);

	return mocks;
};
