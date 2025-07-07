import { Factory } from "fishery";
import { RoleName, SchoolForExternalInviteResponse } from "@/serverApi/v3";
import { RoomMember } from "@data-room";

export const roomMemberFactory = Factory.define<RoomMember>(({ sequence }) => ({
	userId: `member${sequence}`,
	firstName: `firstName${sequence}`,
	lastName: `lastName${sequence}`,
	fullName: `firstName${sequence} lastName${sequence}`,
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

export const roomOwnerFactory = roomMemberFactory.params({
	roomRoleName: RoleName.Roomowner,
});

export const roomAdminFactory = roomMemberFactory.params({
	roomRoleName: RoleName.Roomadmin,
});

export const roomEditorFactory = roomMemberFactory.params({
	roomRoleName: RoleName.Roomeditor,
});

export const roomViewerFactory = roomMemberFactory.params({
	roomRoleName: RoleName.Roomviewer,
});

export const roomApplicantFactory = roomMemberFactory.params({
	roomRoleName: RoleName.Roomapplicant,
});
