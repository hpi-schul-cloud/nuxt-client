import { Factory } from "fishery";
import { AdminRoom } from "@data-room";

export const roomFactory = Factory.define<AdminRoom>(({ sequence }) => ({
	id: `room${sequence}`,
	name: `room #${sequence}`,
	owner: `roomOwner${sequence}`,
	mainSchool: `school${sequence}`,
	creationDate: new Date().toISOString(),
	totalMembers: sequence * 10,
	internalMembers: sequence * 5,
	externalMembers: sequence * 5,
}));
