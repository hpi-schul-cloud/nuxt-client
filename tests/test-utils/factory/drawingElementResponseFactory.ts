import {
	ContentElementType,
	DrawingElementResponse,
} from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "@@/tests/test-utils/factory";
import { drawingElementContent} from "./drawingElementContentFactory";

export const submissionContainerElementResponseFactory =
	Factory.define<DrawingElementResponse>(({ sequence }) => ({
		id: `drawingElementResponse${sequence}`,
		type: ContentElementType.Drawing,
		content: drawingElementContent.build(),
		timestamps: timestampsResponseFactory.build(),
	}));
