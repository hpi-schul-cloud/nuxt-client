import { Factory } from "fishery";
import {
	RoleName,
	RoomParticipantResponse,
	SchoolForExternalInviteResponse,
} from "@/serverApi/v3";
import { ParticipantType } from "@data-room";

export const roomParticipantResponseFactory =
	Factory.define<RoomParticipantResponse>(({ sequence }) => ({
		userId: `participant${sequence}`,
		firstName: `firstName${sequence}`,
		lastName: `lastName${sequence}`,
		roleName: RoleName.RoomEditor,
		schoolName: "Paul-Gerhardt-Gymnasium",
	}));

export const addParticipantListFactory = Factory.define<ParticipantType>(
	({ sequence }) => ({
		userId: `participant${sequence}`,
		firstName: `firstName${sequence}`,
		lastName: `lastName${sequence}`,
		fullName: `lastName${sequence}, firstName${sequence}`,
		roleName: RoleName.RoomEditor,
		schoolName: "Paul-Gerhardt-Gymnasium",
	})
);

export const roomParticipantSchoolResponseFactory =
	Factory.define<SchoolForExternalInviteResponse>(({ sequence }) => ({
		id: `school${sequence}`,
		name: `schoolName${sequence}`,
	}));
