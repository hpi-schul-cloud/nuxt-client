import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { mock } from "vitest-mock-extended";

export class AxiosResponseFactory {
	static create<T>(data: T): AxiosResponse<T> {
		return {
			data,
			status: 200,
			statusText: "OK",
			headers: {},
			config: mock<InternalAxiosRequestConfig>(),
		};
	}
}
