import { MediaBoardResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "../timestampsResponseFactory";
import { mediaLineResponseFactory } from "./mediaLineResponseFactory";

export const mediaBoardResponseFactory = Factory.define<MediaBoardResponse>(
	({ sequence }) => ({
		id: `media-board-${sequence}`,
		timestamps: timestampsResponseFactory.build(),
		lines: mediaLineResponseFactory.buildList(1),
	})
);
