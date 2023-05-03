import { Factory } from "fishery";
import { BusinessError } from "@/store/types/commons";

export const businessErrorFactory = Factory.define<BusinessError>(() => ({
	statusCode: "400",
	error: undefined,
	message: "message",
}));
