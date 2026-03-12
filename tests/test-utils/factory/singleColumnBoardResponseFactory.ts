import { SingleColumnBoardResponse } from "@api-server";
import { Factory } from "fishery";

export const singleColumnBoardResponseFactory = Factory.define<SingleColumnBoardResponse>(({ sequence }) => ({
	roomId: `room${sequence}`,
	title: "room",
	displayColor: "#ff00ff",
	elements: [],
	isArchived: false,
	isSynchronized: false,
}));
