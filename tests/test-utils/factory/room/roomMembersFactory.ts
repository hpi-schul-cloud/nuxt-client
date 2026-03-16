import { RoleName, SchoolForExternalInviteResponse, SchoolListResponse } from "@api-server";
import { RoomMember } from "@data-room";
import { Factory } from "fishery";

export const roomMemberFactory = Factory.define<RoomMember>(({ sequence }) => ({
	userId: `member${sequence}`,
	firstName: `firstName${sequence}`,
	lastName: `lastName${sequence}`,
	fullName: `firstName${sequence} lastName${sequence}`,
	roomRoleName: RoleName.ROOMADMIN,
	schoolRoleNames: [RoleName.TEACHER],
	schoolName: "Paul-Gerhardt-Gymnasium",
	displayRoomRole: `displayRoomRole${sequence}`,
	displaySchoolRole: `displaySchoolRole${sequence}`,
	isSelectable: true,
	schoolId: `schoolId${sequence}`,
	allowedOperations: {
		changeRole: false,
		passOwnershipTo: false,
		removeMember: false,
	},
}));

export const roomMemberSchoolResponseFactory = Factory.define<SchoolForExternalInviteResponse>(({ sequence }) => ({
	id: `school${sequence}`,
	name: `schoolName${sequence}`,
}));

export const roomMemberSchoolListResponseFactory = Factory.define<SchoolListResponse>(({ associations }) => {
	const totalCount = associations.total || 1;
	const data = roomMemberSchoolResponseFactory.buildList(totalCount);
	return {
		data,
		total: totalCount,
		limit: totalCount,
		skip: 0,
	};
});

export const roomOwnerFactory = roomMemberFactory.params({
	roomRoleName: RoleName.ROOMOWNER,
});

export const roomAdminFactory = roomMemberFactory.params({
	roomRoleName: RoleName.ROOMADMIN,
});

export const roomEditorFactory = roomMemberFactory.params({
	roomRoleName: RoleName.ROOMEDITOR,
});

export const roomViewerFactory = roomMemberFactory.params({
	roomRoleName: RoleName.ROOMVIEWER,
});

export const roomApplicantFactory = roomMemberFactory.params({
	roomRoleName: RoleName.ROOMAPPLICANT,
});
