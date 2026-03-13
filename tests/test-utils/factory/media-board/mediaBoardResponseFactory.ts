import { timestampsResponseFactory } from "../timestampsResponseFactory";
import { mediaLineResponseFactory } from "./mediaLineResponseFactory";
import { BoardLayout, MediaBoardResponse } from "@api-server";
import { Factory } from "fishery";

export const mediaBoardResponseFactory = Factory.define<MediaBoardResponse>(({ sequence }) => ({
	id: `media-board-${sequence}`,
	timestamps: timestampsResponseFactory.build(),
	lines: mediaLineResponseFactory.buildList(1),
	layout: BoardLayout.LIST,
}));
