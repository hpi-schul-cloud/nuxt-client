import { UserDataResponse } from "@api-server";
import { Factory } from "fishery";

export const userDataResponseFactory = Factory.define<UserDataResponse>(
	({ sequence }) => ({
		userId: `userId${sequence}`,
		firstName: "Max",
		lastName: "Meyer",
	})
);
