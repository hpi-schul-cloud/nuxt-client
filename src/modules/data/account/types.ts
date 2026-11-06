import { ConsentSessionResponse } from "@api-server";

export interface AccountProfileData {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	isSSO: boolean;
	isStudent: boolean;
	discoverable: boolean;
	currentPassword?: string;
	newPassword?: string;
	confirmPassword?: string;
}

export interface UpdateProfilePayload {
	passwordOld: string;
	passwordNew?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
}

export type { ConsentSessionResponse };
