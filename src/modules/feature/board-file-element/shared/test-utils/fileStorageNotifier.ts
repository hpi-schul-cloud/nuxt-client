import { Jest as jest } from "@jest/environment";
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

	const showFileTooBigError = showFileTooBigErrorMock ?? vi.fn();
	const showForbiddenError = showForbiddenErrorMock ?? vi.fn();
	const showUnauthorizedError = showUnauthorizedErrorMock ?? vi.fn();
	const showInternalServerError = showInternalServerErrorMock ?? vi.fn();
	const showFileExistsError = showFileExistsErrorMock ?? vi.fn();

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
