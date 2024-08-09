import { ContentElementType, DrawingElementResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { drawingElementContentFactory } from "./drawingElementContentFactory";

export const drawingElementResponseFactory =
	Factory.define<DrawingElementResponse>(({ sequence }) => ({
		id: `drawingElementResponse${sequence}`,
		type: ContentElementType.Drawing,
		content: drawingElementContentFactory.build(),
		timestamps: timestampsResponseFactory.build(),
	}));
