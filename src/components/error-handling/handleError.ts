import { handleWithNotifier } from "@/components/error-handling/handlers/handleWithNotifier";
import { ApiResponseError, ApiValidationError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";

export type ErrorHandler = (
	error?: ApiResponseError | ApiValidationError
) => Promise<void> | void;

type ErrorMap = Record<number, ErrorHandler>;

const defaultErrorMap: ErrorMap = {
	// WIP: define additional errorCode defaults
	404: handleWithNotifier("notLoaded"),
	500: handleWithNotifier("notLoaded"), // WIP: define better default notifications than "notLoaded"
};

export const handleError = (error: unknown, errorMap?: Partial<ErrorMap>) => {
	const responseError = mapAxiosErrorToResponseError(error);
	const mergedErrorMap = errorMap
		? { ...defaultErrorMap, ...errorMap }
		: defaultErrorMap;
	const handlerFunction =
		mergedErrorMap[responseError.code] || handleWithNotifier("notLoaded");
	handlerFunction(responseError);
};
