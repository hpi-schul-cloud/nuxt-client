import { BoardLayout } from "@/serverApi/v3";
import { RoomBoardItem } from "@/types/room/Room";
import { Factory } from "fishery";

export const roomBoardGridItemFactory = Factory.define<RoomBoardItem>(({ sequence }) => ({
	id: `board ${sequence}`,
	title: `A11Y for Beginners ${sequence}`,
	layout: BoardLayout.Columns,
	isVisible: true,
	createdAt: "2017-09-28T11:49:39.924Z",
	updatedAt: "2017-09-28T11:49:39.924Z",
}));
