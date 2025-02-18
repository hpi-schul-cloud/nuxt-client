import { AxiosError, AxiosHeaders } from "axios";
import { DeepPartial, Factory } from "fishery";
import { apiResponseErrorFactory } from "./apiResponseErrorFactory";

class AxiosErrorFactory extends Factory<AxiosError> {
	withStatusCode(statusCode: number): this {
		const params: DeepPartial<AxiosError> = {
			response: {
				data: {
					code: statusCode,
				},
				status: statusCode,
			},
		};

		return this.params(params);
	}
}

export const axiosErrorFactory = AxiosErrorFactory.define(({ sequence }) => ({
	isAxiosError: true,
	response: {
		data: apiResponseErrorFactory.build(),
		status: 0,
		statusText: `Error # ${sequence}`,
		config: { headers: new AxiosHeaders() },
		headers: {},
		request: {},
	},
	name: `Error # ${sequence}`,
	message: `Error # ${sequence}`,
	toJSON: async () => JSON.stringify(this),
}));
