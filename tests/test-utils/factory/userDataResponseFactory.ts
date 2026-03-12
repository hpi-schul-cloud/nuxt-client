import { UserDataResponse } from "@/generated/serverApi/v3";
import { Factory } from "fishery";

export const userDataResponseFactory = Factory.define<UserDataResponse>(
	({ sequence }) => ({
		userId: `userId${sequence}`,
		firstName: "Max",
		lastName: "Meyer",
	})
);
