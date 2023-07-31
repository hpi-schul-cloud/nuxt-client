import { AxiosError, AxiosHeaders } from "axios";
import { Factory } from "fishery";
import { apiResponseErrorFactory } from "./apiResponseErrorFactory";

export const axiosErrorFactory = Factory.define<AxiosError>(({ sequence }) => ({
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
