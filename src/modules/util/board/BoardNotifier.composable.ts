import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";

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
			timeout: 5000,
		});
	};

	const showInfo = (text: string | undefined, autoClose = true) => {
		notifierModule.show({
			text,
			status: "info",
			autoClose,
		});
	};

	const showCustomNotifier = (text: string, status: "success" | "error" | "warning" | "info", timeout = 5000) => {
		notifierModule.show({
			text,
			status,
			timeout,
		});
	};

	const resetNotifierModule = () => {
		notifierModule.reset();
	};

	return {
		resetNotifierModule,
		showCustomNotifier,
		showFailure,
		showInfo,
		showSuccess,
	};
};
