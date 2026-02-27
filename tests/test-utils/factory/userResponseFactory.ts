import { RoleName, UserResponse } from "@/serverApi/v3";
import { UserCreatingData } from "@data-users";
import { Factory } from "fishery";

export const userResponseFactory = Factory.define<Partial<UserResponse>>(({ sequence }) => ({
	_id: `id-${sequence}`,
	firstName: `firstName${sequence}`,
	lastName: `lastName${sequence}`,
	email: `email${sequence}@example.com`,
	createdAt: new Date().toISOString(),
	birthday: new Date(1990, 0, 1).toISOString(),
}));

export const userCreationDataFactory = Factory.define<UserCreatingData>(({ sequence }) => ({
	firstName: `firstName${sequence}`,
	lastName: `lastName${sequence}`,
	email: `email${sequence}@example.com`,
	roles: [RoleName.Student],
	schoolId: `school-${sequence}`,
	sendRegistration: false,
	birthday: new Date(1990, 0, 1),
}));
