import { ContentElementType } from "@/serverApi/v3";
import { FileFolderElement } from "@/types/board/ContentElement";
import { Factory } from "fishery";
import { timestampsResponseFactory } from "./timestampsResponseFactory";

export const fileFolderElementResponseFactory =
	Factory.define<FileFolderElement>(({ sequence }) => ({
		id: `id${sequence}`,
		type: ContentElementType.FILE_FOLDER,
		timestamps: timestampsResponseFactory.build(),
		content: {
			title: `title ${sequence}`,
		},
	}));
