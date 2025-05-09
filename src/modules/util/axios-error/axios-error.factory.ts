import { AxiosError, AxiosRequestHeaders } from "axios";

type Options = {
	statusCode?: number;
	statusText?: string;
	message?: string;
	data?: unknown;
};

export const createAxiosError = (options: Options = {}) => {
	return new AxiosError(
		options.message ?? "Unauthorized",
		options.statusCode?.toString() ?? "401",
		{ headers: {} as AxiosRequestHeaders },
		{},
		{
			data: options.data ?? { message: options.message ?? "the error message" },
			status: options.statusCode ?? 401,
			statusText: options.statusText ?? "Unauthorized",
			headers: {},
			config: { headers: {} as AxiosRequestHeaders },
		}
	);
};
