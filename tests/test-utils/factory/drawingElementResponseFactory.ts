import { drawingElementContentFactory } from "./drawingElementContentFactory";
import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { ContentElementType, DrawingElementResponse } from "@api-server";
import { Factory } from "fishery";

export const drawingElementResponseFactory = Factory.define<DrawingElementResponse>(({ sequence }) => ({
	id: `drawingElementResponse${sequence}`,
	type: ContentElementType.DRAWING,
	content: drawingElementContentFactory.build(),
	timestamps: timestampsResponseFactory.build(),
}));
