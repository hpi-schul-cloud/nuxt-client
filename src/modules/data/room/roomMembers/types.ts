import { RoomMemberResponse } from "@/serverApi/v3";

export type RoomMember = RoomMemberResponse & {
	fullName: string;
};
