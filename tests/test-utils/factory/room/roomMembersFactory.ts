import { Factory } from "fishery";
import {
	RoleName,
	RoomMemberResponse,
	SchoolForExternalInviteResponse,
} from "@/serverApi/v3";
import { RoomMember } from "@data-room";

export const roomMemberFactory = (roleName = RoleName.Roomowner) =>
	Factory.define<RoomMemberResponse>(({ sequence }) => ({
		userId: `member${sequence}`,
		firstName: `firstName${sequence}`,
		lastName: `lastName${sequence}`,
		roleName,
		displayRoleName: RoleName.Teacher,
		schoolName: "Paul-Gerhardt-Gymnasium",
	}));

export const roomMemberListFactory = Factory.define<RoomMember>(
	({ sequence }) => ({
		userId: `member${sequence}`,
		firstName: `firstName${sequence}`,
		lastName: `lastName${sequence}`,
		fullName: `lastName${sequence}, firstName${sequence}`,
		roleName: RoleName.Roomeditor,
		displayRoleName: RoleName.Teacher,
		schoolName: "Paul-Gerhardt-Gymnasium",
	})
);

export const roomMemberSchoolResponseFactory =
	Factory.define<SchoolForExternalInviteResponse>(({ sequence }) => ({
		id: `school${sequence}`,
		name: `schoolName${sequence}`,
	}));
