import { ApiResponseError, ApiValidationError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { useNotificationStore } from "@data-app";
import { logger } from "@util-logger";
import { useI18n } from "vue-i18n";

export type ErrorType = "notCreated" | "notLoaded" | "notUpdated" | "notDeleted" | "notMoved";

export type BoardObjectType = "board" | "boardColumn" | "boardRow" | "boardCard" | "boardElement";

type ErrorStatus = "success" | "error" | "warning" | "info";

export type ApiErrorHandler = (error?: ApiResponseError | ApiValidationError) => Promise<void> | void;

export type ApiErrorHandlerFactory = (
	errorType: ErrorType,
	boardObjectType?: BoardObjectType,
	status?: ErrorStatus,
	timeout?: number
) => ApiErrorHandler;

export type ErrorMap = Record<number, ApiErrorHandler>;

export const useErrorHandler = () => {
	const { t } = useI18n();

	const generateErrorText = (errorType: ErrorType, boardObjectType?: BoardObjectType) => {
		let errorKey = `components.board.notifications.errors.${errorType}`;
		if (!t(errorKey)) {
			errorKey = "error.generic";
		}

		const type = boardObjectType ? t(`components.${boardObjectType}`) : "";

		return t(errorKey, { type }).toString();
	};

	const notifyWithTemplate: ApiErrorHandlerFactory =
		(
			errorType: ErrorType,
			boardObjectType?: BoardObjectType,
			status: ErrorStatus = "error",
			duration?: number
		): ApiErrorHandler =>
		() => {
			const text = generateErrorText(errorType, boardObjectType);
			useNotificationStore().notify({ text, status, duration });
		};

	const defaultErrorMap: ErrorMap = {
		404: notifyWithTemplate("notLoaded"),
		500: notifyWithTemplate("notLoaded"),
	};

	const notifySocketError = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType,
		status: ErrorStatus = "error",
		duration?: number
	) => {
		const text = generateErrorText(errorType, boardObjectType);
		useNotificationStore().notify({ text, status, duration });
	};

	const handleError = (error: unknown, errorMap?: Partial<ErrorMap>) => {
		const responseError = mapAxiosErrorToResponseError(error);
		const mergedErrorMap = { ...defaultErrorMap, ...errorMap };
		const handlerFunction = mergedErrorMap[responseError.code];
		if (handlerFunction) {
			handlerFunction(responseError);
		} else {
			console.error(error);
			logger.error(error);
		}
	};

	const handleAnyError = (error: unknown, handlerFunction: ApiErrorHandler) => {
		console.error(error);
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
