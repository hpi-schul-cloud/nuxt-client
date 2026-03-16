import { BoardCard } from "@/types/board/Card";
import { Factory } from "fishery";

export const boardCardFactory = Factory.define<BoardCard>(({ sequence }) => ({
	id: `cardId ${sequence}`,
	height: 200,
	title: `title ${sequence}`,
	elements: [],
	visibility: { publishedAt: new Date().toUTCString() },
}));
