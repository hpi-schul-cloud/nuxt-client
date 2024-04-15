import { ApiResponseError, ApiValidationError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";

export type ErrorType =
	| "notCreated"
	| "notLoaded"
	| "notUpdated"
	| "notDeleted";

export type BoardObjectType =
	| "board"
	| "boardColumn"
	| "boardRow"
	| "boardCard"
	| "boardElement";

export type ApiErrorHandler = (
	error?: ApiResponseError | ApiValidationError
) => Promise<void> | void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiErrorHandlerFactory = (...args: any[]) => ApiErrorHandler;

export type ErrorMap = Record<number, ApiErrorHandler>;

export const useErrorHandler = () => {
	const { t, te } = useI18n();

	const { showCustomNotifier } = useBoardNotifier();

	const generateErrorText = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		let errorKey = `components.board.notifications.errors.${errorType}`;
		if (!te(errorKey)) errorKey = "error.generic";

		const type = boardObjectType ? t(`components.${boardObjectType}`) : "";

		return t(errorKey, { type }).toString();
	};

	const notifyWithTemplate: ApiErrorHandlerFactory = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType,
		status: "success" | "error" | "warning" | "info" = "error",
		timeout?: number
	): ApiErrorHandler => {
		return () => {
			const text = generateErrorText(errorType, boardObjectType);
			showCustomNotifier(text, status, timeout);
		};
	};

	const defaultErrorMap: ErrorMap = {
		404: notifyWithTemplate("notLoaded"),
		500: notifyWithTemplate("notLoaded"),
	};

	const handleError = (error: unknown, errorMap?: Partial<ErrorMap>) => {
		const responseError = mapAxiosErrorToResponseError(error);
		const mergedErrorMap = { ...defaultErrorMap, ...errorMap };
		const handlerFunction = mergedErrorMap[responseError.code];
		if (handlerFunction) {
			handlerFunction(responseError);
		} else {
			console.error(error);
		}
	};

	const handleAnyError = (error: unknown, handlerFunction: ApiErrorHandler) => {
		const responseError = mapAxiosErrorToResponseError(error);

		handlerFunction(responseError);
	};

	return {
		handleError,
		handleAnyError,
		notifyWithTemplate,
		generateErrorText,
	};
};
