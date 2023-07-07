import { AxiosError } from "axios";
import { Factory } from "fishery";

export const axiosErrorFactory = Factory.define<AxiosError>(({ sequence }) => ({
	isAxiosError: true,
	name: `Error # ${sequence}`,
	message: `Error # ${sequence}`,
	toJSON: async () => JSON.stringify(this),
}));
