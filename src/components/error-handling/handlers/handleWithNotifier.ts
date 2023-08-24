import {
	ApiErrorHandler,
	ApiErrorHandlerFactory,
} from "@/components/error-handling/handleError";
import { BoardObjectType, ErrorType, useBoardNotifier } from "@util-board";

export const handleWithNotifier: ApiErrorHandlerFactory = (
	errorType: ErrorType,
	boardObjectType?: BoardObjectType,
	status: "success" | "error" | "warning" | "info" = "error",
	timeout?: number
): ApiErrorHandler => {
	const { generateErrorText, showCustomNotifier } = useBoardNotifier();
	return () => {
		const text = generateErrorText(errorType, boardObjectType);
		showCustomNotifier(text, status, timeout);
	};
};
