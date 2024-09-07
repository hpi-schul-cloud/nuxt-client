import { RoomColorEnum } from "@/modules/feature/room/RoomColorPicker/types";

export type Room = {
	id: string;
	title: string;
	shortTitle: string;
	// displayColor: string;
	displayColor: RoomColorEnum;
};
