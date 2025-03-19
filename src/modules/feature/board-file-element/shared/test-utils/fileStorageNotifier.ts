import { useFileStorageNotifier } from "../composables/FileStorageNotifications.composable";

interface Props {
	showFileTooBigErrorMock?: () => void;
	showForbiddenErrorMock?: () => void;
	showUnauthorizedErrorMock?: () => void;
	showInternalServerErrorMock?: () => void;
	showFileExistsErrorMock?: () => void;
}

export const setupFileStorageNotifier = (props: Props = {}) => {
	const {
		showFileTooBigErrorMock,
		showForbiddenErrorMock,
		showUnauthorizedErrorMock,
		showInternalServerErrorMock,
		showFileExistsErrorMock,
	} = props;

	const mockedSelectedFile = jest.mocked(useFileStorageNotifier);

	const showFileTooBigError = showFileTooBigErrorMock ?? jest.fn();
	const showForbiddenError = showForbiddenErrorMock ?? jest.fn();
	const showUnauthorizedError = showUnauthorizedErrorMock ?? jest.fn();
	const showInternalServerError = showInternalServerErrorMock ?? jest.fn();
	const showFileExistsError = showFileExistsErrorMock ?? jest.fn();

	const mocks = {
		showFileTooBigError,
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
		showFileExistsError,
	};

	mockedSelectedFile.mockReturnValue(mocks);

	return mocks;
};
