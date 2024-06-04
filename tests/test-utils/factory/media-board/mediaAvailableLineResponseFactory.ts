import { MediaAvailableLineResponse, MediaBoardColors } from "@/serverApi/v3";
import { Factory } from "fishery";
import { mediaAvailableLineElementResponseFactory } from "./mediaAvailableLineElementResponseFactory";

export const mediaAvailableLineResponseFactory =
	Factory.define<MediaAvailableLineResponse>(() => ({
		elements: mediaAvailableLineElementResponseFactory.buildList(1),
		backgroundColor: MediaBoardColors.Transparent,
		collapsed: false,
	}));
