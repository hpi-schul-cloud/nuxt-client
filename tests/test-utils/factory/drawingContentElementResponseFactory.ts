import { ContentElementType, DrawingElementResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "@@/tests/test-utils/factory";
import { drawingContentElementFactory } from "./drawingContentElementFactory";

export const drawingContentElementResponseFactory =
	Factory.define<DrawingElementResponse>(({ sequence }) => ({
		id: `drawingElementResponse${sequence}`,
		type: ContentElementType.Drawing,
		content: drawingContentElementFactory.build(),
		timestamps: timestampsResponseFactory.build(),
	}));
