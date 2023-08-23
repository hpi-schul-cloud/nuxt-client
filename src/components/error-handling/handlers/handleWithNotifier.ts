import { ErrorHandler } from "@/components/error-handling/handleError";
import { BoardObjectType, ErrorType } from "@util-board";
import { useBoardNotifier } from "@util-board";

export const handleWithNotifier = (
	errorType: ErrorType,
	boardObjectType?: BoardObjectType,
	status: "success" | "error" | "warning" | "info" = "error",
	timeout?: number
): ErrorHandler => {
	const { generateErrorText, showCustomNotifier } = useBoardNotifier();
	return () => {
		const text = generateErrorText(errorType, boardObjectType);
		showCustomNotifier(text, status, timeout);
	};
};
