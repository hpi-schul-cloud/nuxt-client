import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { FileFolderElement } from "@/types/board/ContentElement";
import { ContentElementType } from "@api-server";
import { Factory } from "fishery";

export const fileFolderElementResponseFactory = Factory.define<FileFolderElement>(({ sequence }) => ({
	id: `id${sequence}`,
	type: ContentElementType.FILE_FOLDER,
	timestamps: timestampsResponseFactory.build(),
	content: {
		title: `title ${sequence}`,
	},
}));
