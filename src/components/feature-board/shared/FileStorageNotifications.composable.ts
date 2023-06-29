import { envConfigModule } from "@/store";
import { ApiResponseError } from "@/store/types/commons";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { Values } from "vue-i18n";
import { useBoardNotifier } from "./BoardNotifications.composable";

export const useFileStorageNotifier = () => {
	const i18n = injectStrict(I18N_KEY);
	const { showFailure } = useBoardNotifier();

	const getMaxFileSize = (): number => {
		return envConfigModule.getMaxFileSize;
	};

	const showForbiddenError = () => {
		const message = getMessageString("error.403");

		showFailure(message);
	};

	const showUnauthorizedError = () => {
		const message = getMessageString("error.401");

		showFailure(message);
	};

	const showInternalServerError = () => {
		const message = getMessageString(
			"components.board.notifications.errors.fileServiceNotAvailable"
		);

		showFailure(message);
	};

	const showFileExistsError = () => {
		const message = getMessageString(
			"components.board.notifications.errors.fileNameExists"
		);

		showFailure(message);
	};

	const showFileTooBigError = () => {
		const message = getMessageString(
			"components.board.notifications.errors.fileToBig",
			{ maxFileSizeInGb: getMaxFileSize() }
		);

		showFailure(message);
	};

	const getMessageString = (i18nKey: string, props?: Values) => {
		return i18n.t(i18nKey, props).toString();
	};

	const showErrorFromResponse = (error: ApiResponseError): void => {
		const { message } = error;

		showErrorByMessage(message);
	};

	const showErrorByMessage = (message: string) => {
		switch (message) {
			case "FILE_TOO_BIG":
				showFileTooBigError();
				break;
			case "FILE_NAME_EXISTS":
				showFileExistsError();
				break;
			case "Unauthorized":
				showUnauthorizedError();
				break;
			case "Forbidden":
				showForbiddenError();
				break;
			default:
				showInternalServerError();
				break;
		}
	};

	return {
		showErrorFromResponse,
		getMaxFileSize,
		showFileTooBigError,
	};
};
