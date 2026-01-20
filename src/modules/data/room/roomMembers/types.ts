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
	activeUntil: string | undefined;
	activeUntilChecked: boolean;
	isUsableByStudents: boolean;
	isUsableByExternalPersons: boolean;
	requiresConfirmation: boolean;
	restrictedToCreatorSchool: boolean;
	title: string;
	id: string;
};

export type CreateRoomInvitationLinkDto = Omit<CreateRoomInvitationLinkBodyParams, "roomId">;

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

export enum ExternalMembersInvitationSteps {
	Email = "email",
	Details = "details",
	Error = "error",
}

export enum ExternalMemberCheckStatus {
	ACCOUNT_FOUND_AND_ADDED = "account_found_and_added",
	ACCOUNT_NOT_FOUND = "account_not_found",
	ACCOUNT_IS_NOT_EXTERNAL = "account_is_not_external",
}

export { RoomInvitationLinkValidationError } from "@/serverApi/v3";
