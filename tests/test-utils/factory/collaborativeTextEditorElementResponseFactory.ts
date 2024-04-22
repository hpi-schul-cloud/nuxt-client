import {
	CollaborativeTextEditorElementResponse,
	ContentElementType,
} from "@/serverApi/v3";
import { Factory } from "fishery";

export const collaborativeTextEditorElementResponseFactory =
	Factory.define<CollaborativeTextEditorElementResponse>(({ sequence }) => ({
		id: `id-${sequence}`,
		type: ContentElementType.CollaborativeTextEditor,
		content: {
			editorId: `editor-id${sequence}`,
		},
		timestamps: {
			createdAt: new Date().toISOString(),
			lastUpdatedAt: new Date().toISOString(),
		},
	}));
