import { Factory } from "fishery";
import { RoleName, SchoolForExternalInviteResponse } from "@/serverApi/v3";
import { RoomMember } from "@data-room";

export const roomMemberFactory = (
	roomRoleName = RoleName.Roomowner,
	schoolRoleName = RoleName.Teacher
) =>
	Factory.define<RoomMember>(({ sequence }) => ({
		userId: `member${sequence}`,
		firstName: `firstName${sequence}`,
		lastName: `lastName${sequence}`,
		roomRoleName,
		schoolRoleName,
		schoolName: "Paul-Gerhardt-Gymnasium",
		displayRoomRole: `displayRoomRole${sequence}`,
		displaySchoolRole: `displaySchoolRole${sequence}`,
		isSelectable: true,
	}));

export const roomMemberListFactory = Factory.define<RoomMember>(
	({ sequence }) => ({
		userId: `member${sequence}`,
		firstName: `firstName${sequence}`,
		lastName: `lastName${sequence}`,
		fullName: `lastName${sequence}, firstName${sequence}`,
		roomRoleName: RoleName.Roomadmin,
		schoolRoleName: RoleName.Teacher,
		schoolName: "Paul-Gerhardt-Gymnasium",
		displayRoomRole: `displayRoomRole${sequence}`,
		displaySchoolRole: `displaySchoolRole${sequence}`,
		isSelectable: true,
	})
);

export const roomMemberSchoolResponseFactory =
	Factory.define<SchoolForExternalInviteResponse>(({ sequence }) => ({
		id: `school${sequence}`,
		name: `schoolName${sequence}`,
	}));
