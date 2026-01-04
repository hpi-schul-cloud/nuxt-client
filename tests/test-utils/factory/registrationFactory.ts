import { Registration } from "@data-room";
import { Factory } from "fishery";

export const registrationFactory = Factory.define<Registration>(({ sequence }) => ({
	id: `registration${sequence}`,
	email: `member${sequence}@example.com`,
	firstName: `firstName${sequence}`,
	lastName: `lastName${sequence}`,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
}));
