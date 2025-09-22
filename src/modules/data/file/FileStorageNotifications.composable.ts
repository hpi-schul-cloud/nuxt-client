import { formatFileSize } from "@/utils/fileHelper";
import { NOTIFIER_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useI18n } from "vue-i18n";
import { useEnvFileConfig } from "@data-env";

export const useFileStorageNotifier = () => {
	const { t } = useI18n();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

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
		const maxFileSizeWithUnit = formatFileSize(
			useEnvFileConfig().value.MAX_FILE_SIZE
		);

		const message = t("components.board.notifications.errors.fileToBig", {
			maxFileSizeWithUnit,
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
