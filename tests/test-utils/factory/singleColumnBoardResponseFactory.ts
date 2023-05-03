// import { SingleColumnBoardResponse } from "@/serverApi/v3";

// const defaultRoom: SingleColumnBoardResponse = {
// 	roomId: "123",
// 	title: "room",
// 	displayColor: "#ff00ff",
// 	elements: [],
// };

// export const roomFactory = (
// 	overwrites: Partial<SingleColumnBoardResponse> = {}
// ): SingleColumnBoardResponse => {
// 	return {
// 		...defaultRoom,
// 		...overwrites,
// 	};
// };

import { Factory } from "fishery";
import { SingleColumnBoardResponse } from "@/serverApi/v3";

export const singleColumnBoardResponseFactory =
	Factory.define<SingleColumnBoardResponse>(({ sequence }) => ({
		roomId: `room${sequence}`,
		title: "room",
		displayColor: "#ff00ff",
		elements: [],
	}));
