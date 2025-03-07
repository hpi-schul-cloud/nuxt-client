import { ApiResponseError, ApiValidationError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { useBoardNotifier } from "@util-board";
import { Logger } from "@util-logger";
import { useI18n } from "vue-i18n";

export type ErrorType =
	| "notCreated"
	| "notLoaded"
	| "notUpdated"
	| "notDeleted"
	| "notMoved";

export type BoardObjectType =
	| "board"
	| "boardColumn"
	| "boardRow"
	| "boardCard"
	| "boardElement";

type ErrorStatus = "success" | "error" | "warning" | "info";

export type ApiErrorHandler = (
	error?: ApiResponseError | ApiValidationError
) => Promise<void> | void;

export type ApiErrorHandlerFactory = (
	errorType: ErrorType,
	boardObjectType?: BoardObjectType,
	status?: ErrorStatus,
	timeout?: number
) => ApiErrorHandler;

export type ErrorMap = Record<number, ApiErrorHandler>;

export const useErrorHandler = () => {
	const { t } = useI18n();

	const { showCustomNotifier } = useBoardNotifier();

	const generateErrorText = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		let errorKey = `components.board.notifications.errors.${errorType}`;
		if (!t(errorKey)) {
			errorKey = "error.generic";
		}

		const type = boardObjectType ? t(`components.${boardObjectType}`) : "";

		return t(errorKey, { type }).toString();
	};

	const notifyWithTemplate: ApiErrorHandlerFactory = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType,
		status: ErrorStatus = "error",
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

	const notifySocketError = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType,
		status: ErrorStatus = "error",
		timeout?: number
	): void => {
		const text = generateErrorText(errorType, boardObjectType);
		showCustomNotifier(text, status, timeout);
	};

	const handleError = (error: unknown, errorMap?: Partial<ErrorMap>) => {
		const responseError = mapAxiosErrorToResponseError(error);
		const mergedErrorMap = { ...defaultErrorMap, ...errorMap };
		const handlerFunction = mergedErrorMap[responseError.code];
		if (handlerFunction) {
			handlerFunction(responseError);
		} else {
			Logger.error(error);
		}
	};

	const handleAnyError = (error: unknown, handlerFunction: ApiErrorHandler) => {
		const responseError = mapAxiosErrorToResponseError(error);

		handlerFunction(responseError);
	};

	return {
		handleError,
		handleAnyError,
		generateErrorText,
		notifySocketError,
		notifyWithTemplate,
	};
};
