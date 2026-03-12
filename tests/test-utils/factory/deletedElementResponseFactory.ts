import { deletedElementContentFactory } from "./deletedElementContentFactory";
import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { ContentElementType, DeletedElementResponse } from "@api-server";
import { Factory } from "fishery";

export const deletedElementResponseFactory = Factory.define<DeletedElementResponse>(({ sequence }) => ({
	id: `deleted-element-response-${sequence}`,
	type: ContentElementType.DELETED,
	content: deletedElementContentFactory.build(),
	timestamps: timestampsResponseFactory.build(),
	description: "test-description",
}));
