import { BusinessError } from "@/store/types/commons";

export const businessErrorFactory = (
	param: Partial<BusinessError> = {}
): BusinessError => {
	return {
		statusCode: "400",
		error: undefined,
		message: "message",
		...param,
	};
};
