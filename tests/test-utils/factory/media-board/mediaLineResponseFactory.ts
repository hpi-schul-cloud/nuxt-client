import { timestampsResponseFactory } from "../timestampsResponseFactory";
import { mediaExternalToolElementResponseFactory } from "./mediaExternalToolElementResponseFactory";
import { Colors, MediaLineResponse } from "@api-server";
import { Factory } from "fishery";

export const mediaLineResponseFactory = Factory.define<MediaLineResponse>(({ sequence }) => ({
	id: `media-line-${sequence}`,
	timestamps: timestampsResponseFactory.build(),
	title: `line ${sequence}`,
	elements: mediaExternalToolElementResponseFactory.buildList(1),
	backgroundColor: Colors.TRANSPARENT,
	collapsed: false,
}));
