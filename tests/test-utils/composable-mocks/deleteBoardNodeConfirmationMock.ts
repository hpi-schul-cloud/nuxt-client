import { useDeleteBoardNodeConfirmation } from "@/feature/board";
import { jest } from "@jest/globals";
import { ref } from "vue";

interface Props {
	askDeleteBoardNodeConfirmationMock?: jest.Mock;
}

export const setupDeleteBoardNodeConfirmationMock = (props: Props = {}) => {
	const { askDeleteBoardNodeConfirmationMock } = props;
	const mockedDeleteBoardNodeConfirmation = jest.mocked(
		useDeleteBoardNodeConfirmation
	);

	const askDeleteBoardNodeConfirmation =
		askDeleteBoardNodeConfirmationMock ?? jest.fn();
	const isDeleteDialogOpen = ref(false);

	const mocks = {
		askDeleteBoardNodeConfirmation,
		isDeleteDialogOpen,
	};
	mockedDeleteBoardNodeConfirmation.mockReturnValue(mocks);

	return mocks;
};
