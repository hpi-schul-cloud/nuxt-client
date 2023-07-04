import { useFileStorageNotifier } from "@/components/feature-board/shared/FileStorageNotifications.composable";
import { jest } from "@jest/globals";

interface Props {
	getMaxFileSizeMock?: () => number;
	showFileTooBigErrorMock?: () => void;
	showForbiddenErrorMock?: () => void;
	showUnauthorizedErrorMock?: () => void;
	showInternalServerErrorMock?: () => void;
	showFileExistsErrorMock?: () => void;
}

export const setupFileStorageNotifier = (props: Props = {}) => {
	const {
		getMaxFileSizeMock,
		showFileTooBigErrorMock,
		showForbiddenErrorMock,
		showUnauthorizedErrorMock,
		showInternalServerErrorMock,
		showFileExistsErrorMock,
	} = props;

	const mockedSelectedFile = jest.mocked(useFileStorageNotifier);

	const getMaxFileSize = getMaxFileSizeMock ?? jest.fn();
	const showFileTooBigError = showFileTooBigErrorMock ?? jest.fn();
	const showForbiddenError = showForbiddenErrorMock ?? jest.fn();
	const showUnauthorizedError = showUnauthorizedErrorMock ?? jest.fn();
	const showInternalServerError = showInternalServerErrorMock ?? jest.fn();
	const showFileExistsError = showFileExistsErrorMock ?? jest.fn();

	const mocks = {
		getMaxFileSize,
		showFileTooBigError,
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
		showFileExistsError,
	};

	mockedSelectedFile.mockReturnValue(mocks);

	return mocks;
};
