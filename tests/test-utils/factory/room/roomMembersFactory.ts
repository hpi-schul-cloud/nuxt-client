import { Factory } from "fishery";
import { RoleName, SchoolForExternalInviteResponse } from "@/serverApi/v3";
import { RoomMember } from "@data-room";

export const roomMemberFactory = Factory.define<RoomMember>(({ sequence }) => ({
	userId: `member${sequence}`,
	firstName: `firstName${sequence}`,
	lastName: `lastName${sequence}`,
	fullName: `lastName${sequence}, firstName${sequence}`,
	roomRoleName: RoleName.Roomadmin,
	schoolRoleNames: [RoleName.Teacher],
	schoolName: "Paul-Gerhardt-Gymnasium",
	displayRoomRole: `displayRoomRole${sequence}`,
	displaySchoolRole: `displaySchoolRole${sequence}`,
	isSelectable: true,
}));

export const roomMemberSchoolResponseFactory =
	Factory.define<SchoolForExternalInviteResponse>(({ sequence }) => ({
		id: `school${sequence}`,
		name: `schoolName${sequence}`,
	}));
