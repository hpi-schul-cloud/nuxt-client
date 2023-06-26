import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { I18N_KEY, NOTIFIER_MODULE_KEY, injectStrict } from "@/utils/inject";

type ErrorTypes = "create" | "read" | "update" | "delete";
type BoardObjectTypes = "board" | "boardColumn" | "boardCard" | "boardElement";

export const useBoardNotifier = () => {
	const i18n = injectStrict(I18N_KEY);

	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

	const showSuccess = (text: string | undefined) => {
		notifierModule.show({
			text,
			status: "success",
			autoClose: true,
		});
	};

	const showFailure = (text: string | undefined) => {
		notifierModule.show({
			text,
			status: "error",
			timeout: 10000,
		});
	};

	const showInfo = (text: string | undefined, autoClose = true) => {
		notifierModule.show({
			text,
			status: "info",
			autoClose,
		});
	};

	const showCustomNotifier = (
		text: string,
		status: "success" | "error" | "warning" | "info",
		timeout = 5000
	) => {
		notifierModule.show({
			text,
			status,
			timeout,
		});
	};

	const isErrorCode = (statusCode: HttpStatusCode) => {
		if (statusCode >= 300) return true;
		return false;
	};

	const generateErrorText = (
		errorType: ErrorTypes,
		boardObjectType?: BoardObjectTypes
	) => {
		const errorTextMap = {
			create: "components.board.notifications.errors.notCreated",
			read: "components.board.notifications.errors.notLoaded",
			update: "components.board.notifications.errors.notUpdated",
			delete: "components.board.notifications.errors.notDeleted",
		};

		const errorKey = errorTextMap[errorType] ?? "error.generic";

		return boardObjectType
			? i18n
					.t(errorKey, {
						type: i18n?.t(`components.${boardObjectType}`),
					})
					.toString()
			: i18n.t(errorKey).toString();
	};

	return {
		generateErrorText,
		isErrorCode,
		showCustomNotifier,
		showFailure,
		showInfo,
		showSuccess,
	};
};
