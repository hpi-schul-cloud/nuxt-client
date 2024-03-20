import { SingleColumnBoardResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const singleColumnBoardResponseFactory =
	Factory.define<SingleColumnBoardResponse>(({ sequence }) => ({
		roomId: `room${sequence}`,
		title: "room",
		displayColor: "#ff00ff",
		elements: [],
		isArchived: false,
		isSynchronized: false,
	}));
