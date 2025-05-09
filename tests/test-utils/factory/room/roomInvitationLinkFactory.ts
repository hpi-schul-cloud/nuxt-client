import { Factory } from "fishery";
import { RoomInvitationLink } from "@data-room";

export const roomInvitationLinkFactory = Factory.define<RoomInvitationLink>(
	({ sequence }) => ({
		id: `roomInvitationLink${sequence}`,
		roomId: `roomId${sequence}`,
		title: `roomInvitationLink${sequence}`,
		restrictedToCreatorSchool: false,
		isOnlyForTeachers: false,
		activeUntil: `2023-10-01T00:00:00.000Z`,
		requiresConfirmation: false,
		creatorUserId: `userId${sequence}`,
		creatorSchoolId: `schoolId${sequence}`,
	})
);
