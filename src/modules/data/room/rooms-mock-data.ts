import { RoomColorEnum } from "@/modules/feature/room/RoomColorPicker/types";
import { Room } from "@/types/room/Room";

// TODO replace with API call
export const roomsData: Room[] = [
	{
		id: "0000dcfbfb5c7a3f00bf21cd",
		title: "Maschinelles Lernen in der Cloud",
		shortTitle: "Ma",
		// displayColor: "#54616e",
		displayColor: RoomColorEnum.BLUE_GREY,
	},
	{
		id: "0000dcfbfb5c7a3f00bf21ce",
		title: "Hybrid Cloud und Multi-Cloud-Strategien",
		shortTitle: "Hy",
		// displayColor: "rgb(239, 108, 0)",
		displayColor: RoomColorEnum.BLUE,
	},
	{
		id: "0000dcfbfb5c7a3f00bf21cf",
		title: "Serverless Computing",
		shortTitle: "Se",
		// displayColor: "rgb(48, 79, 254)",
		displayColor: RoomColorEnum.MAGENTA,
	},
	{
		id: "0000dcfbfb5c7a3f00bf21da",
		title: "Prototyping an App with Quasar",
		shortTitle: "Pr",
		// displayColor: "#54616e",
		displayColor: RoomColorEnum.RED,
	},
	{
		id: "0000dcfbfb5c7a3f00bf21db",
		title: "State Management with Pinia",
		shortTitle: "St",
		// displayColor: "#54616e",
		displayColor: RoomColorEnum.ORANGE,
	},
	{
		id: "0000dcfbfb5c7a3f00bf21dc",
		title: "Accessibility, Interactivity And Why Testing Still Matters",
		shortTitle: "Ac",
		// displayColor: "#54616e",
		displayColor: RoomColorEnum.GREEN,
	},
];
