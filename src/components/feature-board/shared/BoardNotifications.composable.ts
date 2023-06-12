import { notifierModule } from "@/store";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

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

	const isErrorCode = (statusCode: HttpStatusCode) => {
		if (statusCode >= 300) return true;
		return false;
	};

	return {
		isErrorCode,
		showSuccess,
		showFailure,
		showInfo,
		showCustomNotifier,
	};
};
