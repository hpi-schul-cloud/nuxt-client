import { RoomInvitationLinkResponse, RoomMemberResponse } from "@/serverApi/v3";

export type RoomMember = RoomMemberResponse & {
	isSelectable?: boolean;
	fullName?: string;
	displayRoomRole: string;
	displaySchoolRole: string;
};

export type RoomInvitationLink = RoomInvitationLinkResponse;
