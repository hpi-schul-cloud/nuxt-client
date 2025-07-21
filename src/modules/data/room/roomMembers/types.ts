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

export type RoomInvitationFormData = {
	activeUntil: Date | undefined;
	activeUntilChecked: boolean;
	isValidForStudents: boolean;
	requiresConfirmation: boolean;
	restrictedToCreatorSchool: boolean;
	title: string;
	id: string;
};

export type CreateRoomInvitationLinkDto = Omit<
	CreateRoomInvitationLinkBodyParams,
	"roomId"
>;

export type UpdateRoomInvitationLinkDto = UpdateRoomInvitationLinkBodyParams & {
	id: string;
};

export type UseLinkResult = {
	roomId: string;
	validationMessage: string;
	schoolName: string;
};

export enum InvitationStep {
	PREPARE = "prepare",
	SHARE = "share",
	EDIT = "edit",
}

export { RoomInvitationLinkValidationError } from "@/serverApi/v3";

export type AdminRoom = {
	id: string;
	name: string;
	owner: string | undefined;
	mainSchool: string;
	creationDate: string;
	totalMembers: number;
	internalMembers: number;
	externalMembers: number;
};
