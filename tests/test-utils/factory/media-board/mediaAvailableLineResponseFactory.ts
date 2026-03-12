import { MediaAvailableLineResponse, MediaBoardColors } from "@api-server";
import { Factory } from "fishery";
import { mediaAvailableLineElementResponseFactory } from "./mediaAvailableLineElementResponseFactory";

export const mediaAvailableLineResponseFactory =
	Factory.define<MediaAvailableLineResponse>(() => ({
		elements: mediaAvailableLineElementResponseFactory.buildList(1),
		backgroundColor: MediaBoardColors.TRANSPARENT,
		collapsed: false,
	}));
