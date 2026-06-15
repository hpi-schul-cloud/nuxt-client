import { ApiResponseError } from "@/types/common/commons";
import { Factory } from "fishery";

export const apiResponseErrorFactory = Factory.define<ApiResponseError>(({ sequence }) => ({
	message: `ApiResponseError # ${sequence}`,
	code: 0,
	title: `ApiResponseError # ${sequence}`,
	type: `ApiResponseError`,
}));
