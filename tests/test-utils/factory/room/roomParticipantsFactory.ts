import { Factory } from "fishery";
import {
	RoomParticipantResponse,
	SchoolForExternalInviteResponse,
} from "@/serverApi/v3";

export const roomParticipantResponseFactory =
	Factory.define<RoomParticipantResponse>(({ sequence }) => ({
		userId: `participant${sequence}`,
		firstName: `firstName${sequence}`,
		lastName: `lastName${sequence}`,
		fullName: `lastName${sequence}, firstName${sequence}`,
		roleName: "teacher",
		schoolName: "Paul-Gerhardt-Gymnasium",
	}));

export const roomParticipantSchoolResponseFactory =
	Factory.define<SchoolForExternalInviteResponse>(({ sequence }) => ({
		id: `school${sequence}`,
		name: `schoolName${sequence}`,
	}));
