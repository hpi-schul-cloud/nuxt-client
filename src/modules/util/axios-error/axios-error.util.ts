import { AxiosError } from "axios";

type ErrorData = {
	message: string;
	statusCode: number;
};

const defaultValues: ErrorData = {
	message: "UNKOWN_ERROR_MESSAGE",
	statusCode: 0,
};

export const extractErrorData = (
	error: unknown,
	defaults = defaultValues
): ErrorData => {
	const result = { ...defaults };

	if (error instanceof AxiosError && error.response) {
		if (error.response?.data?.message) {
			result.message = error.response.data.message;
		}

		if (error.response?.status) {
			result.statusCode = error.response.status;
		}
	}

	return result;
};
