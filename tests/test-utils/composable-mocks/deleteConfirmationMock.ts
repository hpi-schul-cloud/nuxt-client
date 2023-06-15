import { useDeleteConfirmation } from "@/components/feature-confirmation-dialog/delete-confirmation.composable";
import { jest } from "@jest/globals";

interface Props {
	askConfirmationMock?: jest.Mock;
}

export const setupDeleteConfirmationMock = (props: Props = {}) => {
	const { askConfirmationMock } = props;
	const mockedDeleteConfirmation = jest.mocked(useDeleteConfirmation);

	const askConfirmation = askConfirmationMock ?? jest.fn();

	const mocks = {
		askConfirmation,
	};

	mockedDeleteConfirmation.mockReturnValue(mocks);

	return mocks;
};
