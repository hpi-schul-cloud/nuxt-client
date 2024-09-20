import { ContentElementType, DeletedElementResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { deletedElementContentFactory } from "./deletedElementContentFactory";

export const deletedElementResponseFactory =
	Factory.define<DeletedElementResponse>(({ sequence }) => ({
		id: `deleted-element-response-${sequence}`,
		type: ContentElementType.Deleted,
		content: deletedElementContentFactory.build(),
		timestamps: timestampsResponseFactory.build(),
		description: "test-description",
	}));
