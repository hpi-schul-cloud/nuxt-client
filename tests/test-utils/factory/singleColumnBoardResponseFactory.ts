import { Factory } from "fishery";
import { SingleColumnBoardResponse } from "@/serverApi/v3";

export const singleColumnBoardResponseFactory =
	Factory.define<SingleColumnBoardResponse>(({ sequence }) => ({
		roomId: `room${sequence}`,
		title: "room",
		displayColor: "#ff00ff",
		elements: [],
	}));
