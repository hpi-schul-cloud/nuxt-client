import { RoomColor } from "@/serverApi/v3";

export type Room = {
	id: string;
	name: string;
	color: RoomColor;
	startDate?: string;
	endDate?: string;
};
