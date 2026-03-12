import { ContentElementType, DrawingElementResponse } from "@api-server";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { drawingElementContentFactory } from "./drawingElementContentFactory";

export const drawingElementResponseFactory =
	Factory.define<DrawingElementResponse>(({ sequence }) => ({
		id: `drawingElementResponse${sequence}`,
		type: ContentElementType.DRAWING,
		content: drawingElementContentFactory.build(),
		timestamps: timestampsResponseFactory.build(),
	}));
