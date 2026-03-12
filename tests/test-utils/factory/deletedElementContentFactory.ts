import { ContentElementType, DeletedElementContent } from "@api-server";
import { Factory } from "fishery";

export const deletedElementContentFactory =
	Factory.define<DeletedElementContent>(({ sequence }) => ({
		title: `deleted-element-${sequence}`,
		deletedElementType: ContentElementType.EXTERNAL_TOOL,
		description: "test-description",
	}));
