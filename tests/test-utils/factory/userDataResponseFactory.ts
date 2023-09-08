import { UserDataResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const userDataResponseFactory = Factory.define<UserDataResponse>(
	({ sequence }) => ({
		userId: `userId${sequence}`,
		firstName: "Max",
		lastName: "Meyer",
	})
);
