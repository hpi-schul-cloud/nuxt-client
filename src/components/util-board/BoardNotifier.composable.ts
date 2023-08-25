import { useI18n } from "@/composables/i18n.composable";
import { NOTIFIER_MODULE_KEY, injectStrict } from "@/utils/inject";

// WIP: move to @/types/
export type ErrorType =
	| "notCreated"
	| "notLoaded"
	| "notUpdated"
	| "notDeleted";

export type BoardObjectType =
	| "board"
	| "boardColumn"
	| "boardCard"
	| "boardElement";

export const useBoardNotifier = () => {
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

	const resetNotifier = () => {
		notifierModule.setNotifier(undefined);
	};

	return {
		resetNotifier,
		showCustomNotifier,
		showFailure,
		showInfo,
		showSuccess,
	};
};
