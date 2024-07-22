import { jest } from "@jest/globals";
import { useCollaborativeTextEditorNotifier } from "../composables/CollaborativeTextEditorNotifications.composable";

interface Props {
	showForbiddenErrorMock?: () => void;
	showUnauthorizedErrorMock?: () => void;
	showInternalServerErrorMock?: () => void;
}

export const setupCollaborativeTextEditorNotifier = (props: Props = {}) => {
	const {
		showForbiddenErrorMock,
		showUnauthorizedErrorMock,
		showInternalServerErrorMock,
	} = props;

	const mockedSelectedFile = jest.mocked(useCollaborativeTextEditorNotifier);

	const showForbiddenError = showForbiddenErrorMock ?? jest.fn();
	const showUnauthorizedError = showUnauthorizedErrorMock ?? jest.fn();
	const showInternalServerError = showInternalServerErrorMock ?? jest.fn();

	const mocks = {
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
	};

	mockedSelectedFile.mockReturnValue(mocks);

	return mocks;
};
