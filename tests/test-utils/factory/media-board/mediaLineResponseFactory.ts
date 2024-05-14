import { MediaLineResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "../timestampsResponseFactory";
import { mediaExternalToolElementResponseFactory } from "./mediaExternalToolElementResponseFactory";

export const mediaLineResponseFactory = Factory.define<MediaLineResponse>(
	({ sequence }) => ({
		id: `media-line-${sequence}`,
		timestamps: timestampsResponseFactory.build(),
		title: `line ${sequence}`,
		elements: mediaExternalToolElementResponseFactory.buildList(1),
		backgroundColor: "#FFFFFF",
	})
);
