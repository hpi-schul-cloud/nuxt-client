import { useFileStorageNotifier } from "../FileStorageNotifications.composable";

interface Props {
	showFileTooBigErrorMock?: () => void;
	showForbiddenErrorMock?: () => void;
	showUnauthorizedErrorMock?: () => void;
	showInternalServerErrorMock?: () => void;
	showFileExistsErrorMock?: () => void;
	showFileNotDeletedErrorMock?: () => void;
}

export const setupFileStorageNotifier = (props: Props = {}) => {
	const {
		showFileTooBigErrorMock,
		showForbiddenErrorMock,
		showUnauthorizedErrorMock,
		showInternalServerErrorMock,
		showFileExistsErrorMock,
		showFileNotDeletedErrorMock,
	} = props;

	const mockedSelectedFile = vi.mocked(useFileStorageNotifier);

	const showFileTooBigError = showFileTooBigErrorMock ?? vi.fn();
	const showForbiddenError = showForbiddenErrorMock ?? vi.fn();
	const showUnauthorizedError = showUnauthorizedErrorMock ?? vi.fn();
	const showInternalServerError = showInternalServerErrorMock ?? vi.fn();
	const showFileExistsError = showFileExistsErrorMock ?? vi.fn();
	const showFileNotDeletedError = showFileNotDeletedErrorMock ?? vi.fn();

	const mocks = {
		showFileTooBigError,
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
		showFileExistsError,
		showFileNotDeletedError,
	};

	mockedSelectedFile.mockReturnValue(mocks);

	return mocks;
};
