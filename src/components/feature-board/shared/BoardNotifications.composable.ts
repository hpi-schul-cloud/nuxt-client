import { notifierModule } from "@/store";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import VueI18n from "vue-i18n";
import { inject } from "vue";

type ErrorTypes = "create" | "read" | "update" | "delete";
type BoardObjectTypes = "board" | "boardColumn" | "boardCard" | "boardElement";

export const useBoardNotifier = () => {
	const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
	const showSuccess = (text: string | undefined) => {
		notifierModule?.show({
			text,
			status: "success",
			autoClose: true,
		});
	};

	const showFailure = (text: string | undefined) => {
		notifierModule?.show({
			text,
			status: "error",
			timeout: 10000,
		});
	};

	const showInfo = (text: string | undefined) => {
		notifierModule?.show({
			text,
			status: "info",
			autoClose: true,
		});
	};

	const showCustomNotifier = (
		text: string,
		status: "success" | "error" | "warning" | "info",
		timeout = 5000
	) => {
		notifierModule?.show({
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

		return i18n
			?.t(errorKey, { type: i18n?.t(`components.${boardObjectType}`) })
			.toString();
	};

	return {
		isErrorCode,
		showSuccess,
		showFailure,
		showInfo,
		showCustomNotifier,
		generateErrorText,
	};
};
