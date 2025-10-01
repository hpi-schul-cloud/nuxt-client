import { useCollaborativeTextEditorNotifier } from "../composables/CollaborativeTextEditorNotifications.composable";

interface Props {
	showForbiddenErrorMock?: () => void;
	showUnauthorizedErrorMock?: () => void;
	showInternalServerErrorMock?: () => void;
}

export const setupCollaborativeTextEditorNotifier = (props: Props = {}) => {
	const { showForbiddenErrorMock, showUnauthorizedErrorMock, showInternalServerErrorMock } = props;

	const mockedSelectedFile = vi.mocked(useCollaborativeTextEditorNotifier);

	const showForbiddenError = showForbiddenErrorMock ?? vi.fn();
	const showUnauthorizedError = showUnauthorizedErrorMock ?? vi.fn();
	const showInternalServerError = showInternalServerErrorMock ?? vi.fn();

	const mocks = {
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
	};

	mockedSelectedFile.mockReturnValue(mocks);

	return mocks;
};
