import { CollaborativeTextEditorElementResponse, ContentElementType } from "@api-server";
import { Factory } from "fishery";

export const collaborativeTextEditorElementResponseFactory = Factory.define<CollaborativeTextEditorElementResponse>(
	({ sequence }) => ({
		id: `id-${sequence}`,
		type: ContentElementType.COLLABORATIVE_TEXT_EDITOR,
		content: {
			editorId: `editor-id${sequence}`,
		},
		timestamps: {
			createdAt: new Date().toISOString(),
			lastUpdatedAt: new Date().toISOString(),
		},
	})
);
