import { ContentElementType, DeletedElementContent } from "@/serverApi/v3";
import { Factory } from "fishery";

export const deletedElementContentFactory =
	Factory.define<DeletedElementContent>(({ sequence }) => ({
		title: `deleted-element-${sequence}`,
		deletedElementType: ContentElementType.Deleted,
		description: "test-description",
	}));
