import { RoomMemberResponse } from "@/serverApi/v3";

export type ParticipantType = RoomMemberResponse & {
	fullName: string;
};
