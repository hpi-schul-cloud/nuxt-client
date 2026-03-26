import { AxiosHeaders, AxiosResponse, AxiosResponseHeaders } from "axios";

export const mockApiResponse = <T>(values: Partial<AxiosResponse<T>>): AxiosResponse<T> => {
	const response: AxiosResponse<T> = {
		data: {} as unknown as T,
		status: 200,
		statusText: "",
		headers: {} as AxiosResponseHeaders,
		config: { headers: {} as AxiosHeaders },
		...values,
	};
	return response;
};
