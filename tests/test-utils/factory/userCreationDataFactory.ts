import { RoleName } from "@/serverApi/v3";
import { UserCreatingData } from "@data-users";
import { Factory } from "fishery";

export const userCreationDataFactory = Factory.define<UserCreatingData>(({ sequence }) => ({
	firstName: `firstName${sequence}`,
	lastName: `lastName${sequence}`,
	email: `email${sequence}@example.com`,
	roles: [RoleName.Student],
	schoolId: `school-${sequence}`,
	sendRegistration: false,
	birthday: new Date(1990, 0, 1),
}));
