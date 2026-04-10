import { BusinessError } from "@/store/types/commons";
import { Factory } from "fishery";

export const businessErrorFactory = Factory.define<BusinessError>(() => ({
	statusCode: "400",
	error: undefined,
	message: "message",
}));
