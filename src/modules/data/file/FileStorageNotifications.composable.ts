import { convertFileSize } from "@/utils/fileHelper";
import {
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { useI18n } from "vue-i18n";

export const useFileStorageNotifier = () => {
	const { t, n } = useI18n();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

	const showFailure = (text: string | undefined) => {
		notifierModule.show({
			text,
			status: "error",
			timeout: 5000,
		});
	};

	const showForbiddenError = () => {
		const message = t("error.403");

		showFailure(message);
	};

	const showUnauthorizedError = () => {
		const message = t("error.401");

		showFailure(message);
	};

	const showInternalServerError = () => {
		const message = t(
			"components.board.notifications.errors.fileServiceNotAvailable"
		);

		showFailure(message);
	};

	const showFileNotDeletedError = () => {
		const message = t("components.board.notifications.errors.fileNotDeleted");
		showFailure(message);
	};

	const showFileExistsError = () => {
		const message = t("components.board.notifications.errors.fileNameExists");

		showFailure(message);
	};

	const showFileTooBigError = () => {
		const { convertedSize, unit } = convertFileSize(
			envConfigModule.getMaxFileSize
		);
		const localizedFileSize = n(convertedSize, "fileSize");

		const message = t("components.board.notifications.errors.fileToBig", {
			maxFileSizeWithUnit: `${localizedFileSize} ${unit}`,
		});

		showFailure(message);
	};

	return {
		showFileTooBigError,
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
		showFileExistsError,
		showFileNotDeletedError,
	};
};
