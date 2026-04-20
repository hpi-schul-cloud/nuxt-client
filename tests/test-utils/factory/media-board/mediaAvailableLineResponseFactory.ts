import { mediaAvailableLineElementResponseFactory } from "./mediaAvailableLineElementResponseFactory";
import { MediaAvailableLineResponse, Colors } from "@api-server";
import { Factory } from "fishery";

export const mediaAvailableLineResponseFactory = Factory.define<MediaAvailableLineResponse>(() => ({
	elements: mediaAvailableLineElementResponseFactory.buildList(1),
	backgroundColor: Colors.TRANSPARENT,
	collapsed: false,
}));
