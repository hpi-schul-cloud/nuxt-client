import { RoomParticipantResponse } from "@/serverApi/v3";

export type ParticipantsType = RoomParticipantResponse & {
	fullName: string;
};
