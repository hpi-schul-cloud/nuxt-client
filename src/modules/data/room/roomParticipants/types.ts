import { RoomParticipantResponse } from "@/serverApi/v3";

export type ParticipantType = RoomParticipantResponse & {
	fullName: string;
};
