import { ContentElementType, DeletedElementResponse } from "@api-server";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { deletedElementContentFactory } from "./deletedElementContentFactory";

export const deletedElementResponseFactory =
	Factory.define<DeletedElementResponse>(({ sequence }) => ({
		id: `deleted-element-response-${sequence}`,
		type: ContentElementType.DELETED,
		content: deletedElementContentFactory.build(),
		timestamps: timestampsResponseFactory.build(),
		description: "test-description",
	}));
