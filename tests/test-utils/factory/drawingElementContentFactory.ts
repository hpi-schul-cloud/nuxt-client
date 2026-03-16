import { DrawingElementContent } from "@api-server";
import { Factory } from "fishery";

export const drawingElementContentFactory = Factory.define<DrawingElementContent>(() => ({
	description: "Some description for Board1234",
	timestamps: {
		lastUpdatedAt: "21-02-2022",
	},
}));
