import { handleWithNotifier } from "@/components/error-handling/handlers/handleWithNotifier";
import { ApiResponseError, ApiValidationError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";

// WIP: move type
export type ApiErrorHandler = (
	error?: ApiResponseError | ApiValidationError
) => Promise<void> | void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiErrorHandlerFactory = (...args: any[]) => ApiErrorHandler;

type ErrorMap = Record<number, ApiErrorHandler>;

const defaultErrorMap: ErrorMap = {
	// WIP: define additional errorCode defaults
	404: handleWithNotifier("notLoaded"),
	500: handleWithNotifier("notLoaded"), // WIP: define better default notifications than "notLoaded"
};

export const handleError = (error: unknown, errorMap?: Partial<ErrorMap>) => {
	const responseError = mapAxiosErrorToResponseError(error);
	const mergedErrorMap = { ...defaultErrorMap, ...errorMap };
	const handlerFunction =
		mergedErrorMap[responseError.code] || handleWithNotifier("notLoaded"); // WIP: have a nicer default
	handlerFunction(responseError);
};
