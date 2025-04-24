import {
	CreateRoomInvitationLinkBodyParams,
	RoomInvitationLinkResponse,
	RoomMemberResponse,
	UpdateRoomInvitationLinkBodyParams,
} from "@/serverApi/v3";

export type RoomMember = RoomMemberResponse & {
	isSelectable?: boolean;
	fullName?: string;
	displayRoomRole: string;
	displaySchoolRole: string;
};

export type RoomInvitationLink = RoomInvitationLinkResponse;

export type CreateRoomInvitationLinkDto = Omit<
	CreateRoomInvitationLinkBodyParams,
	"roomId"
>;

export type UpdateRoomInvitationLinkDto = UpdateRoomInvitationLinkBodyParams & {
	id: string;
};
