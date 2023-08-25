import { useI18n } from "@/composables/i18n.composable";
import { ApiResponseError, ApiValidationError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { BoardObjectType, ErrorType, useBoardNotifier } from "@util-board";

// WIP: move type
export type ApiErrorHandler = (
	error?: ApiResponseError | ApiValidationError
) => Promise<void> | void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiErrorHandlerFactory = (...args: any[]) => ApiErrorHandler;

export type ErrorMap = Record<number, ApiErrorHandler>;

export const useErrorHandler = () => {
	const { t } = useI18n();

	const { showCustomNotifier } = useBoardNotifier();

	const generateErrorText = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		const errorTextMap = {
			notCreated: "components.board.notifications.errors.notCreated",
			notLoaded: "components.board.notifications.errors.notLoaded",
			notUpdated: "components.board.notifications.errors.notUpdated",
			notDeleted: "components.board.notifications.errors.notDeleted",
		};

		const errorKey = errorTextMap[errorType] ?? "error.generic";

		return boardObjectType
			? t(errorKey, {
					type: t(`components.${boardObjectType}`),
			  }).toString()
			: t(errorKey).toString();
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
		// WIP: define additional errorCode defaults ? should that all be applicationErrors
		404: notifyWithTemplate("notLoaded"),
		500: notifyWithTemplate("notLoaded"),
	}; // WIP: define better default notifications than "notLoaded"

	const handleError = (error: unknown, errorMap?: Partial<ErrorMap>) => {
		const responseError = mapAxiosErrorToResponseError(error);
		const mergedErrorMap = { ...defaultErrorMap, ...errorMap };
		const handlerFunction = mergedErrorMap[responseError.code]; // WIP: have a nicer default
		if (handlerFunction) {
			handlerFunction(responseError);
		} else {
			console.error(responseError);
		}
	};

	return {
		handleError,
		notifyWithTemplate,
		generateErrorText,
	};
};
