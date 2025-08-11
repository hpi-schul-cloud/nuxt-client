import { createMock } from "@golevelup/ts-vitest";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export class AxiosResponseFactory {
	static create<T>(data: T): AxiosResponse<T> {
		return {
			data,
			status: 200,
			statusText: "OK",
			headers: {},
			config: createMock<InternalAxiosRequestConfig>(),
		};
	}
}
