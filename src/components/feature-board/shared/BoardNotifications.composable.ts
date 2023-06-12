import { notifierModule } from "@/store";

export const useBoardNotifier = () => {
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

	return {
		showSuccess,
		showFailure,
		showInfo,
		showCustomNotifier,
	};
};
