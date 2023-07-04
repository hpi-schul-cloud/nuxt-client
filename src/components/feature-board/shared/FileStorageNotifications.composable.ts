import {
	ENV_CONFIG_MODULE_KEY,
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { Values } from "vue-i18n";

export const useFileStorageNotifier = () => {
	const i18n = injectStrict(I18N_KEY);
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

	const showFailure = (text: string | undefined) => {
		notifierModule.show({
			text,
			status: "error",
			timeout: 10000,
		});
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
			{ maxFileSizeInGb: envConfigModule.getMaxFileSize }
		);

		showFailure(message);
	};

	const getMessageString = (i18nKey: string, props?: Values) => {
		return i18n.t(i18nKey, props).toString();
	};

	return {
		showFileTooBigError,
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
		showFileExistsError,
	};
};
