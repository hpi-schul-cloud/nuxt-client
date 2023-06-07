import { notifierModule } from "@/store";

export const useBoardNotifier = () => {
	const showSuccess = () => {
		notifierModule?.show({
			text: "success text",
			status: "success",
			autoClose: true,
		});
	};

	const showFailure = () => {
		notifierModule?.show({
			text: "failure text",
			status: "error",
			autoClose: false,
		});
	};

	const showInfo = () => {
		notifierModule?.show({
			text: "info text",
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
