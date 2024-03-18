import { MeResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const meResponseFactory = Factory.define<MeResponse>(({ sequence }) => ({
	user: {
		id: `user-${sequence}`,
		firstName: `firstName${sequence}`,
		lastName: `lastName${sequence}`,
		customAvatarBackgroundColor: `customAvatarBackgroundColor${sequence}`,
	},
	school: {
		id: `school-${sequence}`,
		name: `schoolName${sequence}`,
		logo: {
			url: `logoUrl${sequence}`,
			name: `logoName${sequence}`,
		},
	},
	roles: [],
	permissions: [],
	language: `language${sequence}`,
	account: {
		id: `account-${sequence}`,
	},
}));
