import { createMock } from "@golevelup/ts-vitest";
import { AxiosHeaders, AxiosResponse, AxiosResponseHeaders } from "axios";

export const mockApiResponse = <T>(
	values: Partial<AxiosResponse<T>>
): AxiosResponse<T> => {
	const response: AxiosResponse<T> = {
		data: {} as unknown as T,
		status: 200,
		statusText: "",
		headers: createMock<AxiosResponseHeaders>(),
		config: { headers: createMock<AxiosHeaders>() },
		...values,
	};
	return response;
};
